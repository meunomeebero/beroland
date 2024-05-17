import { errorWrapper, NotFoundError, ConflictError } from "./_errors";
import { prismaClient } from "./_prisma";
import { Handler } from "./_types";

const handler: Handler = async (req, res) => {
  const { email, location } = req.body;

  const userAlreadyCreated = await prismaClient.leeds.findFirst({
    where: {
      email,
      location,
    }
  });

  if (userAlreadyCreated) {
    throw new ConflictError('lead already created');
  }

  await prismaClient.leeds.create({
    data: {
      email,
    }
  });

  return res.json({ message: 'user created' });
}

export default errorWrapper(handler);
