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

    function getBalance(address toCheck) public view returns (uint) {
        return balances[toCheck];
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value, block.timestamp);
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
        balances[msg.sender] -= _amount;
        emit Withdrawal(msg.sender, _amount, block.timestamp);
    }

    function transfer(address payable _to, uint _amount) public {
        // Note that "to" is declared as payable
        require(
            _amount <= balances[msg.sender],
            "Amount requested exceeds max balance"
        );
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Failed to send Ether");
        balances[msg.sender] -= _amount;
        emit Transfer(msg.sender, _to, _amount, block.timestamp);
    }
}
