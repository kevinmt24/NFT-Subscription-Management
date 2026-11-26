// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

// Each day's passes are a separate ERC-1155 token type (id = day number),
// so a pass only unlocks articles on the day it was minted.
contract Medium is ERC1155 {
    uint256 public constant DAILY_LIMIT = 10;

    mapping(address => uint256) public lastMintDay;
    mapping(address => uint256) public mintedToday;

    constructor() ERC1155("") {}

    function today() public view returns (uint256) {
        return block.timestamp / 1 days;
    }

    function mint(uint256 amount) public {
        uint256 day = today();
        if (lastMintDay[msg.sender] != day) {
            lastMintDay[msg.sender] = day;
            mintedToday[msg.sender] = 0;
        }
        require(mintedToday[msg.sender] + amount <= DAILY_LIMIT, "Limited to mint 10 tokens per day.");
        mintedToday[msg.sender] += amount;
        _mint(msg.sender, day, amount, "");
    }

    function getTokenBalance(address account) public view returns (uint256) {
        return balanceOf(account, today());
    }

    function useAToken() public {
        require(balanceOf(msg.sender, today()) > 0, "Not enough tokens to view the article.");
        _burn(msg.sender, today(), 1);
    }
}
