import { useEffect, useState } from "react";
import { getCharacters, type TCharacter } from "./lib/api";
import Card from "./components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
        <Input
          type="text"
          placeholder="searching..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          onValueChange={(value) => setLimit(Number(value))}
          value={String(limit)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map((opt) => (
              <SelectItem key={opt} value={String(opt)}>
                {`Limit: ${opt}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => setSkip(Number(value))}
          value={String(skip)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Skip" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 11 }, (_, i) => i * 10).map((opt) => (
              <SelectItem key={opt} value={String(opt)}>
                {`Skip: ${opt}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {characters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default App;
