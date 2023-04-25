import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3ReactProvider } from '@web3-react/core';

declare global {
  interface Window {
    ethereum?: any;
  }
}

async function getLibrary(provider: any) {
  return await provider.send('eth_requestAccounts', []);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>
);

reportWebVitals();
