import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import {ApolloClient, HttpLink, InMemoryCache, ApolloProvider} from "@apollo/client"

const client = new ApolloClient({
    link: new HttpLink({
      uri: "https://api.webduct.com/public/graphql?access_token=d4f75d48f9bf9df8ee1c29fcb0dabf1a0d554b3c"
    }),
    cache: new InMemoryCache()
  })

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
      </ApolloProvider>,
    document.getElementById('app')
    );
