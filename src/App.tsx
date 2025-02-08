import { useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Main } from './components/MainFolder/Main';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 900);

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <Main debouncedQuery={debouncedQuery} />
    </>
  );
}

export default App;
