import { useRoutes, RouteObject, Navigate } from "react-router-dom";
import Layout from "../components/layout";
import SignIn from "./auth/SignIn";
import ProtectedRoute from "../components/routes/ProtectedRoute";
import PublicRoute from "../components/routes/PublicRoute";
import Dashboard from "./dashboard";
import Medicaments from "./medicament";
import Allergies from "./allergy";
import Patients from "./patient";
import Sales from "./sale";
import ConfigProvider from "../utils/hooks/useConfig";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { themeConfig } from "../constants/theme.constant";

export const routes = (): RouteObject[] => [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Navigate to="/dashboard"/> },
      {
        element: <Layout />,
        children: [
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/allergy', element: <Allergies /> },
          { path: '/patient', element: <Patients /> },
          { path: '/medicament', element: <Medicaments /> },
          { path: '/sale', element: <Sales /> },
        ]
      },
    ]
  },
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      { index: true, element: <Navigate to="/sign-in"/> },
      { path: '/sign-in', element: <SignIn /> }
    ]
  }
];

function RoutesWrapper() {

	const theme = useSelector((state: RootState) => state.theme)

	const currentTheme = {
		...themeConfig,
		...theme
	}

  const routing = useRoutes(routes());

  return (
    <ConfigProvider value={currentTheme}>
      { routing }
      </ConfigProvider>
  );
}

export default RoutesWrapper;
