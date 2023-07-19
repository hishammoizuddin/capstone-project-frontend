import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';
import reportWebVitals from './reportWebVitals';
 import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'primereact/resources/primereact.min.css' ;
import "primereact/resources/themes/lara-light-indigo/theme.css";
import CustomerSignUp from './auth/customer-signup';
import Search from './features/product/product-search';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>

    // <Search/>
    // <CustomerSignUp/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();