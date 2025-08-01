import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface Options {
    token?: string;
}

interface ServerResponse<D> {
    // todo: colocar los demas atributos de la respuesta del server
    data: D;
}

interface ServerError {
    message: string[];
    error: string;
    statusCode: number;
}

class HttpClient {
    private instance;

    constructor(baseURL: string, options?: Options) {
        this.instance = axios.create({
            baseURL,
            // withCredentials: true,
        });

        this.instance.interceptors.request.use((config) => {
            if (options?.token) {
                config.headers["Authorization"] = `Bearer ${options.token}`;
            }
            return config;
        });

        this.instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    const serverError: ServerError = {
                        message: error.response.data.message || ["An unknown error occurred"],
                        error: error.response.data.error || "Unknown Error",
                        statusCode: error.response.status || 500,
                    };
                    return Promise.reject(serverError);
                }
                return Promise.reject({
                    message: ["Network error or no response from server"],
                    error: "Network Error",
                    statusCode: 0,
                });
            }
        );
    }

    async get<T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<ServerResponse<T>> {
        const response: AxiosResponse<ServerResponse<T>> = await this.instance.get(
            url,
            config
        );

        return response.data;
    }

    async post<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<ServerResponse<T>> {
        const response: AxiosResponse<ServerResponse<T>> = await this.instance.post(
            url,
            data,
            config
        );
        return response.data;
    }

    async put<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<ServerResponse<T>> {
        const response: AxiosResponse<ServerResponse<T>> = await this.instance.put(
            url,
            data,
            config
        );
        return response.data;
    }

    async delete<T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<ServerResponse<T>> {
        const response: AxiosResponse<ServerResponse<T>> =
            await this.instance.delete(url, config);
        return response.data;
    }
    
}

export default HttpClient;
