import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './index.css'
import ReactDOM from "react-dom/client";
import LandingPage from './LandingPage';
import LoginAndRegister from './LoginAndRegister';
import DarkVeil from './DarkVeil';

const AppLayout = () => {
  return (
    <div className='w-full h-screen flex justify-center relative'>
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <DarkVeil />
      </div>
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: [<AppLayout />],
    children: [
      {
        path: "/",
        element: (
          <>
          <LandingPage/>
          </>
        ),
      },
      {
        path: "/Login",
        element: (
          <>
          <LoginAndRegister/>
          </>
        ),
      }
    ],
  },
]);

const r = ReactDOM.createRoot(document.getElementById("root"));
r.render(<RouterProvider router={appRouter} />);
