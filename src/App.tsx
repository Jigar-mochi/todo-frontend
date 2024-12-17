import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Register from './pages/register';
import SignIn from './pages/signIn';
import ToDoPage from './pages/home';

function App() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: (<ToDoPage />),
        },
        {
            path: 'signIn',
            element: <SignIn />,
        },
        {
            path: 'register',
            element: <Register />,
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
