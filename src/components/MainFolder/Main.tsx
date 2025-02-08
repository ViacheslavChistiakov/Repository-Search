import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchRepos, Repo } from '../../redux/repoSlice';
import { useInfiniteScroll } from '../../hooks/useInfinitiScroll';
import { useEffect } from 'react';

interface MainProps {
  debouncedQuery: string;
}

export const Main = ({ debouncedQuery }: MainProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { repos, loading, error, page, hasMore } = useSelector((state: RootState) => state.repos);

  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      dispatch(fetchRepos({ userName: debouncedQuery, page: 1 }));
    }
  }, [debouncedQuery, dispatch]);

  const lastRepoRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: () => dispatch(fetchRepos({ userName: debouncedQuery, page: page + 1 })),
  });

  return (
    <>
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <main className="flex flex-col justify-center align-center">
        <ul className="display w-full justify-between flex flex-col gap-10  rounded-md  sm:flex-col">
          {repos.map((repo: Repo, index) => (
            <li
              key={repo.name}
              ref={index === repos.length - 1 ? lastRepoRef : null}
              className="display flex flex-row justify-between align-center p-6 gap-10 bg-white rounded-md max-sm:w-full max-sm:flex-col">
              <h3 className="text-lg font-semibold sm: text-sm">{repo.name}</h3>
              <p className="sm: text-sm">{repo.description}</p>
              <a
                href={repo.html_url}
                className="text-blue-500 hover:underline sm: text-sm align-center">
                View on Github
              </a>
              <p>Stars: {repo.stargazers_count}</p>
              <p>Updated: {repo.updated_at}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};
