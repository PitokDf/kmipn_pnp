import axios from "axios";
import { getSession } from "next-auth/react";

export const loginUser = async (email: string, password: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`, {
        email,
        password,
    });
    return response.data; // Pastikan API mengembalikan data user + token
};

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 1000000
})

api.interceptors.request.use(
    async (config) => {
        const session: any = await getSession();
        if (session) {
            const token = session.user.accessToken;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config;
    },
    (error) => {
        console.error(`Request error: `, error);
        return Promise.reject(error);
    }
)

export const fetcher = (url: string) => api.get(url).then(res => res.data);

