import { useRoutes, RouteObject } from "react-router-dom";
import Layout from "../components/layout";
import SignIn from "./auth/SignIn";
import ProtectedRoute from "../components/routes/ProtectedRoute";
import PublicRoute from "../components/routes/PublicRoute";
import Dashboard from "./dashboard";
import Medicaments from "./medicament";

export const routes = (): RouteObject[] => [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <></> },
      {
        element: <Layout />,
        children: [
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/medicament', element: <Medicaments /> },
        ]
      },
    ]
  },
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      { index: true, element: <></> },
      { path: '/sign-in', element: <SignIn /> }
    ]
  }
];

function RoutesWrapper() {
  const routing = useRoutes(routes());
  return (
    <>
      { routing }
    </>
  );
}

export default RoutesWrapper;
