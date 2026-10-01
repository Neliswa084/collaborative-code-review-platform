import {Router} from "express";
import {addProject, addProjectMember, getAllProjects, removeProjectMember} from "../controllers/projectController"
import {protect} from "../middleware/authMiddleware"


const router = Router();

router.use(protect) 

router.post('/projects',addProject)
router.get('/projects',getAllProjects)
router.post('/projects/:id/members', addProjectMember)
router.delete("/:id/members/:userId", protect, removeProjectMember);

export default router;