import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
// // import './index.css'
//  import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
{/*router step1*/}
<RecoilRoot>
 <BrowserRouter>
<App />
  </BrowserRouter>
</RecoilRoot>
</React.StrictMode>
);



