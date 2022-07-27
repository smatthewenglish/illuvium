var chai = require('chai');
chai.use(require('chai-string'));

const { expect } = require("chai");
const { ethers } = require("hardhat");
const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

describe("Test: 00", function () {

    let IlluviumCorePool;
    let illuviumCorePool;

    let IlluviumERC20;
    let illuviumERC20;

    let EscrowedIlluviumERC20;
    let escrowedIlluviumERC20;

    let IlluviumPoolFactory;
    let illuviumPoolFactory;

    let addrX;
    let addr0;
    let addr1;
    let addr2;
    let addr3;
    let addr4;
    let addr5;
    let addrs;

    beforeEach(async function () {
        [addrX, addr0, addr1, addr2, addr3, addr4, addr5, ...addrs] = await ethers.getSigners();

        IlluviumERC20 = await ethers.getContractFactory("IlluviumERC20");
        //owner of the initial token supply
        let _initialHolder = addr1.address;
        illuviumERC20 = await IlluviumERC20.deploy(_initialHolder);
        //ILV ERC20 Token IlluviumERC20 address
        let _ilv = illuviumERC20.address;

        //sILV ERC20 Token EscrowedIlluviumERC20 address
        EscrowedIlluviumERC20 = await ethers.getContractFactory("EscrowedIlluviumERC20");
        escrowedIlluviumERC20 = await EscrowedIlluviumERC20.deploy();
        let _silv = escrowedIlluviumERC20.address;

        //Pool factory IlluviumPoolFactory instance/address
        IlluviumPoolFactory = await ethers.getContractFactory("IlluviumPoolFactory");
       
        //initial ILV/block value for rewards
        let _ilvPerBlock = 1;
        //how frequently the rewards gets updated (decreased by 3%), blocks
        let _blocksPerUpdate = 1;
        //block number to measure _blocksPerUpdate from
        let initBlockUpdate = 10;
        //block number when farming stops and rewards cannot be updated anymore
        let _endBlock = 100;

        illuviumPoolFactory = await IlluviumPoolFactory.deploy(
          _ilv, _silv, _ilvPerBlock, _blocksPerUpdate, initBlockUpdate, _endBlock
        );
        let _factory = illuviumPoolFactory.address;

        //token the pool operates on, for example ILV or ILV/ETH pair
        let _poolToken = _ilv;

        //initial block used to calculate the rewards
        let initBlockRewards = 10;

        //number representing a weight of the pool, actual weight fraction
        //is calculated as that number divided by the total pools weight and doesn't exceed one
        let _weight = 1;
      
        /* * */

        IlluviumCorePool = await ethers.getContractFactory("IlluviumCorePool");
        illuviumCorePool = await IlluviumCorePool.deploy(
          _ilv, _silv, _factory, _poolToken, initBlockRewards, _weight
        );
    });

    // it("test 00: IlluviumERC20", async function () {
    //   let name = await illuviumERC20.name();
    //   expect(name).to.equal("Illuvium");
    // });

    //console.log("name: " + name);
    // it("test 01: EscrowedIlluviumERC20", async function () {
    //   let name = await escrowedIlluviumERC20.name();
    //   expect(name).to.equal("Escrowed Illuvium");
    // });
    
    // it("test 02: IlluviumPoolFactory", async function () {
    //   let blockNumber = await illuviumPoolFactory.blockNumber();
    //   expect(blockNumber).to.equal(3);
    // });

    it("test 03: IlluviumCorePool", async function () {
      let _vault = addr0.address;
      let value = await illuviumCorePool.setVault(_vault);
      console.log(await value.wait());
    });

});