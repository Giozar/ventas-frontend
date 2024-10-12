import type { RouteObject } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import { UserProvider } from "../contexts/UserContext";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import SalePage from "../pages/SalePage";
import InventoryPage from "../pages/InventoryPage";

// Definición de las rutas
const routes: RouteObject[] = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/inventory",
      element: (
        <UserProvider>
         <InventoryPage />
        </UserProvider>
      ),
   },
    {
       path: "/login",
       element: (
         <UserProvider>
          <LoginPage />
         </UserProvider>
       ),
    },
    {
      path: "/dashboard",
      element: (
        <UserProvider>
         <DashboardPage />
        </UserProvider>
      ),
   },
   {
    path: "/sale",
    element: (
      <UserProvider>
       <SalePage />
      </UserProvider>
    ),
 },
    { path: "*", element: <NotFoundPage /> },
  ];
  

export default routes;
