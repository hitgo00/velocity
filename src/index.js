import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import { UserProvider } from './components/context/UserContext';
import { CourseProvider } from './components/context/CourseContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <CourseProvider>
        <App />
      </CourseProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
