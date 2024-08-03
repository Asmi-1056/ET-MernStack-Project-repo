import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import AddTrans from './components/AddTrans';
// import Overview from './components/Overview';
// import Tracker from './components/Tracker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <AddTrans /> */}
  </React.StrictMode>
);
reportWebVitals();