import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import axios from '../../api/axios';
import GoBackBtn from '../Tailwind/GoBackBtn';
const REGISTER_URL = '/auth/register';

const Register = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    // const from = location.state?.from?.pathname || '/'; // To be able to visit the wanted location before auth

    // Focus purpose
    const fNameRef = useRef();
    const errRef = useRef();

    // States
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usertype, setUsertype] = useState(3); // Defult patient
    const [errMsg, setErrMsg] = useState('');

    const [isPatient, setIsPatient] = useState(true);
    const [isDoctor, setIsDoctor] = useState(false);

    useEffect(() => {
        fNameRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password, firstname, lastname, username]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({
                    firstname,
                    lastname,
                    username,
                    email,
                    password,
                    usertype,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            const accessToken = response?.data?.accessToken;
            const usertype2 = response?.data?.usertype;
            const username2 = response?.data?.username;
            const id = response?.data?.id;
            setAuth({
                email,
                password,
                usertype: usertype2,
                username: username2,
                id,
                accessToken,
            });
            navigate('/', { replace: true });
        } catch (err) {
            console.log('[catch Blk]', err.response?.data?.message);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg(err.response?.data?.message);
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            <div className="h-screen flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-16 rounded-lg shadow-xl w-full max-w-md space-y-8 align-middle">
                    <div>
                        <p
                            ref={errRef}
                            className={`${
                                errMsg
                                    ? 'text-rose-900 p-2 bg-red-400 font-medium rounded'
                                    : ''
                            }`}
                            aria-live="assertive"
                        >
                            {errMsg}
                        </p>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Register
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" value="true" />
                        <div>
                            <div className="flex">
                                <div>
                                    <label
                                        htmlFor="firstname"
                                        className="sr-only"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        value={firstname}
                                        ref={fNameRef}
                                        onChange={(e) =>
                                            setFirstname(e.target.value)
                                        }
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-tl-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="First Name"
                                        autoComplete="off"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastname"
                                        className="sr-only"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        value={lastname}
                                        onChange={(e) =>
                                            setLastname(e.target.value)
                                        }
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-tr-md border border-l-transparent border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Last Name"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                    className="relative block w-full appearance-none rounded-none border-y-transparent border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Username"
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    name="email"
                                    className="relative block w-full appearance-none rounded-none border border-b-transparent border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="w-[40%] mx-auto flex items-center justify-between">
                            <button
                                className="w-10 cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsPatient(true);
                                    setIsDoctor(false);
                                    setUsertype(3);
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="Layer_1"
                                    data-name="Layer 1"
                                    viewBox="0 0 512 512"
                                >
                                    <title>handicap-flat</title>
                                    <path
                                        d="M0,256C0,114.61,114.61,0,256,0S512,114.63,512,256,397.38,512,256,512,0,397.39,0,256Z"
                                        fill={isPatient ? '#312E81' : '#4f46e5'}
                                        id="id_101"
                                    />
                                    <path
                                        d="M363.06,355.43h0l-31.4-72.11c-3.49-8.52-12.8-12.8-21.72-10.86l-62.8,14.34V219.37a19,19,0,1,0-38,0l.37,91.1c0,5.83,2.32,11.64,7,15.12,4.26,3.87,10.47,5,15.89,3.87L303,313.18l25.2,57.38a18.14,18.14,0,0,0,17.06,11.24,26.76,26.76,0,0,0,7.74-1.16,19.55,19.55,0,0,0,10.09-25.21Z"
                                        fill="#fff"
                                        id="id_102"
                                    />
                                    <path
                                        d="M263.43,160.05h0a29.85,29.85,0,1,0-59.7,0,29.54,29.54,0,0,0,29.85,29.46c16.28,0,29.85-13.19,29.85-29.46Z"
                                        fill="#fff"
                                        id="id_103"
                                    />
                                    <path
                                        d="M280.88,337.6c5.42-1.16,11.23-1.94,17-3.49.78,2.32,2.34,4.65,3.11,7.36-14.73,22.49-40.71,39.16-70.17,39.16-46.13,0-83.35-38-83.35-84.13,0-31.79,19.77-58.93,45.74-72.89v22.1C177.75,257.35,166.5,276,166.5,296.9c0,35.29,28.69,64.36,64,64.36,20.54,0,38.76-8.92,50.4-23.65Z"
                                        fill="#fff"
                                        id="id_104"
                                    />
                                </svg>
                            </button>
                            <button
                                className="w-10 cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsPatient(false);
                                    setIsDoctor(true);
                                    setUsertype(2);
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="Layer_1"
                                    data-name="Layer 1"
                                    viewBox="0 0 512 512"
                                >
                                    <title>stethoscope-flat</title>
                                    <path
                                        d="M0,256C0,114.61,114.61,0,256,0S512,114.63,512,256,397.38,512,256,512,0,397.39,0,256Z"
                                        // fill="#4f46e5"
                                        fill={isDoctor ? '#312E81' : '#4f46e5'}
                                        id="id_101"
                                    />
                                    <path
                                        d="M390.12,245.9a42.36,42.36,0,1,0-49.41,41.4v44.23c0,34.82-28.24,63.07-62.61,63.07a62.66,62.66,0,0,1-62.58-63.07l-.46-50.36c16.44-2.33,32.45-11.77,46.56-28.69,2.37-2.37,3.31-5.19,2.37-8,18.81-24.93,30.58-58.35,30.58-84.24,0-39.52-17.87-43.76-47.54-50.81a11,11,0,0,0-9.85-6.13,11.16,11.16,0,0,0-11.32,11.3,11.47,11.47,0,0,0,11.32,11.3c2.33,0,4.7-1.42,6.58-2.82h0c28.69,7,36.71,8.46,36.71,37.16,0,22.6-10.83,53.17-27.3,75.29a9.93,9.93,0,0,0-7.52,3.31c-8.46,9.88-21.66,21.65-37.19,21.65-16,0-29.15-11.77-37.64-21.65a10.23,10.23,0,0,0-8-3.31c-16-22.12-26.85-52.69-26.85-75.29,0-28.7,7.52-30.57,36.71-37.16,1.87,1.4,3.75,2.82,6.61,2.82a11.46,11.46,0,0,0,11.28-11.3,11.15,11.15,0,0,0-11.28-11.3,12.33,12.33,0,0,0-10.38,6.13c-29.18,7.05-47,10.83-47,50.81,0,25.89,11.28,59.77,30.57,84.24a8.37,8.37,0,0,0,2.37,8.46c14.11,16.47,29.64,25.91,46.11,28.24v50.36a76.94,76.94,0,1,0,153.88,0V287.31a41.63,41.63,0,0,0,35.31-41.4Z"
                                        fill="#fff"
                                        id="id_102"
                                    />
                                    <path
                                        d="M347.74,224.73h0a21.07,21.07,0,0,1,21.17,21.17,21.39,21.39,0,0,1-21.17,21.17c-11.28,0-21.17-9.89-21.17-21.17a21.39,21.39,0,0,1,21.17-21.17Z"
                                        fill={isDoctor ? '#312E81' : '#4f46e5'}
                                        id="id_103"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ease-in-out duration-200"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg
                                        className="h-5 w-5 svg-white group-hover:text-indigo-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        version="1.0"
                                        width="512.000000pt"
                                        height="512.000000pt"
                                        viewBox="0 0 512.000000 512.000000"
                                        preserveAspectRatio="xMidYMid meet"
                                    >
                                        <g
                                            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                            fill="#000000"
                                            stroke="none"
                                        >
                                            <path d="M1275 4670 c-417 -88 -740 -414 -825 -832 -20 -96 -20 -130 -18 -1311 l3 -1212 22 -77 c49 -171 112 -296 213 -421 139 -172 328 -292 568 -360 l77 -22 1209 -3 c1051 -2 1221 0 1291 13 442 82 776 416 860 858 23 120 22 1500 0 1555 -67 160 -299 170 -383 17 -15 -27 -18 -106 -23 -760 -6 -810 -2 -767 -76 -915 -54 -110 -170 -224 -284 -278 -149 -71 -71 -67 -1349 -67 -937 0 -1165 3 -1210 14 -181 44 -352 180 -428 341 -71 150 -67 72 -67 1350 0 1278 -4 1200 67 1350 54 114 168 229 278 284 149 73 105 69 917 75 l731 6 44 30 c138 97 118 306 -34 370 -33 13 -130 15 -765 14 -674 0 -735 -2 -818 -19z" />
                                            <path d="M3952 4676 c-29 -8 -87 -30 -130 -51 -75 -36 -100 -61 -980 -939 -497 -495 -911 -915 -922 -931 -10 -17 -62 -203 -115 -415 -108 -432 -112 -465 -62 -537 40 -58 89 -86 155 -91 47 -3 125 13 442 93 212 53 398 105 415 115 16 11 436 425 931 922 l902 903 40 85 c47 100 62 163 62 265 0 102 -15 166 -62 263 -73 154 -226 278 -389 317 -77 18 -214 18 -287 1z m235 -437 c75 -46 101 -156 56 -229 -12 -19 -94 -107 -183 -195 l-160 -160 -123 123 -122 123 175 173 c125 124 185 177 210 185 46 13 106 5 147 -20z m-710 -761 c62 -62 113 -117 113 -123 0 -5 -237 -247 -527 -536 l-528 -527 -153 -37 c-84 -21 -155 -35 -159 -32 -3 4 11 75 32 159 l37 153 527 528 c289 290 530 527 536 527 5 0 60 -51 122 -112z" />
                                        </g>
                                    </svg>
                                    {/* <svg
                                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                            clip-rule="evenodd"
                                        />
                                    </svg> */}
                                </span>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <GoBackBtn />
        </>
    );
};

export default Register;
