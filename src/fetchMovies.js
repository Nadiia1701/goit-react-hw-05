import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/";
const api_read_access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWVjYTEyZTdiZmNmNGI4ZjA4NTA4YjNlMTQyYmY1MCIsInN1YiI6IjY2MmI5MDZmZTE2ZTVhMDExY2U3NmE1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W4Ki4qqtnF--Qm0iWodLtnmhQbYCf4RVABK4AXWN6kk";
const API_KEY = "01eca12e7bfcf4b8f08508b3e142bf50"

const options = {
  headers: {
    Authorization: `Bearer ${api_read_access_token}`
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`/3/trending/movie/day?api_key=${API_KEY}`, options);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};


export const fetchMoviesList = async (searchQuery, currentPage) => {
      try {
     const response = await axios.get("/3/search/movie", {
        params: {
            api_key: API_KEY,
            query: searchQuery,
            page: currentPage,
        }
    }, options);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
}

export const fetchMovieById = async (movie_id) => {
  try {
    const response = await axios.get(`/3/movie/${movie_id}`, options);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw error;
  }
}

