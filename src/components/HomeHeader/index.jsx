

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.png";
import downArrow from "../../images/downArrow.png";


const useStyles = makeStyles((theme) => ({
 'App-header': {
    width: '100%',
    height: '200px !important'

  },

headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: theme.spacing(1),
  },
  appName: {

    fontWeight: 'bold',
    flex: 1,
    marginRight: theme.spacing(1),
  },
  navButtons: {
    display: 'flex',
    alignItems: 'center',

    fontWeight: 'bold',
    '& > *:not(:last-child)': {
      marginLeft: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(1),
      },
    },
  },
  navButton: {
    textTransform: 'none',
    color: '#fff',
    marginRight: theme.spacing(2),

    fontWeight: 'regular',
    position: 'relative',
    '&::after': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '4px',
      bottom: '-34px',
      backgroundColor: '#F47458',
      left: 0,
      opacity: 0,
      transition: 'opacity 0.3s',
    },
    '&:hover::after': {
      opacity: 1,
      backgroundColor: '#F47458',
    },
    '&:hover': {
      color: '#F47458',
    },
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    backgroundColor: '#ffff',
    borderRadius: 20,
    padding: theme.spacing(0.5, 1),
  },
  searchIcon: {
    color: 'grey',
    marginRight: theme.spacing(1),
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#A09D9D',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  profilePic: {
    width: 30,
    height: 30,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dropdownButton: {
    padding: 0,
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  dropdownIcon: {
    color: '#fff',
  },
  downArrowIcon: {
    width: 18,
    height: 18,
  },
}));

const HomeHeader = () => {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
        navigate('/');
      };

  return (
      <header className="App-header"style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px',  height: '80px' }}>

        <div className={classes.headerContent}>
          <div className={classes.logoContainer}>
            <img src={logo} alt="Logo" className={classes.logo} />
            <Typography variant="h5" className={classes.appName}>
              Attend
            </Typography>
          </div>


          </div>

      </header>
    );
  };

  export default HomeHeader;