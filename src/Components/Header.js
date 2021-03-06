import { AppBar, Container,  createTheme,  MenuItem,  Select,  Toolbar, Typography ,ThemeProvider, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal'
import UserSidebar from './Authentication/UserSidebar';


const useStyles=makeStyles(()=>({
    title:{
        flex:1,
        color:"#808080",
        fontFamily:"Montserrat",
        fontWeight:"bold",
        cursor:"pointer",

    },
    
}));
const Header = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const { currency , setCurrency , user } = CryptoState ();
    console.log(currency);
    const darkTheme = createTheme ({
        palette:{ primary:{
            main:'#808080'
        },
        type:'dark',
        }
    })

  return (
      <ThemeProvider theme={darkTheme}>
    <AppBar color="transparent" position="static">
<Container> 
<Toolbar>
<Typography 

onClick ={()=> navigate("/")}
className={classes.title} 
variant='h6'>




Crypto Tracker</Typography>





<Button variant="contained" onClick ={() => navigate(`/Transaction`)} style={{width:100, height:40, marginRight:15,}} >
Transfer
</Button>






<Select variant="outlined" style={{width:100, height:40, marginRight:15,}}
value={currency}
onChange={(e) => setCurrency(e.target.value)}
>
<MenuItem value={"USD"}>USD</MenuItem>
<MenuItem value={"SAR"}>SAR</MenuItem>
<MenuItem value={"AED"}>AED</MenuItem>
<MenuItem value={"BHD"}>BHD</MenuItem>
<MenuItem value={"KWD"}>KWD</MenuItem>


</Select>
{user ? <UserSidebar/> : <AuthModal />}
</Toolbar>
</Container>

     </AppBar>
     </ThemeProvider>
  )
}

export default Header
