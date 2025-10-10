import type { TCharacter } from "@/lib/api";
const Card = ({ character }: { character: TCharacter }) => {
  return (
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
  );
};

export default Card;
