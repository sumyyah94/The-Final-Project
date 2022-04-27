import { Container, makeStyles, Typography } from '@material-ui/core';
import Carousel from "./Carousel";
import React from 'react';



const useStyles=makeStyles(() => ({
banner:{
    backgroundImage:"url(./ffff.jpg)",
},
bannerContent:{
    height:400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent:"space-around",

},
tagline: {
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
},
}));

const Banner = () => {

    const classes=useStyles();
  return (

    <div className={ classes.banner}>
    <Container className={classes.bannerContent}>
    <div className={classes.tagline}>
    <Typography 
    variant='h2'
    style={{
          fontWeight:"bold",
          marginBottom:15,
          fontFamily:"Montserrat",
      }}>
     
     
      Crypto Tracker

 
    </Typography>
    <Typography
    variant="subtitle2"
  style={{
        color:"darkgray",
        textTransform:"capitalize",
        fontFamily:"Montserrat",
    }}>
    Track your favorite cryptocurrency and get all the information about it
    </Typography>

     
    </div>
    <Carousel />

    
    </Container>
    
    </div>
  )
};

export default Banner;
