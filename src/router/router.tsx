import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <div>Home</div> },
      {
        path: "/new",
        element: <div>New Page</div>,
      },
      { path: "*", element: <div>Not Found</div> },
    ],
  },
]);
