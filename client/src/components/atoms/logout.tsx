import { useMutation } from "@tanstack/react-query";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { fetchData } from "@/lib";
import useAuth from "@/hooks/useAuth";

const Logout = () => {
  const { token, setToken } = useAuth();

  const { mutate } = useMutation({
    mutationFn: () =>
      fetchData({
        endpoint: "signout",
        feature: "user",
        method: "GET",
        accessToken: token as string,
      }),
    onSuccess: () => {
      setToken(null);
      window.location.reload();
    },
  });

  return (
    <DropdownMenuItem className="text-red-500" onClick={() => mutate()}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
};

export default Logout;
