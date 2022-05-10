import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import {TextField,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WalletCard from '../Components/WalletCard ';
import "./transaction.css"
const useStyles = makeStyles((theme) => ({
  root : {
   
    fontSize:30,
    '& .MuiOutlinedInput-root': {  // - The Input-root, inside the TextField-root
      
      '&:hover fieldset': {
          borderColor: 'gray', // - Set the Input border when parent has :hover
      },
      '&.Mui-focused fieldset': { // - Set the Input border when parent is focused 
          borderColor: 'green',
      },
  },
  },
}));

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

export default function Transaction() {

  const classes = useStyles();

  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
 
 
  
  const handleSubmit = async (e) => {
    console.log('here');
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };

  return (
    <div className="container">
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
    <h1 style={{
			textAlign: "center",
			  color:"darkgray",
			  textTransform:"capitalize",
			  fontFamily:"Montserrat",
        margin:"20px",
		  }}>
    Send Ethers
  </h1>
  <WalletCard/>
<div className="container1">
  <TextField className="space" fullWidth inputProps={{style: {fontSize: 30}}} variant="outlined" id="standard-basic"  name="addr" label="Recipient Address" />
  <TextField  fullWidth className="space" inputProps={{style: {fontSize: 30}}} id="standard-basic" name="ether" label="Amount in ETH"  />
  <Button  className="space" variant="contained" color="primary" type="submit" >
  Transfer
</Button>

  <ErrorMessage message={error} />
  <TxList txs={txs} />
  </div>
  
    </form>
    </div>
    );
  }

