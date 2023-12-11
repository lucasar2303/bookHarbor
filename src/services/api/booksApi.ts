import axios from 'axios';

console.log("APIKEY = "+import.meta.env.VITE_REACT_APP_GOOGLE_BOOKS_API_KEY)
const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_BOOKS_API_KEY;
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';


// Função para buscar livros
export const searchBooks = async (query: string) => {
  try {
    console.log(API_KEY)
    const response = await axios.get(`${BASE_URL}?q=${query}&key=${API_KEY}`);
    console.log(response.data);  // Imprime a resposta no console
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    throw error;
  }
};