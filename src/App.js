import React, { useState, useEffect } from "react";
import FrontPage from "./components/frontPage";
import "./App.css";
import createCurrentAccount$ from "@drizzle-utils/current-account-stream";

const getWeb3 = require("@drizzle-utils/get-web3");
const createDrizzleUtils = require("@drizzle-utils/core");

function App() {
  const initialState = {
    web3: null,
    drizzleUtils: null,
    currentAccount: null
  };

  const [state, setAppState] = useState(initialState);

  //setup web3
  useEffect(() => {
    const setup = async () => {
      const web3 = await getWeb3();
      const drizzleUtils = await createDrizzleUtils({ web3 });

      setAppState({ ...state, web3, drizzleUtils });
    };

    setup();
  }, []);



  return <FrontPage />;
}

export default App;




// Trying to subscribe to Accounts


  // useEffect(() => {
  //   const getAccounts = async () => {
  //     if (state.web3) {
  //       const web3 = await getWeb3();
  //       console.log(web3);
  //       const currentAccount$ = await createCurrentAccount$({web3});
  //       const unsubscribe = currentAccount$.subscribe(currentAccount => {
  //         console.log(currentAccount);
  //         setAppState({ ...state, currentAccount });
  //       });

  //       return unsubscribe;
  //     }
  //   };

  //   getAccounts();
  // }, [state.web3]);