import React from 'react';
import App from './App.jsx';
import ReactDOM from "react-dom/client";
import { Provider } from '@/components/ui/provider.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
