import pages from "./pages"

const routes = [{
    exact: true,
    path: "/route/:routeTag",
    name: "route",
    component: pages.Route
}, {
    exact: true,
    path: "/",
    name: "index",
    component: pages.Index
}]

export default routes;