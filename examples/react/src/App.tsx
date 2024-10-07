import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import EnsDetail from './pages/EnsDetail';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/ens/:ensName',
    element: <EnsDetail />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
