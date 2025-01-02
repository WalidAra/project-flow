import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";
import { Link } from "react-router-dom";

function formatISODate(isoDate: string) {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

type Props = {
  project: Project;
};

const ProjectCard = ({ project, }: Props) => {
  const { createdAt, description, status, team, title, id } = project;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as Element).closest(".dropdown-container")) {
      e.preventDefault();
    }
  };

  return (
    <Card className="w-80 shadow-none hover:shadow-sm duration-300 ease-in">
      <Link to={`/dashboard/${id}`} onClick={handleCardClick}>
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <div
              className="dropdown-container"
              onClick={(e) => e.stopPropagation()}
            >
            </div>
          </div>
          <CardDescription className="line-clamp-3" >{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Badge className="rounded-full" variant="outline">
              {status.split("_").join(" ").toLowerCase()}
            </Badge>
            <p className="text-muted-foreground text-sm">
              <span className="capitalize">{team.toLowerCase()}</span> team
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-xs text-muted-foreground">
            Due: {formatISODate(createdAt)}
          </p>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProjectCard;
