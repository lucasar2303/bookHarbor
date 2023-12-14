import axios from 'axios';

const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_BOOKS_API_KEY;
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';


// Função para buscar livros
export const searchBooks = async (query: string, sortOption: string, typeOption: string) => {
  try {
    let url = `${BASE_URL}?q=${query}&key=${API_KEY}`;

    url += '&orderBy='+sortOption;

    url += "&printType="+typeOption;

    const response = await axios.get(url);
    console.log(response.data); // Imprime a resposta no console
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    throw error;
  }
};
