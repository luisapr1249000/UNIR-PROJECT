import { Router } from "express";
import addressDirectionController from "../controllers/addressDirection.controller";
import authMiddleware from "../middlewares/authMiddleware";
import { checkValiObjectdId } from "../middlewares/checkObjectId";
import { checkUserOrAdmin } from "../middlewares/checkUserOrAdmin";

const router = Router();

router.post(
  "/users/address-direction",
  authMiddleware,
  addressDirectionController.createAddressDirection,
);
router.put(
  "/users/address-direction/:addressDirectionId",
  authMiddleware,
  checkUserOrAdmin,
  addressDirectionController.updateAddressDirection,
);
router.delete(
  "/users/address-direction/:addressDirectionId",
  authMiddleware,
  checkUserOrAdmin,
  addressDirectionController.deleteAddressDirection,
);

// router.get(
//   "/users/:userId/address-directions",
//   checkValiObjectdId,
//   addressDirectionController.getUserAddressDirections,
// );
// router.get(
//   "/users/address-directions/:addressDirectionId",
//   checkValiObjectdId,
//   addressDirectionController.getAddressDirectionById,
// );

export { router as AddressDirectionRoutes };
