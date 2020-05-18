import React from 'react';
import {BlockedTodoLogoIcon} from 'assets/icons';
import './App.scss';

const App = () => {
    return (
        <div className='App'>
            <header className='App-header'>
                <BlockedTodoLogoIcon className='App-logo' alt='logo' />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
            </header>
        </div>
    );
};

export default App;
