import { lazy, ReactElement } from 'react';
import { DocumentIcon, HomeIcon, SupportIcon } from "./components/template/Icons/Icons";

const Dashboard = lazy(() => import("./views/dashboard"));
const Medicaments = lazy(() => import("./views/medicament"));

export interface Route {
  path: string;
  name: string;
  category?: string;
  state?: string;
  secondaryNavbar?: boolean,
  protected: boolean;
  icon: ReactElement;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  views?: Route[];
}

const dashRoutes: Route[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    protected: true,
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
  },
  {
    path: "/medicament",
    name: "Medicamentos",
    protected: false,
    icon: <DocumentIcon color="inherit" />,
    component: Medicaments,
  },
];

export default dashRoutes;
