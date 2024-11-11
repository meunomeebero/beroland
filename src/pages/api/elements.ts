import { Elements } from "@prisma/client";
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

export type CreateElementParams = Omit<Elements, 'id' | 'createdAt' | 'pageId'> & { pageSlug: string };

async function createElement({ pageSlug, ...element }: CreateElementParams) {
  const page = await prismaClient.pages.findFirst({
    where: {
      slug: pageSlug,
    },
  });

  if (!page) {
    throw new Error('Page not found');
  }

  const created = await prismaClient.elements.create({
    data: {
      ...element,
      pageId: page.id,
    }
  });

  return created;
}

async function deleteElement(id: number) {
  await prismaClient.elements.delete({
    where: {
      id,
    }
  });
}

const handler: Handler = async (req, res) => {
  if (req.method === 'PUT') {
    const {
      elements,
    } = req.body;

    await updateElements(elements);

    return res.json({ ok: true });
  }

  if (req.method === 'POST') {
    const {
      pageSlug,
      ...element
    } = req.body;

    const created = await createElement({ pageSlug, ...element });

    return res.json(created);
  }

  if (req.method === 'DELETE') {
    const {
      id,
    } = req.body;

    await deleteElement(id);

    return res.json({ ok: true });
  }
}

export default errorWrapper(handler);
