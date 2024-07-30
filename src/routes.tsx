import { lazy, ReactElement } from 'react';
import { CartIcon, DocumentIcon, HomeIcon, PersonIcon, StatsIcon } from "./components/template/Icons/Icons";

const Dashboard = lazy(() => import("./views/dashboard"));
const Allergies = lazy(() => import("./views/allergy"));
const Patients = lazy(() => import("./views/patient"));
const Medicaments = lazy(() => import("./views/medicament"));
const Sales = lazy(() => import("./views/sale"));

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
    path: "/allergy",
    name: "Alergias",
    protected: true,
    icon: <StatsIcon color="inherit" />,
    component: Allergies,
  },
  {
    path: "/patient",
    name: "Pacientes",
    protected: true,
    icon: <PersonIcon color="inherit" />,
    component: Patients,
  },
  {
    path: "/medicament",
    name: "Medicamentos",
    protected: true,
    icon: <DocumentIcon color="inherit" />,
    component: Medicaments,
  },
  {
    path: "/sale",
    name: "Venta",
    protected: true,
    icon: <CartIcon color="inherit" />,
    component: Sales,
  },
];

export default dashRoutes;
