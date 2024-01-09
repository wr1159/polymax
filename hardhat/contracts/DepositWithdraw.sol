// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract DepositWithdraw {
    address payable public owner;

    // Payable constructor can receive Ether
    constructor() payable {
        owner = payable(msg.sender);
    }

    event Deposit(address user, uint amount, uint when);
    event Withdrawal(address user, uint amount, uint when);
    event Transfer(address user, address _to, uint amount, uint when);
    mapping(address => uint) public balances;

    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function deposit() public payable {
        emit Deposit(msg.sender, balances[msg.sender], block.timestamp);
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint _amount) public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
        require(
            _amount <= balances[msg.sender],
            "Amount requested exceeds max balance"
        );

        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Failed to send Ether");
        emit Withdrawal(msg.sender, balances[msg.sender], block.timestamp);
        balances[msg.sender] -= _amount;
    }

    function transfer(address payable _to, uint _amount) public {
        // Note that "to" is declared as payable
        require(
            _amount <= balances[msg.sender],
            "Amount requested exceeds max balance"
        );
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Failed to send Ether");
        event Transfer(address user, address _to, uint amount, uint when);
        balances[msg.sender] -= _amount;
    }
}
