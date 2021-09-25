import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const APP_API = process.env.APP_API

export const WithGraphQL = ({ children }) => {
  const client = new ApolloClient({
    uri: `${APP_API}/graphql`,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export const getStrapiURL = (path = "") => {
  return `${
    process.env.APP_API || "https://strapi.kralovska-pece.cz"
  }${path}`;
}

export const getStrapiMedia = (media) => {
  const imageUrl = media.url.startsWith("/")
    ? getStrapiURL(media.url)
    : media.url;
  return imageUrl;
}
