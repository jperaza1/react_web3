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

export { convertBalance, parseChainId, shortAddr };