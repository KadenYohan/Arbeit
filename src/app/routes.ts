import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { HomePage } from "./components/HomePage";
import { JobListPage } from "./components/JobListPage";
import { JobDetailPage } from "./components/JobDetailPage";
import { SavedPage } from "./components/SavedPage";
import { NotFoundPage } from "./components/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "jobs", Component: JobListPage },
      { path: "jobs/:id", Component: JobDetailPage },
      { path: "saved", Component: SavedPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
