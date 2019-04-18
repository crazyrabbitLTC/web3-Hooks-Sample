import React, { useState, useEffect } from "react";
import FrontPage from "./components/frontPage";
import "./App.css";
const getWeb3 = require("@drizzle-utils/get-web3");
const createDrizzleUtils = require("@drizzle-utils/core");

function App() {
  const initialState = {
    web3: null,
    drizzleUtils: null,
    accounts: null,
    network: null,
    autoRefresh: false
  };

  const [state, setAppState] = useState(initialState);
  const AppState = React.createContext(state);

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

  useEffect(()=> {
    const getNetworks = async () => {
      const network = state.web3.currentProvider;
      console.dir(network);
      setAppState({...state, network});
    }

    if(state.drizzleUtils) getNetworks();
  },[state.accounts]);

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await state.drizzleUtils.getAccounts();

      if (!state.autoRefresh) {
        window.ethereum.autoRefreshOnNetworkChange = false;
        const subscription = window.ethereum.on("accountsChanged", accounts => {
          setAppState({ ...state, accounts });
          return subscription;
        });
      }

      setAppState({ ...state, accounts });
    };

    if (state.drizzleUtils) getAccounts();
  }, [state.drizzleUtils]);

  return (
    <AppState.Consumer>
      {value => <FrontPage state={value} />}
    </AppState.Consumer>
  );
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
