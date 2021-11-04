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
    uri: "https://api.webduct.com/public/graphql?access_token=d6569c24ccf1de0b0a38968ab54c82257d77447d",
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")
);
