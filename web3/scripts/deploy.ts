// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import {ethers} from 'hardhat';

async function main() {
  // Deploy MirrorClone smart contract
  // More information can be found here: https://hardhat.org/guides/deploying.html
  const MirrorClone = await ethers.getContractFactory('MirrorClone');
  const mirrorClone = await MirrorClone.deploy('Mirror Clone', 'MRM');

  await mirrorClone.deployed();

  console.log('MirrorClone deployed to:', mirrorClone.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
