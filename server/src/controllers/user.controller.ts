import { User } from "../models/user.model";
import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import { handleError, handleObjectNotFound } from "../utils/error.utils";

class UserController {
  public async updateUser(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const userUpdated = await User.findByIdAndUpdate(authUserId, req.body, {
        new: true,
      });
      if (!userUpdated) {
        return handleObjectNotFound(res, "User");
      }
      return res.status(200).json(userUpdated);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId).select("-addressDirections");
      if (!user) {
        return handleObjectNotFound(res, "User");
      }
      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getUsersWithPagination(req: Request, res: Response) {
    try {
      const users = await User.paginate(
        {},
        { ...req.query, select: ["-addressDirections"] },
        // { limit, page, sort, select: ["-addressDirections"] },
      );
      const { docs } = users;
      if (docs.length <= 0) {
        return handleObjectNotFound(res, "User", true);
      }
      return res.status(200).json(users);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getUserByUsername(req: Request, res: Response) {
    const { username } = req.params;
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return handleObjectNotFound(res, "User");
      }
      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const userDeleted = await User.findByIdAndDelete(userId);
      if (!userDeleted) {
        return handleObjectNotFound(res, "User");
      }

      return res.status(204).send();
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getUserCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId).select("cart").populate("cart");
      if (!user) {
        return handleObjectNotFound(res, "User");
      }
      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getUseSavedProducts(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId).select("savedProducts");
      if (!user) {
        return handleObjectNotFound(res, "User");
      }
      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getUseWishlist(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId)
        .select("wishlist")
        .populate("wishlist");
      if (!user) {
        return handleObjectNotFound(res, "User");
      }
      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async addProductToCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const { productId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return handleObjectNotFound(res, "User");
      }

      user.cart.push(productId);
      await user.save();

      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async removeProductFromCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const { productId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return handleObjectNotFound(res, "User");
      }

      user.cart.pull(productId);
      await user.save();

      return res.status(204);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async addProductToWishlist(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const { productId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return handleObjectNotFound(res, "User");
      }

      user.whishlist.push(productId);
      await user.save();

      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async removeProductFromWishlist(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const { productId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return handleObjectNotFound(res, "User");
      }

      user.whishlist.pull(productId);
      await user.save();

      return res.status(204);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async addProductToSavedProducts(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { productId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return handleObjectNotFound(res, "User");
      }

      user.savedProducts.push(productId);
      await user.save();

      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async removeProductFromSavedProducts(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const { productId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return handleObjectNotFound(res, "User");
      }

      user.savedProducts.pull(productId);
      await user.save();

      return res.status(204);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new UserController();
