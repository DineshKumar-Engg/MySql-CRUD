import React from 'react';
import ReactDOM from 'react-dom/client';
import { StoreProvider } from './Store';
import App from './App';
import './index.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


        <StoreProvider>
            <App/>
        </StoreProvider>

);