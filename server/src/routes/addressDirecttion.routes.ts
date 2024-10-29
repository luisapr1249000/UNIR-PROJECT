import { Router } from "express";
import addressDirectionController from "../controllers/addressDirection.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/users/address-direction",
  authMiddleware,
  addressDirectionController.createAddressDirection,
);
router.put(
  "/users/address-direction/:addressDirectionId",
  authMiddleware,
  addressDirectionController.updateAddressDirection,
);
router.delete(
  "/users/address-direction/:addressDirectionId",
  authMiddleware,
  addressDirectionController.deleteAddressDirection,
);

router.get(
  "/users/:userId/address-directions",
  addressDirectionController.getUserAddressDirections,
);
router.get(
  "/users/address-directions/:addressDirectionId",
  addressDirectionController.getAddressDirectionById,
);

export { router as AddressDirectionRoutes };
