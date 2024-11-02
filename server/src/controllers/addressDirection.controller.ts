import { Request, Response } from "express";
import { handleError, handleObjectNotFound } from "../utils/error.utils";
import { extractAuthUserId } from "../utils/auth.utils";
import { User } from "../models/user.model";

class AddressDirectionController {
  public async createAddressDirection(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const user = await User.findById(authUserId);
      if (!user) {
        return handleObjectNotFound(res, "User");
      }
      user.addressDirections.push(req.body);

      await user.save();
      return res.status(201).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }
  public async updateAddressDirection(req: Request, res: Response) {
    try {
      const { addressDirectionId } = req.params;
      const authUserId = extractAuthUserId(req);

      const addressDirectionUpdated = await User.findOneAndUpdate(
        { _id: authUserId, "addressDirections._id": addressDirectionId },
        { $set: { "addressDirection.$": req.body } },
        { new: true },
      );
      if (!addressDirectionUpdated) {
        return handleObjectNotFound(res, "Address");
      }

      return res.status(200).json(addressDirectionUpdated);
    } catch (e) {
      return handleError(res, e);
    }
  }
  public async deleteAddressDirection(req: Request, res: Response) {
    try {
      const { addressDirectionId } = req.params;
      const authUserId = extractAuthUserId(req);

      const user = await User.findById(authUserId);
      if (!user) {
        return handleObjectNotFound(res, "Address");
      }

      user.addressDirections.id(addressDirectionId)?.deleteOne();
      await user.save();
      return res.status(204).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  // public async getUserAddressDirections(req: Request, res: Response) {
  //   try {
  //     const { userId } = userIdParamSchema.parse(req.params);
  //     const { addressDirectionId } = addressDirectionIdParamSchema.parse(
  //       req.params,
  //     );

  //     const options = {
  //       ...req.query,
  //       populate: ["user"],
  //     };

  //     const query = {
  //       _id: addressDirectionId,
  //       user: userId,
  //     };

  //     const address = await AddressDirection.paginate(query, options);
  //     const { docs } = address;
  //     if (docs.length <= 0) {
  //       return handleObjectNotFound(res, "Address", true);
  //     }

  //     return res.status(200).json(address);
  //   } catch (e) {
  //     const { status, error } = getError(e);
  //     return res.status(status).json(error);
  //   }
  // }

  // public async getAddressDirectionById(req: Request, res: Response) {
  //   try {
  //     const { addressDirectionId } = addressDirectionIdParamSchema.parse(
  //       req.params,
  //     );
  //     const address =
  //       await AddressDirection.findById(addressDirectionId).populate("user");
  //     if (!address) {
  //       return handleObjectNotFound(res, "Address");
  //     }

  //     return res.status(200).json(address);
  //   } catch (e) {
  //     const { status, error } = getError(e);
  //     return res.status(status).json(error);
  //   }
  // }
}

export default new AddressDirectionController();
