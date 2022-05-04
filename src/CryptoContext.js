
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios";

import { CoinList } from './config/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
const  Crypto = createContext()

const CryptoContext = ({children}) => {
    const [currency , setCurrency] = useState("SAR");
const[ symbol , setSymbol] = useState ("﷼");
const [coins, setCoins] = useState([]);
const [loading, setLoading] = useState(false);
const[user , setUser]=useState(null);
const [alert, setAlert] = useState(
    {
        open: false,
        message: "",
        type: "success",
      }
);
const [watchlist , setwatchlist] =useState([]);
useEffect (()=>{

if(user){
  const coinRef = doc(db,"watchlist" , user.uid);
  var unsubscribe= onSnapshot(coinRef , coin=>{
    if(coin.exists()){
      console.log(coin.data().coins);
      setwatchlist(coin.data().coins);
    }
    else{
      console.log("No Items In Watchlist");
    }
  });
  return()=>{
    unsubscribe();
  }


}

},[user])
useEffect(() => {
 onAuthStateChanged(auth , user => {
   if (user)setUser(user);
   else setUser (null);
 })
}, [])


const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };



useEffect(() => { 
    if (currency === "SAR") setSymbol("﷼");
else if  (currency === "USD") setSymbol("$");
else if (currency === "AED")setSymbol("د.إ");
else if (currency === "BHD")setSymbol("د.ب");
else if (currency === "KWD")setSymbol("د.ك");
console.log(user);
fetchCoins();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [currency]);

  return (
   <Crypto.Provider value={{currency, symbol, setCurrency ,coins ,loading ,fetchCoins ,alert, setAlert , user , watchlist}}> 
   {children}
   </Crypto.Provider>
  )
};

export default CryptoContext
export const CryptoState =() => {
    return useContext(Crypto);
}