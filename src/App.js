import React, { useState, useEffect } from "react";
import FrontPage from "./components/frontPage";
import "./App.css";

const getWeb3 = require("@drizzle-utils/get-web3");
const createDrizzleUtils = require("@drizzle-utils/core");

const initialState = {
  web3: null,
  drizzleUtils: null,
  accounts: null
};
const AppState = React.createContext(initialState);

function App() {


  const [state, setAppState] = useState(initialState);
 

  useEffect(() => {
    const loadWeb3 = async () => {
      const web3 = await getWeb3();
      setAppState({ ...state, web3 });
    };
    console.log(state);

    if (!state.web3) loadWeb3();
  });

  useEffect(() => {
    const setupDrizzleUtils = async () => {
      const web3 = state.web3;
      const drizzleUtils = await createDrizzleUtils({ web3 });
      setAppState({ ...state, drizzleUtils });
    };

    if (state.web3) setupDrizzleUtils();
  }, [state.web3]);

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await state.drizzleUtils.getAccounts();
      setAppState({ ...state, accounts });
    };

    if (state.drizzleUtils) getAccounts();
  }, [state.drizzleUtils]);

  return (<AppState.Consumer value={state} >{value => <FrontPage />}</AppState.Consumer>);
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
