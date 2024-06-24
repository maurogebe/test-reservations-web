// RoutesWrapper.tsx
import { useRoutes, RouteObject } from "react-router-dom";
import Layout from "../components/layout";
import ProductList from "./product/ProductList";
import ProductDetail from "./product/ProductDetail";

const routes = (): RouteObject[] => [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <></> },
      { path: '/items', element: <ProductList /> },
      { path: '/items/:id', element: <ProductDetail /> },
      // { path: '/dashboard', element: <Dashboard /> }
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
