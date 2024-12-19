import { Button } from 'primereact/button';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/signIn');
    };

    return (
        <div className='header-wrapper'>
            <p>Jigar To Do</p>
            <Button onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
};

export default Header;