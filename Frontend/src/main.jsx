import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard.jsx";
import { SignedIn } from "@clerk/clerk-react";
import { Toaster } from "@/components/ui/sonner";
import AddInternship from "./pages/AddInternship.jsx";
import { ThemeProvider } from "./components/ThemeProvider.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/add-Internship",
        element: (
          <SignedIn>
            <AddInternship />
          </SignedIn>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
