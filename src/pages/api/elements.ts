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

async function deleteElements(id: number[]) {
  await prismaClient.elements.deleteMany({
    where: {
      id: {
        in: id,
      }
    }
  });
}

async function updateElement(id: number, data: any) {
  const updated = await prismaClient.elements.update({
    where: { id },
    data: {
      data
    }
  });
  return updated;
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
    } = req.query;

    await deleteElements([Number(id)]);

    return res.json({ ok: true });
  }

  if (req.method === 'PATCH') {
    const { id, data } = req.body;
    const updated = await updateElement(Number(id), data);
    return res.json(updated);
  }
}

export default errorWrapper(handler);
