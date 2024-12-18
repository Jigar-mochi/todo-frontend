import { Button } from 'primereact/button';
import './style.scss';

const Header = () => {
    return (
        <div className='header-wrapper'>
            <p>Jigar To Do</p>
            <Button>
                Logout
            </Button>
        </div>
    );
};

export default Header;