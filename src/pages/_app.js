import React from "react";

import Layout from "@/layout";
import { CheckAuthenticate } from "@/components";
import AllContextProvider from "@/context/allContext";

import "@/styles/global.css";

function App({ Component, pageProps }) {
  return (
    <CheckAuthenticate>
      <AllContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AllContextProvider>
    </CheckAuthenticate>
  );
}

export default App;
