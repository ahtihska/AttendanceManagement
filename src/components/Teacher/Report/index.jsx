import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AttendanceReport from "./AttendanceReport.jsx";
import DateRangePickerFunc from "./DateRangePickerFunc.jsx";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const useStyles = makeStyles((theme) => ({
  root: {
//     backgroundColor: '#0F1E23',
    minHeight: '100vh',
    color: '#fff',
  },
   bodyContainer1: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      marginLeft : theme.spacing(2),
      marginRight : theme.spacing(3),
      overflowX: 'auto',
      whiteSpace: 'nowrap',


    },
  bodyContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft : theme.spacing(2),
    marginRight : theme.spacing(3),
    marginTop: theme.spacing(4),

  },
  bigBox: {
    width: 'calc(70%)',
    height: '350px',
    backgroundColor: '#fff',
    marginBottom: theme.spacing(2),
    marginLeft : theme.spacing(1),
    borderRadius: '10px',
    overflow: 'auto',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },

  biggestBox: {
    width: 'calc(100%)',
    height: '350px',
    backgroundColor: '#fff',
    marginBottom: theme.spacing(2),
    marginLeft : theme.spacing(1),
    borderRadius: '10px',
    overflow: 'auto',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  regularBox: {
    width: 'calc(28%)',
    height: '350px',
    backgroundColor: '#fff',
    marginBottom: theme.spacing(2),
    marginLeft : theme.spacing(1),
    borderRadius: '10px',
    overflow: 'auto',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },

  notificationContainer:{
     display: 'flex',
         flexDirection: 'column',
         alignItems: 'left',

         fontSize: 11,
         color: 'black',
         overflow: 'hidden',
         paddingTop: theme.spacing(3),
         paddingLeft: '10px',

  },
    chartContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',


    },
  absenteesContainer: {
     display: 'flex',
         flexDirection: 'column',
         alignItems: 'left',

         fontSize: 11,
         color: 'black',
         overflow: 'auto',
         paddingTop: '40px',
         paddingLeft: '10px',
  },
  boxContainer: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    overflow: 'auto'
  },
  name: {
  paddingBottom: 5,
  color: 'pink'
  }

}));

const Report = () => {
  const classes = useStyles();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [section, setSection] = React.useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (event) => {
            setSection(event.target.value);
            console.log('Selected option:', event.target.value);
  };

  const classOptions = [{ class_id: 'X A' }, { class_id: 'X C' }, { class_id: 'X D' }];
  const fetchData = (startDate, endDate, section) => {
    if (section && startDate && endDate) {
      axios
        .get(`http://localhost:8080/api/v1/attendance/studentsbyclass`, {
          params: {
            classId: section,
            startdate: startDate,
            enddate: endDate,
          },
        })
        .then((response) => {
          console.log('Attendance Data:', response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      console.log('Please select a class and date range');
    }
  };

  const handleDateChange = (start, end) => {
      setStartDate(start);
      setEndDate(end);
      fetchData(start, end, section);
  };

  useEffect(() => {
     const notSelectedParams = [];
     if (!startDate) {
       notSelectedParams.push('start date');
     }
     if (!endDate) {
       notSelectedParams.push('end date');
     }
     if (!section) {
       notSelectedParams.push('class');
     }
     setSnackbarMessage(notSelectedParams.length > 0 ? `Please select ${notSelectedParams.join(' and ')}.` : '');
   }, [startDate, endDate, section]);

  useEffect(() => {
     if (snackbarMessage) {
       const timer = setTimeout(() => {
         setSnackbarMessage('');
       }, 5000);
       return () => clearTimeout(timer);
     }
  }, [snackbarMessage]);

  return (
    <div className={classes.root}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                    <DateRangePickerFunc onGetData={fetchData} classId={section} startDateProp={startDate} endDateProp={endDate}
                                            setStartDate={setStartDate} setEndDate={setEndDate} handleDateChange={handleDateChange} />
                </Box>
            <Box sx={{ width:'50%', flex: '1', marginLeft: '900px', marginRight: '100px'}} className={classes.boxContainer}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel className={classes.name}>Class</InputLabel>
                  <Select
                    value={section}
                    onChange={handleChange}
                    label="Class"
                    style={{ backgroundColor: '#fff', color: 'black', minWidth: 150, height: 40, paddingLeft: 8}}
                  >
                    {classOptions.map((option) => (
                      <MenuItem key={option.class_id} value={option.class_id}>
                        {option.class_id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
            </Box>
        </div>
        <div className={classes.bodyContainer}>
            <div className={classes.bigBox}>
                <div className={classes.notificationContainer}>
                     <AttendanceReport type="main" startDate={startDate} endDate={endDate} classId={section}/>
                </div>
            </div>
            <div className={classes.regularBox}>
                <div className={classes.chartContainer}>
                    <AttendanceReport type="pie" startDate={startDate} endDate={endDate} classId={section}/>
                </div>
            </div>
        </div>
        <div className={classes.bodyContainer}>
            <div className={classes.biggestBox}>
                <div className={classes.absenteesContainer}>
                     <AttendanceReport type="low" startDate={startDate} endDate={endDate} classId={section}/>
                </div>
            </div>
        </div>
        <Snackbar open={snackbarMessage !== ''} autoHideDuration={4000} onClose={() => setSnackbarMessage('')}>
                <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbarMessage('')} severity="error">
                  {snackbarMessage}
                </MuiAlert>
              </Snackbar>
    </div>

  );
};

export default Report;
