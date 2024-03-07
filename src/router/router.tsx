import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { NewNote } from "../pages/NewNote";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <div>Home</div> },
      {
        path: "/new",
        element: <NewNote />,
      },
      { path: "/detail/:id", element: <div>Post Details</div> },
      { path: "/detail/:id/edit", element: <div>Post edit</div> },

      { path: "*", element: <h1>Not Found</h1> },
    ],
  },
]);
