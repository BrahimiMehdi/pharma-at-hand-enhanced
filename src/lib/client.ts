import { GraphQLClient } from "graphql-request";
const apiEndpoint = process.env.API_ENDPOINT;
const apiSecret = process.env.API_SECRET;
if(! apiEndpoint || !apiSecret) throw new Error("Something went wrong")

const client = new GraphQLClient(apiEndpoint, {
    headers: {
      Authorization: `Bearer ${apiSecret}`,
    },
});
export default client