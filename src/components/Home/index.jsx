import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  landingPage: {

    backgroundSize: 'contain', // Use 'contain' to fit the entire image within the background area
    backgroundPosition: 'center', // Center the background image
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftSide: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    display: 'flex',
    justifyContent: 'flex-start', // Align the content to the left side
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
  },
  whiteBox: {
    backgroundColor: 'white',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '40vh', // Increase the height of the white box
    width: '400px', // Reduce the width of the white box
  },

  button: {
    backgroundColor: '#000',
    borderRadius: theme.spacing(2),
    color: 'white',
    textTransform: 'none',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiSvgIcon-root': {
      marginLeft: theme.spacing(1),
    },
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.landingPage}>
      <div className={classes.leftSide}>
        <div className={classes.whiteBox}>


          <Typography variant="h4">Welcome to Attendance Management App</Typography>
          <Typography variant="body1">
            Streamline your attendance tracking process and improve student engagement with our user-friendly web application.
          </Typography>
          <Button
            variant="contained"
            className={classes.button}
            endIcon={<ArrowForwardIcon />}
            component={Link} // Use Link component
             to="./StudentDashboard" // Specify the path to the Teacher Dashboard
           >

            Student
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            endIcon={<ArrowForwardIcon />}
            component={Link} // Use Link component
             to="./TeacherDashboard" // Specify the path to the Teacher Dashboard
             >
             Teacher
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
