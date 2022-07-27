var chai = require('chai');
chai.use(require('chai-string'));

const { expect } = require("chai");
const { ethers } = require("hardhat");
const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

describe("Test: 00", function () {

  let Staking;
  let staking;

  let Polygods;
  let polygods;

  let Polycoin;
  let polycoin;

    let addrX;
    let addr0;
    let addr1;
    let addr2;
    let addr3;
    let addr4;
    let addr5;
    let addrs;
  
    const provider = waffle.provider;

    async function getBalance(address) {
        let balance00 = await provider.getBalance(address);
        let balance01 = ethers.utils.formatUnits(balance00, "gwei");
        return parseInt(balance01);
    }

    beforeEach(async function () {
        [addrX, addr0, addr1, addr2, addr3, addr4, addr5, ...addrs] = await ethers.getSigners();
        
        let coordinator = "0x0000000000000000000000000000000000000000";
        let baseURI = "ipfs://QmVXUQWcWvurNeFWvWHzYgQw2DMdEbUTRjX94rRZ5Ek4Lz/";
        let banned = "0x0000000000000000000000000000000000000000";

        Polygods = await ethers.getContractFactory("Polygods");
        polygods = await Polygods.deploy(coordinator, baseURI, "", banned);

        await polygods.flipSaleState();
        await polygods.connect(addr1).mint__I_UNDERSTAND_AND_ACCEPT_TERMS_OF_SERVICE(2, {
          value: ethers.utils.parseEther("2")
        });

        Polycoin = await ethers.getContractFactory("Polycoin");
        polycoin = await Polycoin.deploy();


        Staking = await ethers.getContractFactory(process.env.CONTRACT_NAME);
        staking = await Staking.deploy(polygods.address, polycoin.address);
        await staking.setCountMint(10);

    });

    it("test 00: basic staking", async function () {
     
      let tokenId00 = 1;
      await staking.connect(addr1).stake(tokenId00);

      let value = await polycoin.balanceOf(addr1.address)

      console.log("value: " + value);
      console.log("addr1: " + addr1.address);


    });

});