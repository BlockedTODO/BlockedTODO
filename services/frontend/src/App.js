import React from 'react';
import Store from './Store';
import AppRouter from './AppRouter';
import './App.scss';

const App = () => (
    <div id='app'>
        <Store>
            <AppRouter />
        </Store>
    </div>
);

export default App;
