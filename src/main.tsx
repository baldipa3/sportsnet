import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { RelayEnvironmentProvider } from "react-relay";
import {
  Environment,
  Network,
  RecordSource,
  Store,
  type FetchFunction,
} from "relay-runtime";

const HTTP_ENDPOINT = `${import.meta.env.VITE_API_URL}/graphql`;

// Helper to check if a value is a File
function isFile(value: any): value is File {
  return (
    (typeof File !== "undefined" && value instanceof File) ||
    (typeof Blob !== "undefined" && value instanceof Blob)
  );
}

// Check if variables contain any files
function hasFiles(variables: any): boolean {
  if (isFile(variables)) return true;

  if (Array.isArray(variables)) {
    return variables.some(hasFiles);
  }

  if (variables && typeof variables === "object") {
    return Object.values(variables).some(hasFiles);
  }

  return false;
}

function buildMultipartRequest(
  query: string | null | undefined,
  variables: any
): FormData {
  const formData = new FormData();
  const fileMap: Record<string, File> = {};
  let fileCounter = 0;

  // Extract files and replace with string keys
  function extractFiles(obj: any, path: string[] = []): any {
    if (isFile(obj)) {
      const key = `file_${fileCounter++}`;
      fileMap[key] = obj;
      return key;
    }

    if (Array.isArray(obj)) {
      return obj.map((item, i) => extractFiles(item, [...path, i.toString()]));
    }

    if (obj && typeof obj === "object") {
      const result: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          result[key] = extractFiles(obj[key], [...path, key]);
        }
      }
      return result;
    }

    return obj;
  }

  const cleanedVariables = extractFiles(variables);

  // Add query and variables as Absinthe expects
  if (query) {
    formData.append("query", query);
  }
  formData.append("variables", JSON.stringify(cleanedVariables));

  // Add files with their keys
  for (const [key, file] of Object.entries(fileMap)) {
    formData.append(key, file);
  }

  return formData;
}

const fetchGraphQL: FetchFunction = async (request, variables) => {
  const token = localStorage.getItem("authToken");

  if (hasFiles(variables)) {
    const formData = buildMultipartRequest(request.text, variables);

    console.log("Uploading with multipart/form-data");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name})`);
      } else {
        console.log(`  ${key}:`, value);
      }
    }

    const resp = await fetch(HTTP_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Do NOT set Content-Type - browser will set it with boundary
      },
      body: formData,
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error("Upload failed:", resp.status, errorText);
      throw new Error(
        `Response failed with status ${resp.status}: ${errorText}`
      );
    }

    return await resp.json();
  }

  // Regular query/mutation without files
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
  store: new Store(new RecordSource()),
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
