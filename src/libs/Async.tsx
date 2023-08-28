import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export const apiKey = import.meta.env.VITE_API_KEY
export const imgUrl = 'https://image.tmdb.org/t/p/original/'

export const detailFetchData = async (url: string) => {
    const res = await instance.get(url)
    return res.data || res.data?.results
}
const fetchData = async (url: string) => {
    const res = await instance.get(url)
    return res.data?.results || res.data?.genres
}
export default fetchData