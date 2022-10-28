import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import UserListItem from './UserListItem';
import BreadCrumb from '../Tailwind/BreadCrumb';

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
                console.log(response.data);

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
        <div className="w-[80%] mx-auto p-6">
            <BreadCrumb items={['Dashboard', 'Users']} />

            <div className="w-[40%] my-3">
                <label
                    for="default-search"
                    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                    Search
                </label>
                <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                            aria-hidden="true"
                            class="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Search Users"
                        required=""
                    />
                    <button
                        type="submit"
                        class="absolute right-2.5 bottom-2.5 px-4 py-2 border focus:outline-none font-medium rounded-lg text-sm text-center border-blue-500 text-blue-500 hover:text-white hover:bg-blue-600 focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </div>

            {users?.length ? (
                <ul>
                    {users.map((user, i) => (
                        <UserListItem key={i} user={user} />
                    ))}
                </ul>
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};

export default Users;
