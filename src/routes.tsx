import { lazy, ReactElement } from 'react';
import { CartIcon, HomeIcon, StatsIcon } from "./components/template/Icons/Icons";

const Dashboard = lazy(() => import("./views/dashboard"));
const Team = lazy(() => import("./views/team"));
const BiddingList = lazy(() => import("./views/bidding/BiddingList"));

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
    path: "/team",
    name: "Equipo",
    protected: true,
    icon: <StatsIcon color="inherit" />,
    component: Team,
  },
  {
    path: "/bidding",
    name: "Subastas",
    protected: true,
    icon: <CartIcon color="inherit" />,
    component: BiddingList,
  },
];

export default dashRoutes;
