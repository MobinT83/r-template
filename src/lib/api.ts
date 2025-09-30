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

export const getCharacters = async (params?: {
  search?: string;
  limit?: number;
  skip?: number;
}): Promise<{
  limit: number;
  skip: number;
  total: number;
  products: TCharacter[];
}> => {
  const { search = "", limit = 0, skip = 0 } = params || {};
  const response = await api.get("/products" + (search ? "/search" : ""), {
    params: search ? { q: search, limit, skip } : { limit, skip },
  });
  return response.data;
};
