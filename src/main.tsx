import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primeicons/primeicons.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PrimeReactProvider>
                <App />
            </PrimeReactProvider>  
        </Provider>
    </StrictMode>,
);
