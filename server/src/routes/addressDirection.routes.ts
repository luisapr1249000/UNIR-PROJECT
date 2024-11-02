import { Router } from "express";
import addressDirectionController from "../controllers/addressDirection.controller";
import authMiddleware from "../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
} from "../middlewares/requestValidation.middleware";
import { addressDirectionInputSchema } from "../validation-schemas/user.validation";

const router = Router();

router.post(
  "/users/address-direction",
  authMiddleware,
  validateSchemaBody(addressDirectionInputSchema),
  addressDirectionController.createAddressDirection,
);
router.put(
  "/users/address-direction/:addressDirectionId",
  authMiddleware,
  validateObjectIdParams(["addressDirectionId"]),
  validateSchemaBody(addressDirectionInputSchema),
  addressDirectionController.updateAddressDirection,
);
router.delete(
  "/users/address-direction/:addressDirectionId",
  authMiddleware,
  validateObjectIdParams(["addressDirectionId"]),
  addressDirectionController.deleteAddressDirection,
);

export { router as AddressDirectionRoutes };
