import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './css/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthWrapper from './layouts/AuthWrapper';
import ProtectedRoutes from './layouts/ProtectedRoutes';
import PublicRoutes from './layouts/PublicRoutes';
import ErrorPage from './routes/error-page';
import Root from './routes/Root';
import Register from './routes/Register';
import Login from './routes/Login';
import UserHome from './routes/UserHome';
import loginAction from './actions/loginAction';
import registerAction from './actions/registerAction';
import CreateRequest from './routes/CreateRequest';
import Settings from './routes/Settings';
import loadOrgs from './loaders/loadOrgs';
import NewReqAction from './actions/NewReqAction';
import Profile from './routes/Profile';
import loadUserData from './loaders/loadUserData';
import SummaryView from './routes/SummaryView';
import editUserAction from './actions/editUserAction';

const router = createBrowserRouter([
  {
    element: <AuthWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Root />,
      },
      {
        element: <PublicRoutes />,
        
        children: [
          {
            path: '/login',
            element: <Login />,
            action: loginAction,
          },
          {
            path: '/register',
            element: <Register />,
            action: registerAction,
          },
        ],
      },
      {
        element: <ProtectedRoutes />,
        id: 'protected',
        loader: loadUserData,
        children: [
          {
            path: '/main',
            element: <UserHome />,
            action: NewReqAction,
            loader: loadUserData
          },
          {
            path: '/new-request',
            element: <CreateRequest />,
            action: NewReqAction,
            loader: loadOrgs,
          },
          {
            path: '/settings',
            element: <Settings />,
            loader: loadOrgs,
          },
          {
            path: '/profile',
            element: <Profile />,
            action: editUserAction,
          },
          {
            path: '/summary',
            element: <SummaryView />,
            loader: loadUserData,
          },
        ]
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
