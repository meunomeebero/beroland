import { Elements } from "@prisma/client";
import { formatJSON } from "./format-json";

export function formatElements(elements: Elements[]) {
  return elements.map(({ order, type, data, id }) => ({
    id: order + 1, // +1 to avoid position 0
    dbId: id,
    type,
    ...formatJSON(data),
  }));
}
