import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Register from './pages/register';
import SignIn from './pages/signIn';
import ToDoPage from './pages/home';
import PrivateRoute from './components/authGuard/privateRoute';
import PublicRoute from './components/authGuard/publicRoute';
import { Bounce, ToastContainer } from 'react-toastify';

function App() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: (<PrivateRoute><ToDoPage /></PrivateRoute>),
        },
        {
            path: 'signIn',
            element: <PublicRoute><SignIn /></PublicRoute>,
        },
        {
            path: 'register',
            element: <PublicRoute><Register /></PublicRoute>,
        },
    ]);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="light"
                transition={Bounce}
            />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
