import React from 'react'
import { IState as Props } from './index';
import Link from "next/link";

interface IProps {
  setModal: React.Dispatch<React.SetStateAction<Props["modal"]>>;
  modal: Props["modal"];
  modalToggle: () => void;
}

const SideBarMenu: React.FC<IProps> = ({modalToggle}) => {
  return (
    <main className="fixed top-0 left-0 w-full h-full grid z-50 bg-gray-800 bg-gradient-to-r from-yellow-400 to-black p-7">
      <div className="flex justify-between text-3xl text-white font-bold">
        <div className="flex justify-start flex-col cursor-pointer">
          <Link href="/guessinggame">
            <a>
              <h1 className="mb-5 hover:text-black">GuessingGame</h1>
            </a>
          </Link>
          <Link href="/tokens">
            <a>
              <h1 className="mb-5 hover:text-black">Tokens</h1>
            </a>
          </Link>
          <Link href="/nft">
            <a>
              <h1 className="mb-5 hover:text-black">NFTs</h1>
            </a>
          </Link>
          <Link href="/dao">
            <a>
              <h1 className="mb-5 hover:text-black">Governance</h1>
            </a>
          </Link>
          <Link href="/liquiditypools">
            <a>
              <h1 className="mb-5 hover:text-black">Liquidity Pools</h1>
            </a>
          </Link>
          <Link href="/swap">
            <a>
              <h1 className="mb-5 hover:text-black">Swap</h1>
            </a>
          </Link>
          <Link href="/lotterygame">
            <a>
              <h1 className="mb-5 hover:text-black">LotteryGame</h1>
            </a>
          </Link>
          <Link href="https://mumbaifaucet.com/">
            <a target="_blank">
              <h1 className="mb-5 hover:text-black">Mumbai Faucet</h1>
            </a>
          </Link>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
          fill=""
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cursor-pointer hover:scale-75"
          onClick={modalToggle}
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </main>
  );
}

export default SideBarMenu



 