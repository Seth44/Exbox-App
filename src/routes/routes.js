import React from 'react';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import MovieIcon from '@material-ui/icons/Movie';

// core components/views
import DashboardPage from "../views/Dashboard/Dashboard";
import ScreenshotsPage from "../views/Screenshots/Screenshots";


const routes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    component: DashboardPage,
    icon: <MovieIcon />,
  },
  {
    path: "/screenshots",
    sidebarName: "Screenshots",
    component: ScreenshotsPage,
    icon: <PhotoLibraryIcon />
  },
  { redirect: true, to: "/dashboard", navbarName: "Redirect" }
];

export default routes;
