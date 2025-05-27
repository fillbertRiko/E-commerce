import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    return <h1>Hello React + Laravel!</h1>;
}

createRoot(document.getElementById('app')).render(<App />);