import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal,
                });
                // console.log(response.data);

                isMounted && setUsers(response.data);
            } catch (e) {
                if (e.message === 'canceled') return;
                console.log(e.message);
            }
        };

        getUsers();

        // cleanup function
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return (
        <div>
            <h1>Users List</h1>
            {users?.length ? (
                <ul>
                    {users.map((user, i) => (
                        <li key={i}>{user?.username}</li>
                    ))}
                </ul>
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};

export default Users;
