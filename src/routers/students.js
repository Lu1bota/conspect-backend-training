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
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const studentsRouter = Router();

studentsRouter.use(authenticate);

studentsRouter.get(
  '/',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(getStudentsController),
);

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
