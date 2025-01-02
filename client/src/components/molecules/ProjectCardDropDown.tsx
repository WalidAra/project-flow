import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { fetchData } from "@/lib";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { LuPencilLine } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";

type Props = {
  projectId: string;
};

const ProjectEdit = ({ projectId }: Props) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: () =>
      fetchData({
        endpoint: `${projectId}/delete`,
        feature: "projects",
        method: "DELETE",
        accessToken: token as string,
      }),
    mutationKey: ["delete-project"],
    onSuccess: () => {
      navigate("/dashboard");
      window.location.reload();
    },
  });

  return (
    <div className="flex items-center text-muted-foreground">
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <LuPencilLine />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="destructive">Delete</Button>

            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <LuTrash />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                mutate();
              }}
            >
              Delete
            </Button>

            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectEdit;
