import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './index.css'
import ReactDOM from "react-dom/client";
import LandingPage from './LandingPage';
import LoginAndRegister from './LoginAndRegister';
import User from './User';
import GroupDetail from './GroupDetail';
import DarkVeil from './DarkVeil';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AddPayment from './AddPayment';
import JoiningRequests from './JoiningRequests';
import PaymentApprovals from '../PaymentApprovals';
const AppLayout = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center relative'>
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <DarkVeil />
      </div>
      <Outlet />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/Login", element: <LoginAndRegister /> },
      { path: "/User", element: <User /> },
      {
        path: "/GroupDetail/:title",
        element: <GroupDetail />,
        children: [
          { index: true, element: <AddPayment /> },
          { path: "joining-requests", element: <JoiningRequests /> },
          { path: "payment-approvals", element: <PaymentApprovals /> },
        ],
      },
    ],
  },
]);

const r = ReactDOM.createRoot(document.getElementById("root"));
r.render(<RouterProvider router={appRouter} />);
