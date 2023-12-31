import React, { useState, useEffect, useRef } from "react";
import {providers} from "ethers";
import Web3Modal from "web3modal";
import { createContext, useContext } from "react";
import { setInterval } from "timers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

// import {INFURA_ID} from "./infura-id"

type Props = {
  children: JSX.Element;
};

export type useWeb3 = {
  getProviderOrSigner: (
    needSinger: boolean
  ) => Promise<providers.Web3Provider | providers.JsonRpcSigner>;
  getAddress: () => Promise<string>;
  connectWallet: () => void;
  account: string | null;
  setAccount: React.Dispatch<React.SetStateAction<string | null>>;
  walletConnected: boolean;
  setWalletConnected: React.Dispatch<React.SetStateAction<boolean>>;
  web3ModalRef: any;
  numberIsZero: boolean;
  setNumberIsZero: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
 

const Web3Context = createContext<useWeb3 | null>(null);


const Web3Provider = ({ children }: Props) => {
  const [account, setAccount] = useState<useWeb3["account"]>(null);
  const [walletConnected, setWalletConnected] = useState<useWeb3["walletConnected"]>(false);
  const [numberIsZero, setNumberIsZero] =useState<useWeb3["numberIsZero"]>(false);
  const [loading, setLoading] = useState<useWeb3["loading"]>(false)
  const web3ModalRef: any = useRef();
  
  const getAddress = async () => {
    const provider = window.ethereum;
    const web3Provider = new providers.Web3Provider(provider);
    const thisAccount = await web3Provider.getSigner().getAddress();
    setAccount(await web3Provider.getSigner().getAddress());
    return thisAccount;
  };

  const getNetwork = async() => {
     const web3Provider = new providers.Web3Provider(window.ethereum);
     const { chainId } = await web3Provider.getNetwork();
     if (chainId !== 80001) {
       alert("Change the network to Mumbai");
       throw new Error("Change network to Mumbai");
     }
  }

  const getProviderOrSigner = async (needSigner = false): Promise<providers.Web3Provider | providers.JsonRpcSigner> => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      alert("Change the network to Mumbai");
      throw new Error("Change network to Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { 
        if (!walletConnected) {
             web3ModalRef.current = new Web3Modal({
               network: "mumbai",
               providerOptions: {
                //  walletconnect: {
                //    package: WalletConnectProvider, // required
                //    options: {
                //      infuraId: INFURA_ID, // required
                //    },
                //  },
                //  coinbasewallet: {
                //    package: CoinbaseWalletSDK, // Required
                //    options: {
                //      appName: "LJCrypto-Exchange", // Required
                //      infuraId: INFURA_ID, // Required
                //      rpc: "", // Optional if `infuraId` is provided; otherwise it's required
                //      // chainId: 1, // Optional. It defaults to 1 if not provided
                //      darkMode: false, // Optional. Use dark theme, defaults to false
                //    },
                //  },
                //  binancechainwallet: {
                //    package: true,
                //  },
               },
             });
        }
      setInterval(async() => {
        await getAddress()
        await getNetwork()
      }, 1 * 1000)
  }, [walletConnected, account])

  let sharedState = {
    walletConnected,
    setWalletConnected,
    account,
    setAccount,
    web3ModalRef,
    getAddress,
    getProviderOrSigner,
    connectWallet,
    numberIsZero,
    setNumberIsZero,
    loading,
    setLoading
  };

  return (
    <Web3Context.Provider value={sharedState}>{children}</Web3Context.Provider>
  );
};

export function useWeb3Context() {
  return useContext(Web3Context);
}

export {Web3Context, Web3Provider}