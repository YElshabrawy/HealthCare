import useAuth from './useAuth';
import axios from '../api/axios';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('auth/refresh_token', {
            withCredentials: true,
        });
        setAuth((prev) => {
            return {
                ...prev,
                user: response.data.user,
                username: response.data.user.username,
                accessToken: response.data.accessToken,
            };
        });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
