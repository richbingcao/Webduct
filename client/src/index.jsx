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
    uri: "https://api.webduct.com/public/graphql?access_token=f23ed1aba696a541b99240da9bdebff432176d2e",
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")
);
