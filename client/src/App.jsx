import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import DashLayout from './components/Dash/DashLayout';
import Users from './components/Dash/Users';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Unauthorized from './components/Unauthorized';
import Missing from './components/Missing';
import Home from './components/Home';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/Private/RequireAuth';
import PersistLogin from './components/PersistLogin';
import HomeLayout from './components/HomeLayout';
import useAuth from './hooks/useAuth';

function App() {
    const { auth } = useAuth();
    console.log(auth);
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="login" element={<Login />} />
                <Route path="linkpage" element={<LinkPage />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="register" element={<Register />} />

                {/* Welcome route */}
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<Admin />} />
                </Route>

                {/* Private Routes */}
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                        <Route path="dash" element={<DashLayout />}>
                            <Route path="users" element={<Users />} />
                        </Route>
                    </Route>
                </Route>

                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
