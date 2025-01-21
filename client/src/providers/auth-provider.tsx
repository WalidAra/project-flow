/* eslint-disable react-refresh/only-export-components */
import LoadingSurface from "@/components/atoms/loading";
import { fetchData } from "@/lib";
import { AccessToken } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isAuthenticated: boolean;
};

export const Auth = React.createContext<Props>({
  token: null,
  setToken: () => {},
  isAuthenticated: false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [paramToken, setParamToken] = React.useState<string | null>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchToken = urlParams.get("token");

    if (searchToken) {
      const url = new URL(window.location.toString());
      url.searchParams.delete("token");
      window.history.replaceState({}, document.title, url.pathname);
    }
    console.log("Initial paramToken:", searchToken);
    return searchToken;
  });

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["refresh"],
    queryFn: () => {
      return fetchData<AccessToken>({
        endpoint: "refresh",
        feature: "auth",
        method: "GET",
      });
    },
    enabled: paramToken ? false : true,
    retry: false,
  });

  console.log("useQuery data:", data);
  console.log("useQuery isError:", isError);
  console.log("useQuery isLoading:", isLoading);
  console.log("useQuery error:", error);

  if (isLoading) {
    return <LoadingSurface className="w-full h-screen" />;
  }

  const testToken =
    paramToken || (data && !isError ? data.data.accessToken : null);
  
  console.log("AuthProvider testToken:", testToken);

  return (
    <Auth.Provider
      value={{
        token: paramToken || (data && !isError ? data.data.accessToken : null),
        setToken: setParamToken,
        isAuthenticated: !!paramToken || (data && !isError) ? true : false,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export default AuthProvider;
