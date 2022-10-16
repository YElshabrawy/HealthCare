import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';

const Home = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    };

    return (
        <section>
            <h1>Home - {auth?.username}</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/users">Go to the Users page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
    );
};

export default Home;
