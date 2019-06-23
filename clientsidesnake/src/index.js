import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <Routes />
    </Router>
    , 
    document.getElementById('root'));
registerServiceWorker();
