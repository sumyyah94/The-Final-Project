import { BrowserRouter , Routes ,Route } from 'react-router-dom';
import React from 'react'
import './App.css';
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import Transaction from './Pages/Transaction'
import { makeStyles} from "@material-ui/core";
import Alert from './Components/Alert';

  

function App() {

  
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor:'#2f4f4f',
      color:'#d3d3d3',
      minHeight:'100vh',
    }

  }));
  const classes = useStyles()
  return (
    <BrowserRouter>
     <div className= {classes.App}>
    <Header />
    <Routes>
   <Route  path="/" element={<Homepage />} exact />
    <Route   path="/coins/:id" element={<CoinPage/> } exact  /> 
    <Route   path="/transaction" element={<Transaction/> } exact  /> 
    </Routes>
    </div>
    <Alert/>
    </BrowserRouter>
    
  )

}

export default App;

