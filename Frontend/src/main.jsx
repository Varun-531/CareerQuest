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
import AddJob from "./pages/AddJob.jsx";
import { CookiesProvider } from "react-cookie";
import AllInternships from "./pages/AllInternships.jsx";
import InternshipDetails from "./pages/InternshipDetails.jsx";
import AllJobs from "./pages/AllJobs.jsx";
import JobDetail from "./pages/JobDetail.jsx";
import Applications from "./pages/Applications.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AdminApplications from "./pages/AdminApplications.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
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
      {
        path: "/add-job",
        element: (
          <SignedIn>
            <AddJob />
          </SignedIn>
        ),
      },
      {
        path: "/internships",
        element: <AllInternships />,
      },
      {
        path: "/internships/:id",
        element: <InternshipDetails />,
      },
      {
        path: "/jobs",
        element: <AllJobs />,
      },
      {
        path: "/jobs/:id",
        element: <JobDetail />,
      },
      {
        path: "/applications",
        element: <Applications />,
      },
      {
        path: "/admin-applications",
        element: <AdminApplications />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </CookiesProvider>
    </ClerkProvider>
  </React.StrictMode>
);
