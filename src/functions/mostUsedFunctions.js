

export const walletConnect = (SetWallet)=>{

  if(window.ethereum){
      window.ethereum.request({method:'eth_requestAccounts'})
      .then(res=>{
             
          SetWallet(res[0])
      })
    }else{
      alert("install metamask extension!!")
    }
}



export const checkIfAccountChanged = async (SetWallet) => {
    try {
      const {ethereum} = window;
      ethereum.on("accountsChanged", (accounts) => {
        console.log("Account changed to:", accounts[0]);
        if(accounts[0]){
            SetWallet(accounts[0]);
        }else{
            SetWallet('Connect Wallet');
        }
        
      });
    } catch (error) {
      console.log(error);
    }
  };