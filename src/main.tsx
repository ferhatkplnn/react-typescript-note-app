import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";
import { NoteProvider } from "./context/NoteContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NoteProvider>
      <RouterProvider router={router} />
    </NoteProvider>
  </React.StrictMode>
);
