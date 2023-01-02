import { useState } from "react";
import axios from "axios";

type reqType = {
    method: string,
    url: string,
    baseURL: string,
    headers?: {}
}
export const useAxios = (url: string, method: string) => {

    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string>('');
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const req: reqType = {
        method,
        url,
        baseURL: 'https://randomuser.me/api/',
    };


    const axiosReq = async (payload: any = null, customURL: string | null = null) => {
        setError('');
        try {

            if (customURL)
            req.url = customURL;
            
            const response = await axios.request({
                ...req,
                data: payload
            });
            setData(response.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoaded(true);
        }
    };


    return { data, error, isLoaded, axiosReq };
};