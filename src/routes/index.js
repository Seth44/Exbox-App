import App from "../containers/app";

const indexRoutes = [
  { path: "/", component: App },
  { path: "/:gamertag/dashboard", component: App },
  { path: "/:gamertag/clips", component: App },
  { path: "/:gamertag/screenshots", component: App }
];

export default indexRoutes;
