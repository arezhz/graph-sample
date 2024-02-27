export const containerName = "graph_container"

export async function getInitData() {
  const data = await fetch("../public/fiu_json.json");
  return await data.json();
}
