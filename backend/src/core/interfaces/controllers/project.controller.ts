import { error500 } from "@/constants";
import { AuthorizationDTO } from "@/core/application/dto";
import { ValidateError } from "@/core/application/errors";
import { ProjectService } from "@/core/application/services";
import { Request, Response, RequestHandler } from "express";

const ProjectController = {
  getUserProjects: (async (req: Request, res: Response) => {
    try {
      const { id } = (req.user as AuthorizationDTO).user;
      const projects = await ProjectService.getUserProjects(id);

      res.status(200).json({ message: "got user projects", data: projects });
    } catch (error) {
      if (error instanceof ValidateError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json(error500);
    }
  }) as RequestHandler,
  getProjectById: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await ProjectService.getProjectById(id);

      res.status(200).json({ message: "got project", data: project });
    } catch (error) {
      if (error instanceof ValidateError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json(error500);
    }
  }) as RequestHandler,

  createProject: (async (req: Request, res: Response) => {
    try {
      const { id } = (req.user as AuthorizationDTO).user;
      const project = await ProjectService.createProject(id, req.body);

      res.status(201).json({ message: "created project", data: project });
    } catch (error) {
      console.log(error);
      
      if (error instanceof ValidateError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json(error500);
    }
  }) as RequestHandler,

  updateProject: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await ProjectService.updateProject(id, req.body);

      res.status(200).json({ message: "updated project", data: project });
    } catch (error) {
      if (error instanceof ValidateError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json(error500);
    }
  }) as RequestHandler,

  deleteProject: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await ProjectService.deleteProject(id);

      res.status(200).json({ message: "deleted project" });
    } catch (error) {
      if (error instanceof ValidateError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json(error500);
    }
  }) as RequestHandler,
};

export default ProjectController;
