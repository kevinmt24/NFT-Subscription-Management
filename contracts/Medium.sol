// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

    //TODO:
     //1. Connect to ethereum wallet.
     //2. Ability to mint an ERC1155 token, limit 10 tokens per day.
     //3. Verify ownership of given day's token.
     //4. Grant access to restricted page.

contract Medium is ERC1155 {

    uint public tokenLimitForTheDay = 10;
    uint256 public lastTimestamp;
    constructor() ERC1155("") {
        lastTimestamp = block.timestamp;
    }

    function mint(address account, uint256 id, uint256 amount)
        public
    {
        //Setting Token limit to 10 the next day.
        if(lastTimestamp + 86400 <= block.timestamp)
            tokenLimitForTheDay = 10;
        
        //TODO: Limit number of token for each account
        require(tokenLimitForTheDay >= 0, "You cannot mint more tokens today.");
        require(amount < tokenLimitForTheDay, "Limited to mint 10 tokens per day.");
        _mint(account, id, amount,"");
        tokenLimitForTheDay -= amount;

    }

    //Check whether user has required token for present day.
    function verifyUserHasToken(address account, uint256 tokenID) 
    public view returns(bool) {
        
        require(tokenID > 0, "Enter valid token ID");
        //TODO: Require statement for checking whether user has current day token.
        return balanceOf(account, tokenID) > 0;
    }



}
