import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";


async function deployDepositWithdraw() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const DepositWithdraw = await ethers.getContractFactory("DepositWithdraw");
    const depositWithdraw = await DepositWithdraw.deploy();

    return { depositWithdraw, owner, otherAccount };
  } 
describe("DepositWithdraw", function () {
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { depositWithdraw, owner} = await loadFixture(deployDepositWithdraw);
      expect(await depositWithdraw.owner()).to.equal(owner.address);
    });
  });

  describe("Transactions", function () {
    it("Should allow deposits and update balance", async function () {
      const { depositWithdraw, otherAccount} = await loadFixture(deployDepositWithdraw);
      await depositWithdraw.connect(otherAccount).deposit({ value: ethers.parseEther("1") });
      expect(await depositWithdraw.balances(otherAccount.address)).to.equal(ethers.parseEther("1"));
    });

    it("Should allow withdrawals and update balance", async function () {
      const { depositWithdraw, otherAccount} = await loadFixture(deployDepositWithdraw);
      await depositWithdraw.connect(otherAccount).deposit({ value: ethers.parseEther("1") });
      await depositWithdraw.connect(otherAccount).withdraw(ethers.parseEther("0.5"));
      expect(await depositWithdraw.balances(otherAccount.address)).to.equal(ethers.parseEther("0.5"));
    });

    it("Should fail if withdrawal amount exceeds balance", async function () {
      const { depositWithdraw, otherAccount} = await loadFixture(deployDepositWithdraw);
      await depositWithdraw.connect(otherAccount).deposit({ value: ethers.parseEther("1") });
      await expect(depositWithdraw.connect(otherAccount).withdraw(ethers.parseEther("2"))).to.be.revertedWith("Amount requested exceeds max balance");
    });

    it("Should allow transfers", async function () {
      const { depositWithdraw, owner, otherAccount} = await loadFixture(deployDepositWithdraw);
      await depositWithdraw.connect(owner).deposit({ value: ethers.parseEther("1") });
      await depositWithdraw.connect(owner).transfer(otherAccount.address, ethers.parseEther("0.5"));
      expect(await ethers.provider.getBalance(otherAccount.address)).to.equal(ethers.parseEther("10000.5")); // 10000 Ether is the initial balance in Hardhat Network
    });

    it("Should fail if transfer amount exceeds balance", async function () {
      const { depositWithdraw, owner, otherAccount} = await loadFixture(deployDepositWithdraw);
      await depositWithdraw.connect(owner).deposit({ value: ethers.parseEther("1") });
      await expect(depositWithdraw.connect(owner).transfer(otherAccount.address, ethers.parseEther("2"))).to.be.revertedWith("Amount requested exceeds max balance");
    });
  });
});