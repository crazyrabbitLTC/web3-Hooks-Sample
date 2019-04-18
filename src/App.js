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
    provider: null,
    networkId: null,
    autoRefresh: false,
    appReady: false
  };

  const [state, setAppState] = useState(initialState);
  const AppState = React.createContext(state);

  useEffect(() => {
    const loadWeb3 = async () => {
      const web3 = await getWeb3();
      const drizzleUtils = await createDrizzleUtils({ web3 });
      const provider = web3.currentProvider;
      const networkId = window.ethereum.networkVersion;
      const accounts = await drizzleUtils.getAccounts();

      setAppState({
        ...state,
        web3,
        drizzleUtils,
        provider,
        networkId,
        accounts,
        appReady: true
      });
    };

    console.log(state);

    loadWeb3();
  }, [state.networkId, state.appReady]);

  useEffect(() => {
    const subscribeToNetworkChange = async () => {
      if (!state.autoRefresh) {
        window.ethereum.autoRefreshOnNetworkChange = false;
        const subscription = window.ethereum.on("networkChanged", networkId => {
          setAppState({ ...state, networkId, appReady: false });
          return subscription;
        });
      }
    };

    if (state.drizzleUtils) subscribeToNetworkChange();
  });

  useEffect(() => {
    const subscribeToAccountsChange = async () => {
      if (!state.autoRefresh) {
        window.ethereum.autoRefreshOnNetworkChange = false;
        const subscription = window.ethereum.on("accountsChanged", accounts => {
          setAppState({ ...state, accounts, appReady: false });
          return subscription;
        });
      }
    };

    if (state.drizzleUtils) subscribeToAccountsChange();
  });

  return (
    <AppState.Consumer>
      {value => <FrontPage state={value} />}
    </AppState.Consumer>
  );
}

export default App;
