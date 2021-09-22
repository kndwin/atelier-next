import { ApolloProvider } from "@apollo/client";
import client from "../src/graphql/client";
import "../src/sass/global/styles.scss";

const App = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
