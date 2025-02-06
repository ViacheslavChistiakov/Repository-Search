import { useState } from 'react';
import { fetchRepos } from '../redux/repoSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

export const Header = () => {
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch<AppDispatch>();


  const handleSearch = () => {
    if (userName.trim() === '') {
      alert('User name is empty');
      return;
    }
    console.log('Dispatching fetchRepos for:', userName);
    dispatch(fetchRepos(userName));
  };


  return (
    <header className="display flex justify-center align-center mb-10">
      <input
        className="w-full bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Enter your github username..."
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button
        className="ml-2 px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleSearch}
        type="submit">
        Search
      </button>
    </header>
  );
};
