
// core components/views
import DashboardPage from "../views/Dashboard/Dashboard";
import ScreenshotsPage from "../views/Screenshots/Screenshots";


const routes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    component: DashboardPage
  },
  {
    path: "/screenshots",
    sidebarName: "Screenshots",
    component: ScreenshotsPage
  },
  { redirect: true, to: "/dashboard", navbarName: "Redirect" }
];

export default routes;
