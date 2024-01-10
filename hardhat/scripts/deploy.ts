import { ethers } from "hardhat";

async function main() {
  const depositWithdraw = await ethers.deployContract("DepositWithdraw", []);

  await depositWithdraw.waitForDeployment();

  console.log(
    `deployed to ${depositWithdraw.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
