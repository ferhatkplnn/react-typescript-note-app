import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { NewNote } from "../pages/NewNote";
import NoteList from "../pages/NoteList";
import NoteDetail from "../pages/NoteDetail";
import EditNote from "../pages/EditNote";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <NoteList /> },
      {
        path: "/new",
        element: <NewNote />,
      },
      { path: "/detail/:id", element: <NoteDetail /> },
      { path: "/detail/:id/edit", element: <EditNote /> },

      { path: "*", element: <h1>Not Found</h1> },
    ],
  },
]);
