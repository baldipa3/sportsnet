import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RelayEnvironmentProvider } from "react-relay";
import { Environment, Network, type FetchFunction } from "relay-runtime";

const HTTP_ENDPOINT = `${import.meta.env.VITE_API_URL}/graphql`;

const fetchGraphQL: FetchFunction = async (request, variables) => {
  const token = localStorage.getItem("authToken");

  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: request.text, variables }),
  });
  if (!resp.ok) {
    throw new Error("Response failed.");
  }
  return await resp.json();
};

const environment = new Environment({
  network: Network.create(fetchGraphQL),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="Loading...">
        <App />
      </Suspense>
    </RelayEnvironmentProvider>
  </StrictMode>
);
