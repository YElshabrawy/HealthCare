import { Outlet } from 'react-router-dom';
import Sidebar from '../Tailwind/Sidebar';

const HomeLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default HomeLayout;
