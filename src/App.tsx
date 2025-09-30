import { useEffect, useState } from "react";
import { getCharacters, type TCharacter } from "./lib/api";

const App = () => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await getCharacters({ search, limit, skip });
      setCharacters(response.products);
    };
    fetchCharacters();
  }, [search, limit, skip]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 py-12 px-4">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-indigo-700 drop-shadow-xl tracking-tight">
        <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
          Characters
        </span>
      </h1>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-center mb-10">
        <input
          type="text"
          placeholder="searching..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="px-3 py-2 border rounded-lg shadow focus:outline-none"
        >
          {Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map((opt) => (
            <option key={opt} value={opt}>{`Limit: ${opt}`}</option>
          ))}
        </select>
        <select
          value={skip}
          onChange={(e) => setSkip(Number(e.target.value))}
          className="px-3 py-2 border rounded-lg shadow focus:outline-none"
        >
          {Array.from({ length: 11 }, (_, i) => i * 10).map((opt) => (
            <option key={opt} value={opt}>{`Skip: ${opt}`}</option>
          ))}
        </select>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {characters.map((character) => (
          <div
            className="relative border-0 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col gap-4 overflow-hidden group"
            key={character.id}
          >
            <h2 className="text-2xl font-bold text-indigo-700 mb-2 group-hover:text-blue-500 transition-colors duration-200">
              {character.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-2 line-clamp-4">
              {character.description}
            </p>
            <div className="flex items-center gap-2 mt-auto">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="text-xs text-gray-400">ID: {character.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
