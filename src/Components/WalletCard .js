import React, {useState , useEffect} from 'react'
import{ethers} from 'ethers'



const WalletCard = () => {
   
	//const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
//const [connButtonText, setConnButtonText] = useState('Connect Wallet');//
	
	useEffect(() => {
//setConnButtonText("Connect Wallet");
		
	  }, []);
    /*const connectWalletHandler = () => {
        if (window.ethereum)

        {
            window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
            })
        }else{
                setErrorMessage('Please install MetaMask browser extension to interact');
            }
        }*/
    

const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
}
const getAccountBalance = (address) => {
    window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
        })
}
const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
}

window.ethereum.on('accountsChanged', accountChangedHandler);

window.ethereum.on('chainChanged', chainChangedHandler);
    return(
		
		
        <div className='walletCard'>
		
		<h4 variant="subtitle2"
		style={{
			textAlign: "center",
			  color:"darkgray",
			  textTransform:"capitalize",
			  fontFamily:"Montserrat",
		  }}> {"Connection To Your Account "} </h4>

			{/*<button onClick={connectWalletHandler}>{connButtonText}</button>*/}
			<div className='accountDisplay'>
				<h3 style={{
					textAlign: "center",
					  color:"darkgray",
					  textTransform:"capitalize",
					  fontFamily:"Montserrat",
					  margin:"20px",
				  }}>Address: {defaultAccount}</h3>
			</div>
			<div className='balanceDisplay'>
				<h3 style={{
					textAlign: "center",
					  color:"darkgray",
					  textTransform:"capitalize",
					  fontFamily:"Montserrat",
					  margin:"20px",
				  }}>Balance: {userBalance}</h3>
			</div>
			{/*{errorMessage}*/}
		</div>
		
	)
}

    
export default WalletCard;