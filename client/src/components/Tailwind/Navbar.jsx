import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logoImg from '../../assets/svg/logo.svg';
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { auth } = useAuth();
    const logout = useLogout();

    const isLoggedIn = auth?.accessToken ? true : false;

    const navData = [
        { name: 'Home', to: '/' },
        { name: 'About Us', to: '/about' },
        { name: 'How to use', to: '/contact' },
        // { name: 'Services', to: '/services' },
    ];

    const navItems = navData.map((item, index) => {
        return (
            <NavLink
                className="block whitespace-nowrap mb-3 w-fit sm:mb-0 sm:mr-8"
                end
                to={item.to}
                key={index}
            >
                {item.name}
            </NavLink>
        );
    });
    return (
        <>
            <nav className="sm:flex sm:justify-between sm:w-[90%] sm:mx-auto">
                <div className="container flex justify-between items-center px-6 py-3">
                    <div className="flex items-center">
                        <img src={logoImg} className="w-12" alt="" />
                        <h3 className="font-bold text-2xl ml-3 bg-clip-text text-transparent bg-gradient-to-r from-grad1 to-grad2">
                            HealthCare
                        </h3>
                    </div>
                    <div className="sm:hidden">
                        <button
                            className="transition-colors duration-300 text-2xl text-gray-600 hover:text-primary font-bold"
                            onClick={() => setIsOpen((prev) => !prev)}
                        >
                            {!isOpen ? '☰' : '✕'}
                        </button>
                    </div>
                </div>
                <div
                    className={
                        (isOpen ? 'block' : 'hidden') +
                        ' ' +
                        'pt-2 bg-gradient-to-r text-xl font-bold text-white from-grad1 to-grad2 flex flex-col items-center sm:flex sm:flex-row sm:from-transparent sm:to-transparent sm:text-gray-600 sm:font-semibold sm:text-base sm:items-center'
                    }
                >
                    {navItems}
                    {!isLoggedIn ? (
                        <Link
                            to="login"
                            className="btn-secondary sm:btn-primary mb-4 sm:mb-0"
                        >
                            Log In
                        </Link>
                    ) : (
                        <button
                            className="btn-secondary sm:btn-secondary sm:border mb-4 sm:mb-0"
                            onClick={logout}
                        >
                            Sign Out
                        </button>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
