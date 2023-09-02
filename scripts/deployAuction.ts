import { ethers } from "ethers";
import { Auction__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

/** @dev function default is to set the network with RPC_URL from .env */
function setupProvider() {
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ""
  );
  return provider;
}

// main function
async function deployAuction() {
  const provider = setupProvider();
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

  const balanceRN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceRN));
  console.log(`balance: ${balance}`);
  if (balance < 0.01) {
    throw new Error("not enough");
  }

  const auctionFactory = new Auction__factory(wallet);
  const auctionContract = await auctionFactory.deploy();
  await auctionContract.waitForDeployment();

  // console logs contract address
  const contractAddress = await auctionContract.getAddress();
  console.log(`Contract address: ${contractAddress} `);
}

deployAuction()
  .then(() => {
    console.log("Auction has been deployed ( ͡• ʖ ͡•)");
    process.exitCode = 0;
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
