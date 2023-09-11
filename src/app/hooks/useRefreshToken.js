import axiosInstance from "./axiosInstance";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const refresh = async () => {
        const { data } = await axiosInstance.get('/api/auth/refresh', {
            withCredentials: true
        });
        return data;
    }
    return refresh;
}

export default useRefreshToken;