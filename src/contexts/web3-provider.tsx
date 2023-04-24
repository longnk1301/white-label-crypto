import { useState, useEffect } from 'react';
import { provider as Web3Provider, provider } from 'web3-core';

interface MetaMaskState {
  account: string;
  networkId: string;
  balance: string;
}

interface CustomMetaMaskEthereumProvider extends provider {
  request(args: any): Promise<any>;
}

const useMetaMask = (): MetaMaskState => {
  const [metaMaskState, setMetaMaskState] = useState<MetaMaskState>({
    account: '',
    networkId: '',
    balance: '',
  });

  useEffect(() => {
    async function connectToMetaMask() {
      const provider = (window as any).ethereum;
      if (provider) {
        try {
          await provider.request({ method: 'eth_requestAccounts' });
          const accounts = await provider.request({ method: 'eth_accounts' });
          setMetaMaskState((prevState) => ({ ...prevState, account: accounts[0] }));

          const metaMaskProvider = provider as CustomMetaMaskEthereumProvider;
          metaMaskProvider.on('accountsChanged', (newAccounts) => {
            setMetaMaskState((prevState) => ({ ...prevState, account: newAccounts[0] }));
          });

          metaMaskProvider.on('networkChanged', (newNetworkId) => {
            setMetaMaskState((prevState) => ({ ...prevState, networkId: newNetworkId }));
          });

          const initialNetworkId = await metaMaskProvider.request({ method: 'net_version' });
          const initialBalance = await metaMaskProvider.request({
            method: 'eth_getBalance',
            params: [accounts[0]],
          });
          setMetaMaskState((prevState) => ({
            ...prevState,
            networkId: initialNetworkId,
            balance: initialBalance,
          }));

          metaMaskProvider.on('accountsChanged', async (newAccounts) => {
            const updatedBalance = await metaMaskProvider.request({
              method: 'eth_getBalance',
              params: [newAccounts[0]],
            });
            setMetaMaskState((prevState) => ({ ...prevState, balance: updatedBalance }));
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('Please install MetaMask!');
      }
    }

    connectToMetaMask();
  }, []);

  return metaMaskState;
};

export default useMetaMask;