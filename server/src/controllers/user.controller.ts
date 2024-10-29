import { User } from "../models/user.model";
import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import { getError, handleObjectNotFound } from "../utils/error.utils";
import {
  paginationNoPopulateSchema,
  productIdParamSchema,
  userIdParamSchema,
  usernameParamSchema,
} from "../validation-schemas/query.validation";
import { userInputSchema } from "../validation-schemas/user.validation";

class UserController {
  public async updateUser(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      userInputSchema.parse(req.body);
      const userUpdated = await User.findByIdAndUpdate(authUserId, req.body, {
        new: true,
      });

      if (!userUpdated) {
        return handleObjectNotFound(res, "User");
      }
      return res.status(200).json(userUpdated);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async getUserById(req: Request, res: Response) {
    const { userId } = userIdParamSchema.parse(req.params); // Extract user ID from route parameters

    try {
      const user = await User.findById(userId).select(
        "-cart -savedProducts -wishlist",
      );
      if (!user) {
        return handleObjectNotFound(res, "User");
      }
      return res.status(200).json(user);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async getUsersWithPagination(req: Request, res: Response) {
    try {
      const { limit, page, sort } = paginationNoPopulateSchema.parse(req.query);

      const users = await User.paginate({}, { limit, page, sort });
      const { docs } = users;
      if (docs.length <= 0) {
        return handleObjectNotFound(res, "User", true);
      }
      return res.status(200).json(users);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async getUserByUsername(req: Request, res: Response) {
    const { username } = usernameParamSchema.parse(req.params); // Extract username from route parameters
    try {
      const user = await User.findOne({ username: username }); // Find user by username
      if (!user) {
        return handleObjectNotFound(res, "User");
      }
      return res.status(200).json(user);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { userId } = userIdParamSchema.parse(req.params); // Extract user ID from route parameters
      const userDeleted = await User.findByIdAndDelete(userId);
      if (!userDeleted) {
        return handleObjectNotFound(res, "User");
      }

      return res.status(204).send();
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async getUserCart(req: Request, res: Response) {
    try {
      const { userId } = userIdParamSchema.parse(req.params);
      const user = await User.findById(userId).select("cart").populate("cart");
      if (!user) {
        return handleObjectNotFound(res, "User");
      }
      return res.status(200).json(user);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async getUseSavedProducts(req: Request, res: Response) {
    try {
      const { userId } = userIdParamSchema.parse(req.params);
      const user = await User.findById(userId).select("produtsSaved");
      if (!user) {
        return handleObjectNotFound(res, "User");
      }
      return res.status(200).json(user);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async getUseWishlist(req: Request, res: Response) {
    try {
      const { userId } = userIdParamSchema.parse(req.params);
      const user = await User.findById(userId)
        .select("wishlist")
        .populate("wishlist");
      if (!user) {
        return handleObjectNotFound(res, "User");
      }
      return res.status(200).json(user);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async addProductToCart(req: Request, res: Response) {
    const { userId } = userIdParamSchema.parse(req.params);
    const { productId } = productIdParamSchema.parse(req.params);
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleObjectNotFound(res, "User");
      }

      user.cart.push(productId);
      await user.save();

      return res.status(200).json(user);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async removeProductFromCart(req: Request, res: Response) {
    const { userId } = userIdParamSchema.parse(req.params);
    const { productId } = productIdParamSchema.parse(req.params);
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleObjectNotFound(res, "User");
      }

      user.cart.pull(productId);
      await user.save();

      return res.status(204);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async addProductToWishlist(req: Request, res: Response) {
    const { userId } = userIdParamSchema.parse(req.params);
    const { productId } = productIdParamSchema.parse(req.params);
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleObjectNotFound(res, "User");
      }

      user.whishlist.push(productId);
      await user.save();

      return res.status(200).json(user);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async removeProductFromWishlist(req: Request, res: Response) {
    const { userId } = userIdParamSchema.parse(req.params);
    const { productId } = productIdParamSchema.parse(req.params);
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleObjectNotFound(res, "User");
      }

      user.whishlist.pull(productId);
      await user.save();

      return res.status(204);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async addProductToSavedProducts(req: Request, res: Response) {
    const { userId } = userIdParamSchema.parse(req.params);
    const { productId } = productIdParamSchema.parse(req.params);
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleObjectNotFound(res, "User");
      }

      user.savedProducts.push(productId);
      await user.save();

      return res.status(200).json(user);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async removeProductFromSavedProducts(req: Request, res: Response) {
    const { userId } = userIdParamSchema.parse(req.params);
    const { productId } = productIdParamSchema.parse(req.params);
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleObjectNotFound(res, "User");
      }

      user.savedProducts.pull(productId);
      await user.save();

      return res.status(204);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }
}

export default new UserController();
