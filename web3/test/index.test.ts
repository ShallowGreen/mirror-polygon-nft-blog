import {expect} from 'chai';
import {ethers} from 'hardhat';

describe('MirrorClone', function () {
  let contract, user1Account;

  beforeEach(async () => {
    const MirrorClone = await ethers.getContractFactory('MirrorClone');
    contract = await MirrorClone.deploy('MIRROR', 'MRM');
    await contract.deployed();

    const accounts = await ethers.getSigners();

    user1Account = accounts[1]; // index 0 is reserved for owner
  });

  describe('methods', function () {
    describe('createToken', () => {
      it('reverts when empty tokenURI passed', async () => {
        await expect(contract.createToken('')).to.be.revertedWith(
          'Empty tokenURI',
        );
      });

      it('mints new token', async () => {
        await contract.connect(user1Account).createToken('ar://testhash');

        expect(await contract.balanceOf(user1Account.address)).to.eq(1);
        expect(await contract.tokenURI(1)).to.eq('ar://testhash');
        expect(await contract.ownerOf(1)).to.eq(user1Account.address);
        expect(await contract.tokenURIToTokenId('ar://testhash')).to.eq(1);
      });

      it('emits TokenMinted event', async () => {
        await expect(
          contract.connect(user1Account).createToken('ar://testhash'),
        ).to.emit(contract, 'TokenMinted');
      });
    });
    describe('tokenURIToTokenId', () => {
      it('returns 0 if tokenURI does not exist', async () => {
        expect(await contract.tokenURIToTokenId('ar://does-not-exist')).to.eq(
          0,
        );
      });
    });
  });
});
