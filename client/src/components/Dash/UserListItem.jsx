import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../api/axios';
import AdminAvatar from '../../assets/avatars/Admin.png';
import DoctorAvatar from '../../assets/avatars/Doctor.png';
import PatientAvatar from '../../assets/avatars/Patient.png';
import UserEditModal from './UserEditModal';

const USER_ENUM = {
    1: 'Admin',
    2: 'Doctor',
    3: 'Patient',
};

const AVATAR_ENUM = {
    1: AdminAvatar,
    2: DoctorAvatar,
    3: PatientAvatar,
};

const UserListItem = ({ user }) => {
    const [editIsVisible, setEditIsVisible] = useState(false);
    const [errorIsVisible, setErrortIsVisible] = useState(false);

    const queryClient = useQueryClient();
    const { mutate: deleteUser } = useMutation(
        (id) => {
            return axios.delete(`/users/${id}`);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('get-users');
            },
        }
    );

    const handleOnClose = () => setEditIsVisible(false);

    const handleDelete = () => {
        const isSure = confirm(
            `Are you sure you want to delete:\n${user.firstname} ${user.lastname} (${user.username})`
        );
        if (isSure) {
            deleteUser(user.id);
        }
    };

    return (
        <article className="flex items-center justify-between space-x-6 mb-3 p-6 rounded-lg shadow-md bg-slate-50 ">
            <div className="flex items-start">
                <img
                    src={AVATAR_ENUM[user.usertype]}
                    alt=""
                    width="60"
                    height="88"
                    className="flex-none rounded-md mr-3"
                />
                <div className="min-w-0 relative flex-auto">
                    <h2 className="font-semibold text-slate-900 truncate pr-20">
                        {user.firstname} {user.lastname}
                    </h2>
                    <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                        <div>
                            <dt className="sr-only">Username</dt>
                            <dd className="px-1.5 ring-1 ring-slate-200 rounded">
                                {user.username}
                            </dd>
                        </div>
                        <div>
                            <dt className="sr-only">Usertype</dt>
                            <dd className="flex items-center">
                                <svg
                                    width="2"
                                    height="2"
                                    fill="currentColor"
                                    className="mx-2 text-slate-300"
                                    aria-hidden="true"
                                >
                                    <circle cx="1" cy="1" r="1" />
                                </svg>
                                {USER_ENUM[user.usertype]}
                            </dd>
                        </div>
                        <div>
                            <dt className="sr-only">Email</dt>
                            <dd className="flex items-center font-light">
                                <svg
                                    width="2"
                                    height="2"
                                    fill="currentColor"
                                    className="mx-2 text-slate-300"
                                    aria-hidden="true"
                                >
                                    <circle cx="1" cy="1" r="1" />
                                </svg>
                                {user.email}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="flex">
                <button
                    type="button"
                    className="dash-primary-btn"
                    onClick={(e) => {
                        e.preventDefault();
                        setEditIsVisible(true);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 -ml-1 w-4 h-4"
                        fill="currentColor"
                        version="1.0"
                        width="512.000000pt"
                        height="512.000000pt"
                        viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <g
                            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                            stroke="none"
                        >
                            <path d="M4253 5080 c-78 -20 -114 -37 -183 -83 -44 -29 -2323 -2296 -2361 -2349 -21 -29 -329 -1122 -329 -1168 0 -56 65 -120 122 -120 44 0 1138 309 1166 329 15 11 543 536 1174 1168 837 838 1157 1165 1187 1212 74 116 105 270 82 407 -7 39 -30 105 -53 154 -36 76 -55 99 -182 226 -127 127 -150 145 -226 182 -135 65 -260 78 -397 42z m290 -272 c55 -27 258 -231 288 -288 20 -38 24 -60 24 -140 0 -121 -18 -160 -132 -279 l-82 -86 -303 303 -303 303 88 84 c49 46 108 93 132 105 87 42 203 41 288 -2z m-383 -673 l295 -295 -933 -932 -932 -933 -295 295 c-162 162 -295 299 -295 305 0 13 1842 1855 1855 1855 6 0 143 -133 305 -295z m-1822 -2284 c-37 -12 -643 -179 -645 -178 -1 1 30 115 68 252 38 138 79 285 91 329 l21 78 238 -238 c132 -132 233 -241 227 -243z" />
                            <path d="M480 4584 c-209 -56 -370 -206 -444 -414 l-31 -85 0 -1775 c0 -1693 1 -1778 18 -1834 37 -120 77 -187 167 -277 63 -63 104 -95 157 -121 146 -73 3 -69 2113 -66 l1895 3 67 26 c197 77 336 218 401 409 22 64 22 74 25 710 3 579 2 648 -13 676 -21 40 -64 64 -114 64 -33 0 -49 -7 -79 -34 l-37 -34 -5 -634 c-5 -631 -5 -633 -28 -690 -41 -102 -118 -179 -220 -220 l-57 -23 -1834 -3 c-1211 -1 -1853 1 -1890 8 -120 22 -227 104 -277 213 l-29 62 0 1760 0 1760 29 63 c37 80 122 161 203 194 l58 23 630 5 c704 6 664 1 700 77 23 48 13 95 -31 138 l-35 35 -642 -1 c-533 0 -651 -3 -697 -15z" />
                        </g>
                    </svg>
                    Edit User
                </button>
                <UserEditModal
                    onClose={handleOnClose}
                    visible={editIsVisible}
                    userID={user.id}
                />
                <button
                    type="button"
                    onClick={handleDelete}
                    className="dash-secondary-btn"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 -ml-1 w-4 h-4"
                        fill="currentColor"
                        version="1.0"
                        width="512.000000pt"
                        height="512.000000pt"
                        viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <g
                            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                            stroke="none"
                        >
                            <path d="M2100 4737 c-78 -18 -142 -52 -203 -107 -102 -93 -137 -194 -137 -392 l0 -127 -582 -3 c-568 -3 -584 -4 -618 -24 -52 -30 -82 -88 -77 -147 5 -54 27 -91 77 -124 31 -22 44 -23 192 -23 118 0 160 -3 163 -12 2 -7 45 -641 94 -1408 57 -873 96 -1425 106 -1475 48 -242 228 -432 475 -502 61 -17 122 -18 975 -18 1023 0 961 -4 1116 76 181 94 308 273 339 476 6 38 49 691 96 1453 47 762 87 1391 89 1398 3 9 45 12 163 12 148 0 161 1 192 23 48 32 72 69 77 119 7 58 -23 118 -74 149 l-38 24 -581 3 -582 3 -4 152 c-4 128 -8 161 -27 210 -43 110 -142 206 -258 250 -56 21 -73 22 -488 24 -309 1 -445 -2 -485 -10z m911 -355 c29 -32 29 -34 29 -152 l0 -120 -480 0 -480 0 0 119 c0 113 1 121 25 150 14 16 36 32 48 34 12 3 203 4 425 3 l404 -1 29 -33z m869 -624 c0 -13 -38 -642 -85 -1398 -58 -933 -91 -1391 -100 -1426 -29 -103 -120 -196 -218 -226 -33 -10 -242 -13 -927 -13 l-885 0 -55 26 c-31 14 -72 40 -91 57 -43 38 -96 133 -104 188 -6 41 -165 2719 -165 2779 l0 35 1315 0 1315 0 0 -22z" />
                            <path d="M1840 3228 c-18 -13 -43 -36 -54 -51 -21 -28 -21 -31 -21 -937 0 -906 0 -909 21 -937 73 -98 195 -98 268 0 21 28 21 31 21 937 0 906 0 909 -21 937 -35 48 -82 73 -134 73 -32 0 -57 -7 -80 -22z" />
                            <path d="M2480 3228 c-18 -13 -43 -36 -54 -51 -21 -28 -21 -31 -21 -937 0 -906 0 -909 21 -937 73 -98 195 -98 268 0 21 28 21 31 21 937 0 906 0 909 -21 937 -35 48 -82 73 -134 73 -32 0 -57 -7 -80 -22z" />
                            <path d="M3120 3228 c-18 -13 -43 -36 -54 -51 -21 -28 -21 -31 -21 -937 0 -906 0 -909 21 -937 73 -98 195 -98 268 0 21 28 21 31 21 937 0 906 0 909 -21 937 -35 48 -82 73 -134 73 -32 0 -57 -7 -80 -22z" />
                        </g>
                    </svg>
                    Delete
                </button>
            </div>
        </article>
    );
};

export default UserListItem;
