
import React, { createContext, useContext, useEffect, useState } from 'react'


const  Crypto = createContext()

const CryptoContext = ({children}) => {
    const [currency , setCurrency] = useState("SAR");
const[ symbol , setSymbol] = useState ("﷼");


useEffect(() => { 
    if (currency === "SAR") setSymbol("﷼");
else if  (currency === "USD") setSymbol("$");
else if (currency === "AED")setSymbol("د.إ");
else if (currency === "BHD")setSymbol("د.ب");
else if (currency === "KWD")setSymbol("د.ك");


  
},[currency]);

  return (
   <Crypto.Provider value={{currency, symbol, setCurrency }}> 
   {children}
   </Crypto.Provider>
  )
};

export default CryptoContext
export const CryptoState =() => {
    return useContext(Crypto);
}