import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Users from './components/Users';
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

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="login" element={<Login />} />
                <Route path="linkpage" element={<LinkPage />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="register" element={<Register />} />

                {/* Persitent No auth */}
                <Route element={<PersistLogin />}>
                    <Route path="/" element={<HomeLayout />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<Admin />} />
                    </Route>
                </Route>

                {/* Private Routes */}
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                        <Route path="editor" element={<Editor />} />
                        <Route path="users" element={<Users />} />
                        <Route path="lounge" element={<Lounge />} />
                    </Route>
                </Route>

                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
