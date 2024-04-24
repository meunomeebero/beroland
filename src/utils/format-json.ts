export const formatJSON = <T>(data: T) => {
  return JSON.parse(JSON.stringify(data));
}
