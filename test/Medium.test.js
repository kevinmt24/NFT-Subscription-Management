const { time } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Medium", function () {
  async function deploy() {
    const [alice, bob] = await ethers.getSigners();
    const medium = await (await ethers.getContractFactory("Medium")).deploy();
    return { medium, alice, bob };
  }

  it("mints today's passes to the caller and burns one per article", async function () {
    const { medium, alice } = await deploy();
    await medium.mint(3);
    expect(await medium.getTokenBalance(alice.address)).to.equal(3);
    await medium.useAToken();
    expect(await medium.getTokenBalance(alice.address)).to.equal(2);
  });

  it("caps minting at 10 per day and resets the next day", async function () {
    const { medium } = await deploy();
    await medium.mint(10);
    await expect(medium.mint(1)).to.be.revertedWith("Limited to mint 10 tokens per day.");
    await time.increase(86400);
    await medium.mint(10);
  });

  it("does not let one user burn another user's pass", async function () {
    const { medium, alice, bob } = await deploy();
    await medium.mint(1);
    await expect(medium.connect(bob).useAToken()).to.be.revertedWith("Not enough tokens to view the article.");
    expect(await medium.getTokenBalance(alice.address)).to.equal(1);
  });

  it("yesterday's passes do not count today", async function () {
    const { medium, alice } = await deploy();
    await medium.mint(2);
    await time.increase(86400);
    expect(await medium.getTokenBalance(alice.address)).to.equal(0);
  });
});
