import React from 'react';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import MovieIcon from '@material-ui/icons/Movie';
import PersonIcon from '@material-ui/icons/Person';

// core components/views
import DashboardPage from "../views/Dashboard/Dashboard";
import ClipsPage from "../views/Clips/Clips";
import ScreenshotsPage from "../views/Screenshots/Screenshots";

const routes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    component: DashboardPage,
    icon: <PersonIcon />,
  },
  {
    path: "/clips",
    sidebarName: "Clips",
    component: ClipsPage,
    icon: <MovieIcon />
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
