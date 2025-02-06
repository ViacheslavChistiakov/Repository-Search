import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Octokit } from "@octokit/core";

export interface Repo {
    name: string;
    description?: string | null;
    html_url: string;
    stargazers_count?: number;
};

interface RepoState {
    repos: Repo[];
    loading: boolean;
    error: string | null;
};

const initialState: RepoState = {
    repos: [],
    loading: false,
    error: null
}

const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN 
});

export const fetchRepos = createAsyncThunk(
    "repos/fetchRepos",
    async (userName: string, { rejectWithValue }) => {
    try {
        console.log(`Fetching GitHub repos for: ${userName}`);
        const response = await octokit.request("GET /users/{username}/repos", {
            username: userName,
            headers: {
                "X-GitHub-Api-Version": "2022-11-28"
            }
        });
        return response.data;

    } catch (err: unknown) {
        console.error("GitHub API Error:", err);
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data?.message || "Failed to fetch repos");
            }
            return rejectWithValue("Something went wrong");
        }
    }
)

const repoSlice = createSlice({
    name: "repos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRepos.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchRepos.fulfilled, (state, action) => {
            state.loading = false;
            state.repos = action.payload;
        });
        builder.addCase(fetchRepos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
})

export default repoSlice.reducer;


