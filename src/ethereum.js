import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Contract } from 'ethers';
import makeBet from './makeBet.json';

const getBlockchain = () =>
  new Promise( async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if(provider) {
      await provider.request({ method: 'eth_requestAccounts' });
      const networkId = await provider.request({ method: 'net_version' })
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      const MakeBet = new Contract(
        makeBet.networks[networkId].address,
        makeBet.abi,
        signer
      );
      resolve({MakeBet});
      return;
    }
    reject('Install Metamask');
  });

export default getBlockchain;