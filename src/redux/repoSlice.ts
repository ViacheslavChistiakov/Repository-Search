import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Octokit } from "@octokit/core";

export interface Repo {
    id: number;
    node_id: string;
    name: string;
    description: string | null;
    full_name: string;
    owner: { login: string };
    html_url: string;
    stargazers_count?: number;
    updated_at?: string | null | undefined;
};

interface RepoState {
    repos: Repo[];
    loading: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
};

const initialState: RepoState = {
    repos: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
}

const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN 
});


export const fetchRepos = createAsyncThunk(
    "repos/fetchRepos",
    async ({userName, page}: {userName: string, page: number}, { rejectWithValue }) => {
    try {
        console.log(`Fetching GitHub repos for: ${userName}`);
        const response = await octokit.request("GET /users/{username}/repos", {
            username: userName,
            per_page: 20, 
            page,
            headers: {
                "X-GitHub-Api-Version": "2022-11-28"
            }
        });
        return {
            data: response.data,
            page,
            hasMore: response.data.length === 20,
        } 

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
    reducers: {
        resetRepos: (state) => {
            state.repos = [];
            state.page = 1;
            state.hasMore = true;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRepos.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchRepos.fulfilled, (state, action) => {
            state.loading = false;
            state.repos = action.payload.page === 1 ? action.payload.data : [...state.repos, ...action.payload.data];
            state.hasMore = action.payload.hasMore;
            state.page = action.payload.page;
        });
        builder.addCase(fetchRepos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
})

export const { resetRepos } = repoSlice.actions; 
export default repoSlice.reducer;


