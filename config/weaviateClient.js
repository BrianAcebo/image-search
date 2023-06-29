import weaviate from "weaviate-ts-client";

const {
    WEAVIATE_SCHEME,
    WEAVIATE_HOST,
    WEAVIATE_SCHEME_DEV,
    WEAVIATE_HOST_DEV
} = process.env;

const client = weaviate.client({
    scheme: WEAVIATE_SCHEME_DEV,
    host: WEAVIATE_HOST_DEV
});

export default client;