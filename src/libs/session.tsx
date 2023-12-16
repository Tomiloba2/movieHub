import axios from "axios";

//server api
export const serverInstance = axios.create({
    baseURL: 'http://localhost:2000/api/',
    withCredentials: true
})

export const getSession = async () => {
    try {
        const res = await serverInstance.get(`/session`)
        return res.data
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
