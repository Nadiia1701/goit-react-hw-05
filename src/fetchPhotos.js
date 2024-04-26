import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com"

export const fetchPhotos = async (searchQuery, currentPage) => {
    const response = await axios.get("/search/photos", {
        params: {
            client_id: "ZpnJT1ilgJTrC4AdnVDJhj9_t-JrB6gRI132WdZAKCk",
            query: searchQuery,
            page: currentPage,
            per_page: 8,
        }
    });
    return response.data.results;
}