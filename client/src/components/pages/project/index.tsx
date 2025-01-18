import LoadingSurface from "@/components/atoms/loading";
import ProjectEdit from "@/components/molecules/ProjectCardDropDown";
import ProjectWidgets from "@/components/molecules/ProjectWidgets";
import { GantChart } from "@/components/organims/GantChart";
import { PertChart } from "@/components/organims/PertChart";
import { PertTable } from "@/components/organims/PertTable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { fetchData } from "@/lib";
import { Project as ProjectType, Task, Widget } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Project = () => {
  const { token } = useAuth();
  const { projectId } = useParams();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () =>
      fetchData<ProjectType>({
        endpoint: `${projectId}`,
        feature: "projects",
        method: "GET",
        accessToken: token as string,
      }),
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <LoadingSurface />
      </div>
    );
  }

  const project = data?.data as ProjectType & {
    widgets: Widget;
    tasks: Task[];
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <h2 className="text-lg md:text-2xl font-bold tracking-tight">
            {project.title}
          </h2>
          <div className="flex items-center gap-1">
            <Badge className="rounded-full " variant={"outline"}>
              {project.status.split("_").join(" ").toLowerCase()}
            </Badge>
            <Badge className="rounded-full" variant={"destructive"}>
              <span className="mr-1 capitalize">
                {" "}
                {project.team.toLocaleLowerCase()}{" "}
              </span>{" "}
              team
            </Badge>
            <ProjectEdit projectId={project.id} />
          </div>
        </div>
        <p className="text-muted-foreground md:max-w-[60%] line-clamp-2">
          {project.description}
        </p>
      </div>

      <ProjectWidgets widget={project.widgets} />

      <div className="grid gap-4 grid-cols-1 sm:flex sm:flex-col-reverse xl:grid xl:grid-cols-[3fr,2fr] 2xl:grid-cols-[3fr,1fr]">
        <div className="">
          <Card className="shadow-none">
            <CardContent>
              <PertTable
                projectId={project.id}
                refetch={refetch}
                tasks={project.tasks}
              />
            </CardContent>
          </Card>
        </div>
        <div className="gap-4 grid sm:grid-cols-2 xl:grid-cols-1">
          <GantChart path={project.criticalPath} />
          <PertChart path={project.criticalPath} />
        </div>
      </div>
    </div>
  );
};

export default Project;
