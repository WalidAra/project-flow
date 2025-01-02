import { Auth } from "@/providers";
import { useContext } from "react";

const useAuth = () => {
  return useContext(Auth);
};

export default useAuth;
