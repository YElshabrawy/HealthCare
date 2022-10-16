import axios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth } = useAuth();
    const logout = async () => {
        setAuth({});
        try {
            await axios.delete('auth/refresh_token', {
                withCredentials: true,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return logout;
};

export default useLogout;
