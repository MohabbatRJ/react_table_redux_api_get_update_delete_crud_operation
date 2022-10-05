import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NewEdit from './components/NewEdit';
import Store from './redux/store/store';
import { Provider } from 'react-redux';
import NewData from './components/NewData';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/newData' element={<NewData />} />
          <Route path='/edit/:id' element={<NewEdit />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

