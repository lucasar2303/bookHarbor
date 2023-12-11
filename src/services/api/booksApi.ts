import axios from 'axios';

const API_KEY = 'API_KEY'; // Substitua com sua chave de API
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

// Função para buscar livros
export const searchBooks = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}&key=${API_KEY}`);
    console.log(response.data);  // Imprime a resposta no console
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    throw error;
  }
};