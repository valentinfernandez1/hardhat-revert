const { ethers } = require("hardhat");
const { expect } = require("chai");


// Simple ERC20 contract to test and show the current issue 
// with revert in frontier's RPC.
//
// The first 3 tests are to show that the contract is working properly
// And the the last test should help detect the problem.

const targetCollator = "0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac";
describe('MyToken', () => {
    let token;

    const _totalSupply = "8000000000000000000000000";

    async function deployToken() {
        // Get the contract factory and signers here
        const accounts = await ethers.getSigners();
        
        const token = await ethers.getContractFactory("MyToken", accounts[0]);
    
        // Deploy the staking DAO and wait for the deployment transaction to be confirmed
        const deployedToken = await token.deploy(_totalSupply);
        await deployedToken.waitForDeployment();

        // Return the deployed DAO to allow the tests to access and interact with it
        return { deployedToken, accounts };
      }
    
    // Check Total Supply
    it("checks total supply", async () => {
        const {deployedToken} = await deployToken();
        const totalSupply = await deployedToken.totalSupply();
        expect(totalSupply).to.equal(_totalSupply);
    });

    // Check the balance of the owner of the contract
    it("should return the balance of token owner", async () => {
        const {deployedToken, accounts} = await deployToken();
        const balance = await deployedToken.balanceOf(accounts[0]);
        expect(balance).to.equal(_totalSupply);
    }); 
/* 
     // Transfer token and check balances
    it("should transfer token", async () => {
        const amount = "1000000000000000000";
        // Transfer method
        await token.transfer(accounts[1], amount, { from: accounts[0] });
        balance1 = await token.balanceOf(accounts[1]);
        assert.equal(balance1, amount, 'accounts[1] balance is wrong');
    }); */

    // --- Demonstrate the current issue with Frontier ---

    // Make a transfer to address zero which will fail 
    // because of require(from != address(0), "ERC20: transfer from the zero address");
    it("should revert transfer to zero address", async () => {
        let zero_address = "0x0000000000000000000000000000000000000000";
        let expected_revert_reason = 'ERC20: transfer to the zero address';

        const {deployedToken, accounts} = await deployToken();
        console.log("---log the actual result of executing the transaction---")
        try {
            await deployedToken.transfer(zero_address, 10)  //will revert
        } catch (tx_err) {
            console.log(tx_err)
        }

        // Test that the expect with revert reason works
        expect(await deployedToken.transfer(zero_address, 10)).to.be.revertedWith(expected_revert_reason)
    })
});
