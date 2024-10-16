import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MapView from './comp/Map';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Description from './comp/Description';
import AdminView from './comp/Admin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/Reporte",
    element: <MapView/>,
  },
  {
    path: "/Detalles",
    element: <Description/>,
  },
  {
    path: "/Admin",
    element: <AdminView/>,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
