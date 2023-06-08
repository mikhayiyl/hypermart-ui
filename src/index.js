import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import './styles.css';
import App from './App';
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import configureStore from "./store/configureStore";
import { PersistGate } from 'redux-persist/integration/react';

const store = configureStore();
let persistor = persistStore(store);


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </BrowserRouter >,
    document.getElementById('root')
);
