import { Router } from "express";
import { addComment, getComments, updateCommentById, deleteCommentById } from "../controllers/commentController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.post('/submissions/:id/comments', addComment);
router.get('/submissions/:id/comments', getComments);
router.put('/comments/:id', updateCommentById);
router.delete('/comments/:id', deleteCommentById);

export default router;