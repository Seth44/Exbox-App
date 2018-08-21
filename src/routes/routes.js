import React from 'react';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import MovieIcon from '@material-ui/icons/Movie';
import PersonIcon from '@material-ui/icons/Person';

// core components/views
import InitialPage from "../views/Initial/Initial";
import DashboardPage from "../views/Dashboard/Dashboard";
import ClipsPage from "../views/Clips/Clips";
import ScreenshotsPage from "../views/Screenshots/Screenshots";

const routes = [
  {
    path: "/",
    component: InitialPage,
  },
  {
    path: "/:gamertag/dashboard",
    sidebarName: "Dashboard",
    component: DashboardPage,
    icon: <PersonIcon />,
  },
  {
    path: "/:gamertag/clips",
    sidebarName: "Clips",
    component: ClipsPage,
    icon: <MovieIcon />
  },
  {
    path: "/:gamertag/screenshots",
    sidebarName: "Screenshots",
    component: ScreenshotsPage,
    icon: <PhotoLibraryIcon />
  },
  { redirect: true, to: "/", navbarName: "Redirect" }
];

export default routes;
