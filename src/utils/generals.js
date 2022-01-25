import { changeChain, changeUserInfo } from '../redux/actions/user/userAction';
import { toast } from 'react-toastify';

const convertBalance = (balance, decimal) => {
    const result = +balance / (10**decimal)
    return result;
}

const parseChainId = (_chainId) => {
    return parseInt(_chainId, 16)
}

const shortAddr = (ensName, currentAccount) => {
    if(ensName !== '')
      return ensName;
    return `${currentAccount.substr(0,4)}...${currentAccount.substring(currentAccount.length - 4, currentAccount.length)}`
}

const signIn = async (ethProvider, dispatch) => {
  if(!window.ethereum) {
    toast.error("Wallet not found, Please install MetaMask!")
  } else {
    const address = await connectWallet(ethProvider, dispatch)
    if (address)
    toast.success(`User Login, addres: ${address}!`)
  }
}

const connectWallet = async (ethProvider, dispatch) => {
    try {

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

      const id = await window.ethereum.request({ method: 'eth_chainId' })
      dispatch(changeChain(parseChainId(id)))

      if(parseChainId(id) === 1) {
        const ensName = await ethProvider.lookupAddress(accounts[0]);
        console.log(ensName);
        dispatch(changeUserInfo({ isLogged: true, currentAccount: accounts[0], ensName: !ensName ? '' : ensName }));
      } else {
        dispatch(changeUserInfo({ isLogged: true, currentAccount: accounts[0], ensName: '' }));
      }
      return accounts[0];

    } catch(err) {
      if (err.code === 4001) {
        toast.error("User Rejected Request, Please connect to MetaMask!")
      } else if(err.code === -32002) {
        toast.error("User Request Pending, Please unlock MetaMask and try agin!")
      } else {
        toast.error(`Error, ${err.message}!`)
      }
    }
}



export { convertBalance, parseChainId, shortAddr, signIn, connectWallet };
