import { Outlet } from 'react-router-dom';
import Navbar from './Tailwind/Navbar';

const HomeLayout = () => {
    return (
        <main className="App">
            <Navbar />
            <Outlet />
        </main>
    );
};

export default HomeLayout;
