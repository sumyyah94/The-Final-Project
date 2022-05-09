import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import {TextField,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
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
    <>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
    <h1 >
    Send ETH payment
  </h1>
  <TextField id="standard-basic"  name="addr" label="Recipient Address" />
  <TextField id="standard-basic" name="ether" label="Amount in ETH"  />
  <Button variant="contained" color="primary" type="submit" >
  Transfer
</Button>
  <ErrorMessage message={error} />
  <TxList txs={txs} />

    </form>
    </>
    );
  }

