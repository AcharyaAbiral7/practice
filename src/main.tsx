import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
import App from './app';
 
import './index.css';
 
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div style={{width:'100vw', height:'100vh'}}>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
    </div>
  </React.StrictMode>,
);