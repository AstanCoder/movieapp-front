import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ChakraProvider>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          maxSnack={3}
        >
          <App />
        </SnackbarProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
