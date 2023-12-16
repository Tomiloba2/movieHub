import axios from "axios";

//server api
export const serverInstance = axios.create({
    baseURL: 'http://localhost:2000/api/',
    withCredentials: true
})

export const fetchServerData = async (url: string) => {
    try {
        const res = await serverInstance.get(url)
        return res.data.data
    } catch (error: any) {
        if (error.response) {
            return error.response.data.message
        } else if (error.request) {
            return error.request.message
        } else {
            return error.message
        }
    }
}
