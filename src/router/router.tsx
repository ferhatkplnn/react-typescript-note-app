import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { NewNote } from "../pages/NewNote";
import NoteList from "../pages/NoteList";
import NoteDetail from "../pages/NoteDetail";

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
      { path: "/detail/:id/edit", element: <div>Post edit</div> },

      { path: "*", element: <h1>Not Found</h1> },
    ],
  },
]);
