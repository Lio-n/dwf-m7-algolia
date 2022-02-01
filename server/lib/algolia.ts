import algoliasearch from "algoliasearch";

const client = algoliasearch("4KTHPQCCNZ", process.env.ALGOLIA_ADMIN_KEY);
export const shops_index = client.initIndex("shops");
