import React, { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../api/axios';

const UserEditModal = ({ visible, onClose, userID }) => {
    const queryClient = useQueryClient();
    const { mutate: editUser } = useMutation(
        (user) => {
            return axios.put(`/users/${userID}`, user);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('get-users');
            },
        }
    );

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [usertype, setUsertype] = useState(-1); // Defult patient

    if (!visible) return null;

    const handleSubmit = () => {
        const editedUser = {
            firstname,
            lastname,
            username,
            email,
            usertype: parseInt(usertype),
        };

        if (editedUser.usertype === -1) delete editedUser.usertype;

        Object.keys(editedUser).forEach((key) => {
            if (!editedUser[key]) {
                delete editedUser[key];
            }
        });

        editUser(editedUser);
        onClose();
        console.log(editedUser);
    };

    return (
        <div
            id="defaultModal"
            tabIndex="-1"
            aria-hidden="true"
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center bg-black bg-opacity-20"
        >
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit User - {userID}
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 space-y-2">
                        {/* Form */}
                        <div id="fn">
                            <label htmlFor="firstname" className="sr-only">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="First Name"
                                autoComplete="off"
                            />
                        </div>
                        <div id="ln">
                            <label htmlFor="lastname" className="sr-only">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Last Name"
                                autoComplete="off"
                            />
                        </div>
                        <div id="username">
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Username"
                                autoComplete="off"
                            />
                        </div>
                        <div id="email">
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                name="email"
                                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email address"
                                autoComplete="off"
                            />
                        </div>
                        <div className="relative w-full">
                            <select
                                onChange={(e) => setUsertype(e.target.value)}
                                placeholder="User Type"
                                className=" p-2.5 bg-white shadow-sm outline-none relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                                focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="-1" defaultValue>
                                    User type
                                </option>
                                <option value="1">Admin</option>
                                <option value="2">Doctor</option>
                                <option value="3">Patient</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center p-4 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="dash-primary-btn"
                        >
                            Edit User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserEditModal;
