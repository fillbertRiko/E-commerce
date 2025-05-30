import { StrictMode } from 'react';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import AppProvider from './Context/AppContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <App />
  </AppProvider>
);
