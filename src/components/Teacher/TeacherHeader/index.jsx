

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import logo from "../../../images/logo.png";
import downArrow from "../../../images/downArrow.png";
import axios from 'axios';
import userPic from "../../../images/user.png";
import { BACKEND_URL, TEACHER_EMAIL } from '../config';

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
      bottom: '-36px',
      backgroundColor: '#FFF',
      left: 0,
      opacity: 0,
      transition: 'opacity 0.3s',
    },
    '&:hover::after': {
      opacity: 1,
      backgroundColor: '#FFF',
    },
    '&:hover': {
      color: '#FFF',
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

const TeacherHeader = () => {
const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  const [data, setData] = useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
        // Add the code here to handle the logout process if needed
        // For example, clear user session, log out from the backend, etc.
        // After the logout process is complete, navigate the user to the '/' page
        navigate('/');
      };


       useEffect(() => {
         // Fetch teacher data from the backend
         axios.get('http://localhost:8086/teachers/id/5001')
           .then(response => {
             setTeacherData(response.data);
           })
           .catch(error => {
             console.error('Error fetching teacher data:', error);
           });
       }, []);



             useEffect(() => {
                 const fetchData = async () => {
                   try {
                     const response = await fetch(`${BACKEND_URL}/teachers/emailId/${TEACHER_EMAIL}`);
                     const jsonData = await response.json();
                     setData(jsonData);

                     if (jsonData && jsonData.length > 0) {
                       setFirstName(jsonData[0].firstName);
                       setLastName(jsonData[0].lastName);
                     }
                   } catch (error) {
                     console.error('error fetching data:', error);
                   }
                 };

                 fetchData();
               }, []);
  return (
      <header className="App-header"style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px',  height: '80px' }}>

        <div className={classes.headerContent}>
          <div className={classes.logoContainer}>
            <img src={logo} alt="Logo" className={classes.logo} />
            <Typography variant="h5" className={classes.appName}>
              Attend
            </Typography>
          </div>
          <div className={classes.navButtons}>
            <Button component={Link} to="/TeacherDashboard" className={classes.navButton}>
              Dashboard
            </Button>
            <Button component={Link} to="/Attendance" className={classes.navButton}>
              Attendance
            </Button>
            <Button component={Link} to="/Update" className={classes.navButton}>
              Update
            </Button>
            <Button component={Link} to="/TeacherReport" className={classes.navButton}>
              Report
            </Button>
          </div>
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <input type="text" placeholder="Search" className={classes.searchInput} />
          </div>
          <div className={classes.profileContainer}>
            <Avatar src={userPic} alt="Profile" className={classes.profilePic} />
            <Typography variant="body2" style={{ marginRight: '8px', color: '#fff' }}>
              {firstName} {lastName}
            </Typography>
            <IconButton className={classes.dropdownButton} onClick={handleClick}>
              <img src={downArrow} alt="Dropdown" className={classes.downArrowIcon} />
            </IconButton>
            <Menu
              id="dropdown-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </header>
    );
  };

  export default TeacherHeader;