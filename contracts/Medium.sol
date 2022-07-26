// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Medium is ERC1155 {

    uint256 public lastTimestamp;
    uint256 currentDateAsTokenID;
    event getBalance(uint tokenBalance);
    mapping (address => uint256) tokenlimits;
    mapping (address => uint256) tokenIds;

    constructor() ERC1155("") {
        lastTimestamp = block.timestamp;
    }
   
    function mint(address account, uint256 amount )
        public
    {
        currentDateAsTokenID = block.timestamp/84600;

       //Setting token Limit to a new user to 10
        if(tokenlimits[account] == 0 && tokenIds[account] == 0)
            tokenlimits[account] = 11;

        //Setting Token limit to 10 the next day.
        if(lastTimestamp + 86400 <= block.timestamp) {
            lastTimestamp = block.timestamp;
            tokenlimits[account] = 11;
        }

        require(tokenlimits[account] > 1, "You cannot mint more tokens today.");
        require(amount <= tokenlimits[account], "Limited to mint 10 tokens per day.");

        _mint(account, currentDateAsTokenID, amount,"");
        tokenIds[account] = currentDateAsTokenID;
        tokenlimits[account] -= amount;

    }

    //Check whether user has required token for present day.
    function verifyUserHasToken(address account) 
    public {
         emit getBalance(balanceOf(account, block.timestamp/84600));
    }

    function useAToken(address account) public  {
        require(balanceOf(account, block.timestamp/84600) > 0, "Not enough tokens to view the article.");
        _burn(account,block.timestamp/84600,1);
    }

}