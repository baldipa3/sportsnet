import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CurrentUserProvider } from "@/utils/CurrentUserContext";
import { GiWhistle } from "react-icons/gi";

const isDevelopment = import.meta.env.DEV;

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  const handleReturnToLogin = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  // In development, show detailed error info
  if (isDevelopment) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="text-white max-w-2xl w-full">
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4 text-red-400">
              Development Error
            </h1>
            <div className="mb-4">
              <p className="text-lg font-semibold mb-2">{error.message}</p>
              <pre className="bg-black/50 p-4 rounded overflow-auto text-sm text-gray-300 whitespace-pre-wrap">
                {error.stack}
              </pre>
            </div>
            <div className="flex gap-3">
              <button
                onClick={resetErrorBoundary}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // In production, show user-friendly message
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-white text-center max-w-md">
        <div className="mb-6">
          <GiWhistle className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">You've been logged out</h1>
          <p className="text-gray-400 mb-6">
            Your session has expired. Please log in again to continue.
          </p>
        </div>
        <button
          onClick={handleReturnToLogin}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        console.error("Private Route Error:", error);
        // Only clean up on error in production
        if (!isDevelopment) {
          localStorage.removeItem("authToken");
        }
      }}
      onReset={() => {
        // Optional: Add any cleanup needed when resetting
        console.log("Error boundary reset");
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

export { PrivateRoute };
