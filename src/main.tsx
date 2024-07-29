import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './routes/Main';
import Token from './routes/Token';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Token />,
  },
  {
    path: "/main",
    element: <Main />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
