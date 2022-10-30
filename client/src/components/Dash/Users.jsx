import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import UserListItem from './UserListItem';
import BreadCrumb from '../Tailwind/BreadCrumb';
import LoadingSpinner from '../Tailwind/LoadingSpinner';

const Users = () => {
    // // Before RQ
    // const [users, setUsers] = useState();
    // const axiosPrivate = useAxiosPrivate();

    // useEffect(() => {
    //     let isMounted = true;
    //     const controller = new AbortController();

    //     const getUsers = async () => {
    //         try {
    //             const response = await axiosPrivate.get('/users', {
    //                 signal: controller.signal,
    //             });
    //             // console.log(response.data);

    //             isMounted && setUsers(response.data);
    //         } catch (e) {
    //             if (e.message === 'canceled') return;
    //             console.log(e.message);
    //         }
    //     };

    //     getUsers();

    //     // cleanup function
    //     return () => {
    //         isMounted = false;
    //         controller.abort();
    //     };
    // }, []);

    // RQ
    const axiosPrivate = useAxiosPrivate();
    const controller = new AbortController();
    const fetchUsers = () => {
        return axiosPrivate.get('/users', {
            signal: controller.signal,
        });
    };

    const { isLoading, isError, data, error } = useQuery(
        'get-users',
        fetchUsers
    );

    if (isLoading) {
        return (
            <div className="w-[80%] mx-auto p-6">
                <LoadingSpinner />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-[80%] mx-auto p-6">
                <div
                    className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 h-fit"
                    role="alert"
                >
                    <svg
                        aria-hidden="true"
                        className="flex-shrink-0 inline w-5 h-5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Error!</span>{' '}
                        {error.message}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[80%] mx-auto p-6">
            {/* BreadCrumb */}
            <BreadCrumb items={['Dashboard', 'Users']} />

            {/* Searchbar */}
            <div className="w-[40%] my-3">
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Search Users"
                        required=""
                    />
                    <button
                        type="submit"
                        className="absolute right-2.5 bottom-2.5 px-4 py-2 border focus:outline-none font-medium rounded-lg text-sm text-center border-blue-500 text-blue-500 hover:text-white hover:bg-blue-600 focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </div>

            {data?.data?.length ? (
                <ul>
                    {data?.data.map((user, i) => (
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
