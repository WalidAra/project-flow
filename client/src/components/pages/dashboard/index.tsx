import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProjectCard from "@/components/organims/ProjectCard";
import SearchInput from "@/components/atoms/SearchInput";
import { LuSettings2 } from "react-icons/lu";
import { ProjectFormDialog } from "@/components/organims/CreateProjectForm";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib";
import useAuth from "@/hooks/useAuth";
import LoadingSurface from "@/components/atoms/loading";
import { Project } from "@/types";
import { useMemo, useState } from "react";

const Dashboard = () => {
  const [filterValue, setFilterValue] = useState<string>("");
  const { token } = useAuth();

  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: () =>
      fetchData<Project[]>({
        endpoint: "all",
        feature: "projects",
        method: "GET",
        accessToken: token as string,
      }),
    retry: false,
  });

  const list = useMemo(() => {
    if (filterValue === "") return data?.data;
    return data?.data.filter((p) =>
      p.title.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
    );
  }, [data?.data, filterValue]);

  return (
    <Card className="flex-1 shadow-none ">
      <CardHeader>
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>Here's a list of your projects!</CardDescription>

        <div className="flex items-center pt-4 justify-between w-full">
          <div className="flex items-center gap-3">
            <SearchInput
              filterValue={filterValue}
              setFilterValue={setFilterValue}
            />
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant={"outline"}
              size={"sm"}
              className="flex items-center gap-2"
            >
              <LuSettings2 />
              <span>View</span>
            </Button>

            <ProjectFormDialog refetch={refetch} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        {isLoading && <LoadingSurface className="size-96" />}
        {!isLoading && isError && <div>Something went wrong</div>}
        {!isLoading &&
          !isError &&
          list?.map((p) => (
            <ProjectCard project={p} key={p.id} />
          ))}
      </CardContent>
    </Card>
  );
};

export default Dashboard;
