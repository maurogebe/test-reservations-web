import { lazy, ReactElement } from 'react';
import { HomeIcon } from "./components/template/Icons/Icons";

const Dashboard = lazy(() => import("./views/dashboard"));
const Reservations = lazy(() => import("./views/reservations"));

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
    path: "/reservation",
    name: "Reservaciones",
    protected: true,
    icon: <HomeIcon color="inherit" />,
    component: Reservations,
  },
];

export default dashRoutes;
