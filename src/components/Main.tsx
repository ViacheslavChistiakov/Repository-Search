import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Repo } from '../redux/repoSlice';

export const Main = () => {
  const { repos, loading, error } = useSelector((state: RootState) => state.repos);

  return (
    <>
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <main className="flex flex-col justify-center align-center">
        <ul className="display w-full justify-between flex flex-col gap-10  rounded-md">
          {repos.map((repo: Repo) => (
            <li
              key={repo.name}
              className="display flex flex-row justify-between align-center p-6 gap-10 bg-white rounded-md">
              <h3 className="text-lg font-semibold">{repo.name}</h3>
              <p className="sm: display none">{repo.description}</p>
              <a href={repo.html_url} className="text-blue-500 hover:underline">
                View on Github
              </a>
              <p>Stars: {repo.stargazers_count}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};
