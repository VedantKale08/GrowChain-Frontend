"use client";
import React, { createContext, useState, useEffect } from "react";
import { contractAbi, contractAddress } from "./utils/constants";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import { useWinnerStore } from "@/store/winnerStore";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New isLoading state
  const { setWinners } = useWinnerStore();

  const connectWallet = async () => {
    setIsLoading(true); // Set loading true
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const { ethereum } = window;
        if (!ethereum) return alert("Please install MetaMask!");

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
        toast.success("Wallet Connected Successfully");
      } catch (error) {
        console.error("Wallet connection failed", error);
        toast.error("Unable to connect the wallet");
        throw new Error("No Ethereum account found");
      } finally {
        setIsLoading(false); // Set loading false
      }
    }
  };

  const fetchContractDetails = async () => {
    setIsLoading(true); // Set loading true
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const contractOwner = await contract.admin();
      setIsOwner(contractOwner.toLowerCase() === currentAccount.toLowerCase());
    } catch (error) {
      console.error("Error fetching contract details:", error);
      toast.error("Failed to fetch contract details");
    } finally {
      setIsLoading(false); // Set loading false
    }
  };

  const sendTransaction = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum)
        return alert("MetaMask is required to complete this action.");

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const name = localStorage.getItem("userName");
      const tx = await contract.buyTicket(name, {
        value: ethers.utils.parseEther("0.005"),
      });
      await tx.wait();
      getParticipantCount();
      // setIsLoading(false); // Set loading false
      toast.success("Ticket purchased successfully!");
    } catch (error) {
      toast.error("Transaction failed");
      console.error("Transaction error:", error);
    }
  };

  const trackProgress = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum)
        return alert("MetaMask is required to complete this action.");

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
    } catch (error) {
      toast.error("Transaction failed");
      console.error("Transaction error:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const { ethereum } = window;
      if (ethereum) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length) setCurrentAccount(accounts[0]);
      }
    };
    init();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        sendTransaction,
        currentAccount,
        fetchContractDetails,
        isOwner,
        isLotteryOpen,
        setIsLotteryOpen,
        setIsOwner,
        isLoading, // Include isLoading in context value
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
