import { Router } from "express";
import { approveSubmission, requestChanges, getReviewHistory } from "../controllers/reviewController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.post('/submissions/:id/approve', approveSubmission);
router.post('/submissions/:id/request-changes', requestChanges);
router.get('/submissions/:id/reviews', getReviewHistory);

export default router;