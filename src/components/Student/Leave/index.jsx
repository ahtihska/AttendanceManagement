import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
//     backgroundColor: '#0F1E23',
    minHeight: '100vh',
    color: '#000',
  },
}));

const Leave = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Page for Applying Leave</h1>
      {/* Add your attendance-related components and content here */}
    </div>
  );
};

export default Leave;
