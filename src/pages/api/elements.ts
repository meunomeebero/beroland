import { errorWrapper } from "./_errors";
import { prismaClient } from "./_prisma";
import { Handler } from "./_types";

async function updateElements(elements: Array<{ id: number, order: number }>) {
    await prismaClient.$transaction(
        elements.map(client => {
            return prismaClient.elements.update({
                data: {
                    order: client.order,
                },
                where: {
                    id: client.id,
                }
            });
        }),
    );
}

const handler: Handler = async (req, res) => {
  const {
    elements,
  } = req.body;

  await updateElements(elements);

  return res.json({ ok: true });
}

export default errorWrapper(handler);
