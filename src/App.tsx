import { useEffect, useState } from "react";
import { getCharacters, type TCharacter } from "./lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const App = () => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  // Read initial values from URL on first render
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("search") ?? "";
      const l = Number(params.get("limit") ?? "10");
      const s = Number(params.get("skip") ?? "0");

      if (q !== search) setSearch(q);
      if (!Number.isNaN(l) && l !== limit) setLimit(l);
      if (!Number.isNaN(s) && s !== skip) setSkip(s);
    } catch (e) {
      // ignore
    }
    // only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateQuery = (opts: {
    search?: string;
    limit?: number;
    skip?: number;
  }) => {
    const params = new URLSearchParams(window.location.search);
    if (typeof opts.search !== "undefined") params.set("search", opts.search);
    if (typeof opts.limit !== "undefined")
      params.set("limit", String(opts.limit));
    if (typeof opts.skip !== "undefined") params.set("skip", String(opts.skip));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await getCharacters({ search, limit, skip });
        setCharacters(response.products);
      } finally {
        setLoading(false);
      }
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
          onChange={(e) => {
            const v = e.target.value;
            setSearch(v);
            updateQuery({ search: v, limit, skip });
          }}
        />
        <Select
          onValueChange={(value) => {
            const v = Number(value);
            setLimit(v);
            updateQuery({ search, limit: v, skip });
          }}
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
          onValueChange={(value) => {
            const v = Number(value);
            setSkip(v);
            updateQuery({ search, limit, skip: v });
          }}
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
        {loading
          ? Array.from({ length: limit }).map((_, i) => (
              <Card key={i}>
                <CardContent className="py-4">
                  <Skeleton className="h-6 w-2/3 mb-2 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                  <Skeleton className="h-4 w-full mt-2 rounded" />
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between items-center">
                  <Skeleton className="h-4 w-16 rounded" />
                </CardFooter>
              </Card>
            ))
          : characters.map((character) => (
              <Card key={character.id}>
                <CardContent className="py-4">
                  <p className="text-gray-700 text-base min-h-[48px]">
                    {character.description}
                  </p>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    ID: {character.id}
                  </span>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default App;
