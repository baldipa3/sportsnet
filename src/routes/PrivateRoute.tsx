import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CurrentUserProvider } from "../utils/CurrentUserContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="text-white text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-400 mb-4">Unable to load user data</p>
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                window.location.href = "/";
              }}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              Return to Login
            </button>
          </div>
        </div>
      }
      onError={(error) => {
        console.error("Private Route Error:", error);
        // If it's an auth error, redirect to login
        if (
          error.message.includes("Unauthorized") ||
          error.message.includes("401") ||
          error.message.includes("unauthenticated")
        ) {
          localStorage.removeItem("authToken");
          window.location.href = "/";
        }
      }}
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="text-white text-xl">Loading...</div>
          </div>
        }
      >
        <CurrentUserProvider>{children}</CurrentUserProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default PrivateRoute;
