import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.webduct.com/public/graphql?access_token=c97ce67c150af6f3363c131c0c013ca7497512f2",
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")
);
