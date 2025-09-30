import axios from "axios";

const BASE_URL = "https://dummyjson.com/";

const api = axios.create({
  baseURL: BASE_URL,
});

export type TCharacter = {
  id: string;
  name: string;
  anime: string;
  power: number;
  title: string;
  description: string;
  intelligence: number;
  speed: number;
  strength: number;
  image: string;
  abilities: string[];
  personality: string;
  birthday: string;
  height: string;
  weight: string;
  createAt: string;
  updateAt: string;
};

export const getCharacters = async (): Promise<{
  limit: number;
  skip: number;
  total: number;
  products: TCharacter[];
}> => {
  const response = await api.get("/products");
  return response.data;
};
