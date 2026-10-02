import {Router} from "express";
import {addSubmission,deleteSubmissionById, getSubmissionById, getSubmissionsByProject, updateStatus} from "../controllers/submissionController"


const router = Router();

router.post('/submissions',addSubmission)
router.get('/projects/:id/submissions', getSubmissionsByProject);
router.get('/submissions/:id', getSubmissionById);
router.patch('/submissions/:id/status', updateStatus);
router.delete('/submissions/:id', deleteSubmissionById);

export default router;