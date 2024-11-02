import { faker } from "@faker-js/faker/.";
import { Comment } from "../models/comment.model";

export const createCommentFixture = async (
  userId: string,
  productId: string,
) => {
  const comment = new Comment({
    content: faker.lorem.paragraph(),
    product: productId,
    author: userId,
    images: [
      {
        originalName: faker.system.fileName(),
        url: faker.image.url(),
        contentType: "image/jpeg",
        size: `${faker.number.float({ min: 100, max: 2000 })} KB`,
      },
    ],
    review: faker.number.int({ min: 1, max: 5 }),
  });

  await comment.save();
  console.log("Comment fixture created:", comment);

  return comment;
};
