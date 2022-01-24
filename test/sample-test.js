const { expect } = require("chai");
const { ethers } = require("hardhat");

describe ("MyNFT", function(){
  it("Should mint and transfer an NFT to the buyer", async function () {
    const Gradients = await ethers.getContractFactory("Gradients");
    const gradients = await Gradients.deploy();
    await gradients.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    const metadataURI = 'cid/test.png';

    let balance = await gradients.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await gradients.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05') });

    await newlyMintedToken.wait();

    balance = await gradients.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await gradients.isContentOwned(metadataURI)).to.equal(true);
    
  });
});