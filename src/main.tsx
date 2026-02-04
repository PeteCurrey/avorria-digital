import React from "react";
import ReactDOM from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary";
import App from "./App.tsx";
import "./index.css";

// DEV diagnostic: confirm single React instance
if (import.meta.env.DEV) {
  const marker = Symbol.for("react.singleton.check");
  if ((window as any)[marker]) {
    console.error("⚠️ Multiple React instances detected!");
  } else {
    (window as any)[marker] = true;
    console.log("✅ React version:", React.version);
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
