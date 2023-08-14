import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ReduxProvider } from './redux/Provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </React.StrictMode>
);

// 1) try to replace redux store with react-query and recoil
// 2) use another hooks like useMemo, useCallBackHook for better performance
