import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.tsx";
import AuthProvider from "./providers/auth-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "./providers/theme-provider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <AuthProvider>
            <App />
            <Toaster />
          </AuthProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
