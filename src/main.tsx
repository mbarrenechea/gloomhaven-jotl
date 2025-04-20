import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";

import "./styles/index.css";
import "./styles/react-grid-layout.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
