import { useEffect, useState } from "react";
import { getCharacters, type TCharacter } from "./lib/api";

const App = () => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await getCharacters();
      setCharacters(response.products);
    };
    fetchCharacters();
  }, []);

  return (
    <div>
      <h1>Characters</h1>
      {characters.map((character) => (
        <div key={character.id}>
          <h1>{character.title}</h1>
          <p>{character.description}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
