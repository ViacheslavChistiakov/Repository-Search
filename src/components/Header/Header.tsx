
export const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
  return (
    <header className="display flex justify-center align-center mb-10">
      <input
        className="w-full bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Enter your github username..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </header>
  );
};
