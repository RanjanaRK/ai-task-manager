// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import { AuthProvider } from "./components/auth/AuthContext.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>

  <BrowserRouter>
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,

  // </StrictMode>,
);
