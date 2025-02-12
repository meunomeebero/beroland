import { Elements } from "@prisma/client";
import { formatJSON } from "./format-json";

export function formatElements(elements: Elements[]) {
  return elements.map(({ order, type, data, id }) => ({
    id: order, // Use order for drag and drop positioning
    dbId: id,  // Keep database ID for updates
    type,
    order,
    ...formatJSON(data),
  }));
}
