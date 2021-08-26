import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export const WithGraphQL = ({ children }) => {
  const client = new ApolloClient({
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
