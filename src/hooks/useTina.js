import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";

export const useTinaContent = (query, variables) => {
  return useTina({
    query,
    variables,
    data: null,
  });
};

export const getStaticContent = async (query, variables) => {
  try {
    const result = await client.queries[query](variables);
    return result;
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
};

