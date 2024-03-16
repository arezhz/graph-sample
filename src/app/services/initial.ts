import { IResponseBody } from "../models/i-response-body";

export const graphContainerName = "graph_container";
export const graphMapContainerName = "graph_map_container";

export async function getInitData(
  id?: string
): Promise<IResponseBody | IResponseBody[]> {
  // const response = await fetch("../public/fiu_json.json");
  const response = await fetch("../public/Test.json");
  const data: IResponseBody[] = await response.json();
  return data
  if (!id) {
    return data.find((f) => f.p.start.identity === 0)!;
  } else {
    return data.filter((f) => f.p.start.elementId === id);
  }
}
