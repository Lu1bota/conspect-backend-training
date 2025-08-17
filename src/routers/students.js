import { Router } from 'express';
import {
  createStudentController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';

const studentsRouter = Router();

studentsRouter.get('/', ctrlWrapper(getStudentsController));

studentsRouter.get(
  '/:studentId',
  isValidId,
  ctrlWrapper(getStudentByIdController),
);
studentsRouter.post(
  '/',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);
studentsRouter.delete(
  '/:studentId',
  isValidId,
  ctrlWrapper(deleteStudentController),
);
studentsRouter.put(
  '/:studentId',
  isValidId,
  ctrlWrapper(upsertStudentController),
);
studentsRouter.patch(
  '/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default studentsRouter;
