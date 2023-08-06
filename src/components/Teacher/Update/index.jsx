import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@mui/material';
import { CalendarToday, ArrowDropDown } from '@mui/icons-material';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { MenuItem, FormControl, Select, InputLabel, Grid } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, InputBase } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';

const sampleData = [

       {"id": 1, "class_id": "X A", "student_id": 1, "teacher_id": 5001, "date": "2023-07-01", "present": true, "student_name": "Aarav"},
       {"id": 2, "class_id": "X A", "student_id": 2, "teacher_id": 5001, "date": "2023-07-01", "present": true, "student_name": "Vihaan"},
       {"id": 3, "class_id": "X A", "student_id": 3, "teacher_id": 5001, "date": "2023-07-01", "present": false, "student_name": "Aanya"},
       {"id": 4, "class_id": "X A", "student_id": 4, "teacher_id": 5001, "date": "2023-07-01", "present": true, "student_name": "Ananya"},
       {"id": 5, "class_id": "X A", "student_id": 5, "teacher_id": 5001, "date": "2023-07-01", "present": false, "student_name": "Advait"},
       {"id": 6, "class_id": "X A", "student_id": 6, "teacher_id": 5001, "date": "2023-07-01", "present": false, "student_name": "Ishani"},
       {"id": 7, "class_id": "X A", "student_id": 7, "teacher_id": 5001, "date": "2023-07-01", "present": true, "student_name": "Arnav"},
       {"id": 8, "class_id": "X A", "student_id": 8, "teacher_id": 5001, "date": "2023-07-01", "present": true, "student_name": "Aadhya"},
       {"id": 9, "class_id": "X A", "student_id": 9, "teacher_id": 5001, "date": "2023-07-01", "present": false, "student_name": "Reyansh"},
       {"id": 10, "class_id": "X A", "student_id": 10, "teacher_id": 5001, "date": "2023-07-01", "present": true, "student_name": "Myra"},
       {"id": 11, "class_id": "X B", "student_id": 1, "teacher_id": 5001, "date": "2023-07-01", "present": false, "student_name": "Amit"},
      {"id": 12, "class_id": "X B", "student_id": 2, "teacher_id": 5001, "date": "2023-07-01", "present": true, "student_name": "Vivaan"},
      {"id": 13, "class_id": "X B", "student_id": 3, "teacher_id": 5001, "date": "2023-07-01", "present": false, "student_name": "Anika"},
      {"id": 14, "class_id": "X B", "student_id": 4, "teacher_id": 5001, "date": "2023-07-01", "present": true, "student_name": "Aaradhya"},
      {"id": 15, "class_id": "X B", "student_id": 5, "teacher_id": 5001, "date": "2023-07-01", "present": true, "student_name": "Aditi"},
      {"id": 16, "class_id": "X B", "student_id": 6, "teacher_id": 5001, "date": "2023-07-01", "present": true, "student_name": "Advika"},
      {"id": 17, "class_id": "X B", "student_id": 7, "teacher_id": 5001, "date": "2023-07-01", "present": false, "student_name": "Atharv"},
      {"id": 18, "class_id": "X B", "student_id": 8, "teacher_id": 5001, "date": "2023-07-01", "present": true, "student_name": "Isha"},
      {"id": 19, "class_id": "X B", "student_id": 9, "teacher_id": 5001, "date": "2023-07-01", "present": true, "student_name": "Advaita"},
      {"id": 20, "class_id": "X B", "student_id": 10, "teacher_id": 5001, "date": "2023-07-01", "present": false, "student_name": "Avni"},
      {"id": 21, "class_id": "X A", "student_id": 1, "teacher_id": 5001, "date": "2023-07-02", "present": true, "student_name": "Aarav"},
      {"id": 22, "class_id": "X A", "student_id": 2, "teacher_id": 5001, "date": "2023-07-02", "present": true, "student_name": "Vihaan"},
      {"id": 23, "class_id": "X A", "student_id": 3, "teacher_id": 5001, "date": "2023-07-02", "present": true, "student_name": "Aanya"},
      {"id": 24, "class_id": "X A", "student_id": 4, "teacher_id": 5001, "date": "2023-07-02", "present": false, "student_name": "Ananya"},
      {"id": 25, "class_id": "X A", "student_id": 5, "teacher_id": 5001, "date": "2023-07-02", "present": true, "student_name": "Advait"},
      {"id": 26, "class_id": "X A", "student_id": 6, "teacher_id": 5001, "date": "2023-07-02", "present": false, "student_name": "Ishani"},
      {"id": 27, "class_id": "X A", "student_id": 7, "teacher_id": 5001, "date": "2023-07-02", "present": true, "student_name": "Arnav"},
      {"id": 28, "class_id": "X A", "student_id": 8, "teacher_id": 5001, "date": "2023-07-02", "present": true, "student_name": "Aadhya"},
      {"id": 29, "class_id": "X A", "student_id": 9, "teacher_id": 5001, "date": "2023-07-02", "present": true, "student_name": "Reyansh"},
      {"id": 30, "class_id": "X A", "student_id": 10, "teacher_id": 5001, "date": "2023-07-02", "present": false, "student_name": "Myra"},
      {"id": 31, "class_id": "X B", "student_id": 1, "teacher_id": 5001, "date": "2023-07-02", "present": true, "student_name": "Amit"},
      {"id": 32, "class_id": "X B", "student_id": 2, "teacher_id": 5001, "date": "2023-07-02", "present": false, "student_name": "Vivaan"},
      {"id": 33, "class_id": "X B", "student_id": 3, "teacher_id": 5001, "date": "2023-07-02", "present": true, "student_name": "Anika"},
      {"id": 34, "class_id": "X B", "student_id": 4, "teacher_id": 5001, "date": "2023-07-02", "present": true, "student_name": "Aaradhya"},
      {"id": 35, "class_id": "X B", "student_id": 5, "teacher_id": 5001, "date": "2023-07-02", "present": false, "student_name": "Aditi"},
      {"id": 36, "class_id": "X B", "student_id": 6, "teacher_id": 5001, "date": "2023-07-02", "present": true, "student_name": "Advika"},
      {"id": 37, "class_id": "X B", "student_id": 7, "teacher_id": 5001, "date": "2023-07-02", "present": false, "student_name": "Atharv"},
      {"id": 38, "class_id": "X B", "student_id": 8, "teacher_id": 5001, "date": "2023-07-02", "present": true, "student_name": "Isha"},
      {"id": 39, "class_id": "X B", "student_id": 9, "teacher_id": 5001, "date": "2023-07-02", "present": true, "student_name": "Advaita"},
      {"id": 40, "class_id": "X B", "student_id": 10, "teacher_id": 5001, "date": "2023-07-02", "present": false, "student_name": "Avni"},

];

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#fff',
    padding: theme.spacing(2),
  },
  message: {
    fontSize: 13,

    fontWeight: 'light',
  },
  bodyContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(4),
  },
  dateRangeContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(4),
      marginLeft: theme.spacing(4),
    },
  bigBox: {
      width: 'calc(55%)',
      height: '515px',
      backgroundColor: '#fff',
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(1),
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',

    },
  regularBox: {
    width: 'calc(43%)',
    height: '515px',
    backgroundColor: '#fff',
    marginBottom: theme.spacing(2),
    borderRadius: '10px',
    overflow: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    scrollbarColor: 'transparent transparent',
    '&::-webkit-scrollbar': {
      width: 6,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: 3,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
  },
  message: {
      fontSize: 13,
      color: 'black',

      fontWeight: 'light',
    },
    bodyContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(3),
    },
  smallBox: {
    width: 'calc(25% - 10px)',
    height: '150px',
    backgroundColor: '#fff',
    overflow: 'auto',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px'
  },
  largeBox: {
      width: 'calc(100%)',
      height: '100px',
      backgroundColor: '#fff',
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(1),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  attendanceBox: {
        width: 'calc(100%)',
        height: '100px',
        backgroundColor: '#fff',
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
  boldContent: {

    fontWeight: 'Bold',
    color: 'black',
  },
  fadedContent: {

    opacity: 0.5,
    color: 'black',
  },
  tileHeadings: {
    fontSize: 20,

    fontWeight: 700,
    position: 'absolute',
    color: 'black',
    padding: '20px',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '330px',
    overflow: 'auto',
          scrollbarColor: 'transparent transparent',
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 3,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
  },
  days: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(5),
  },
 dropdown: {
     display: 'flex',
     flexDirection: 'column',
     justifyContent: 'center',
     alignItems: 'center',
     padding: theme.spacing(2),
     backgroundColor: 'white', // Set background color to white
     color: 'black', // Set text color to black
    },
 formControl: {
     minWidth: 150,   // Set the height of the dropdown
     marginLeft: theme.spacing(1),
   },
 teacher: {
     marginTop: theme.spacing(1),
     marginRight: theme.spacing(5),
   },
 selectWrapper: {
     display: 'flex',
     alignItems: 'center',
     height:'27px'
   },
   inputLabel: {
     marginRight: theme.spacing(1),
   },
   button: {
     color: 'black',
     backgroundColor: '#fff',
     fontSize: 13,

     height: '27px',
    },

     searchInputContainer: {
       display: 'flex',
       alignItems: 'center',
       backgroundColor: '#f2f2f2', // Grey background for the search bar
       paddingRight: theme.spacing(1),
       borderRadius: theme.shape.borderRadius,
       '&:hover': {
         backgroundColor: '#e0e0e0', // Darker grey on hover
       },
       marginTop: 'calc(4%)',
       marginRight: 'calc(4%)',

     borderBottom: '1px solid #555', // Underline the placeholder text
     },
  searchContainer: {
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'space-between', // Align items at the ends of the container
     marginBottom: theme.spacing(2),
     borderRadius: theme.shape.borderRadius,
     paddingLeft: theme.spacing(1),
     paddingRight: theme.spacing(1),

   },
   searchInput: {
     flex: 1,
     fontSize: '13px', // Optional: Adjust font size
   },
   searchIcon: {
     color: '#555',
   },

}));

const DateRangePicker = ({ onDateChange }) => {
  const classes = useStyles();
  const [Date, setDate] = useState(null);

  const handleDateChange = (date) => {
    setDate(date);
    onDateChange(date);
  };



  return (
    <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '10px', marginLeft: '10px', fontSize: 18,  color: '#4150B7' }}>DATE : </span>
          <DatePicker
            selected={Date}
            onChange={handleDateChange}
            dateFormat="MMM dd"
            customInput={
              <Button variant="outlined" size="small" className={classes.button} startIcon={<CalendarToday />}>
                {Date ? Date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Date'}
                <ArrowDropDown style={{ marginLeft: '5px' }} />
              </Button>
            }
          />
        </div>

    </div>
  );
};

const AttendanceRecordedTable = ({ sampleData, handleCheckboxChange, date, classId }) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const data = sampleData.filter((record) => record.date === date && record.class_id === classId);;

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter the data based on the search query
  const filteredData = data.filter((record) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const lowerCaseName = record.student_name.toLowerCase();
    const lowerCaseRollNo = record.student_id.toString().toLowerCase();
    return (
      lowerCaseName.startsWith(lowerCaseQuery) ||
      lowerCaseRollNo.startsWith(lowerCaseQuery)
    );
  });

  return (
       <div>
         {/* Search input field */}
         <div className={classes.searchContainer}>
             <h2 style={{ color: 'black', marginLeft: 'calc(5%)', marginTop: 'calc(5%)' }}>Recorded Attendance</h2>
             <div className={classes.searchInputContainer}>
               <SearchIcon className={classes.searchIcon} />
               <InputBase
                 placeholder="Search"
                 className={classes.searchInput}
                 value={searchQuery}
                 onChange={handleSearchInputChange}
               />
             </div>
           </div>


      {/* Table */}
      <TableContainer className={classes.tableContainer} style={{ marginBottom: '16px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Roll No</TableCell>
              <TableCell align="left" style={{ width: '50%' }}>
                Name
              </TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((record) => (
              <TableRow key={record.id}>
                <TableCell align="center">{record.student_id}</TableCell>
                <TableCell align="left">{record.student_name}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    id={`checkbox-${record.id}`}
                    checked={record.present}
                    onChange={(e) => handleCheckboxChange(record.id, e.target.checked)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};



const AbsenteesListTable = ({ sampleData, date, classId}) => {
  const classes = useStyles();
  const data = sampleData.filter((record) => record.date === date && record.class_id === classId);
  return (
    <TableContainer className = {classes.tableContainer} style={{ marginBottom: '16px', }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Roll No</TableCell>
            <TableCell align="center">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id}>
              <TableCell align="center">{record.student_id}</TableCell>
              <TableCell align="center">{record.student_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const UpdatePage = () => {
const classes = useStyles();
const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);



  const handleUpdateButtonClick = () => {
    // Your update logic goes here
    const updatedData = attendanceData.map((record) => {
          const isChecked = record.present; // Check if the record was previously marked as present
          const checkboxElement = document.getElementById(`checkbox-${record.id}`);
          if (checkboxElement) {
            // Get the current checkbox status
            const isChecked = checkboxElement.checked;
            // Update the record's present attribute based on the checkbox status
            return { ...record, present: isChecked };
          }
          return record;
        });

        // Update the attendanceData state with the new data
        setAttendanceData(updatedData);

        console.log("Original Data:");
        console.log(attendanceData);
        // Print the updated data to the console
        console.log("Updated Data:");
        console.log(updatedData);
    // After the update is successful, show the snackbar
    setIsSnackbarOpen(true);
  };


  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };
const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState('');

  const formatSelectedDate = (date) => {
      return date ? format(date, 'yyyy-MM-dd') : ''; // Returns formatted date or an empty string if date is null
    };

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Function to handle class dropdown change
  const handleChange = (event) => {
    setSelectedClassId(event.target.value);
  };

  const [attendanceData, setAttendanceData] = useState(sampleData);
    const [absenteesData, setAbsenteesData] = useState(
      sampleData.filter((record) => !record.present)
    );

    const handleCheckboxChange = (id, isChecked) => {
      setAttendanceData((prevData) =>
        prevData.map((record) =>
          record.id === id ? { ...record, present: isChecked } : record
        )
      );
    };

    useEffect(() => {
      setAbsenteesData(attendanceData.filter((record) => !record.present));
    }, [attendanceData]);


     return (
        <div className={classes.root}>
              <div className={classes.largeBox}>
                {/* Left side - DateRangePicker */}
                <DateRangePicker onDateChange={handleDateChange} />


                {/* Right side - Dropdown */}
                <div className={classes.selectWrapper} style = {{marginRight : '20px'}}>
                  <InputLabel className={classes.inputLabel} htmlFor="class-dropdown">
                      <span style={{ marginRight: '10px', marginLeft: '10px', fontSize: 18, color: '#4150B7' }}>CLASS : </span>
                    </InputLabel>
                    <FormControl className={classes.formControl}>
                      <Select
                        value={selectedClassId}
                        onChange={handleChange}
                        inputProps={{ name: 'class', id: 'class-dropdown' }}
                        displayEmpty // Set displayEmpty prop to show placeholder text
                      >
                        <MenuItem value="">
                          <em>Select</em> {/* Placeholder text */}
                        </MenuItem>
                        <MenuItem value="X A">X A</MenuItem>
                        <MenuItem value="X B">X B</MenuItem>
                      </Select>
                    </FormControl>
                </div>
              </div>
              <div className={classes.bodyContainer}>
                  <div className = {classes.bigBox}>
                    <div>
                        <AttendanceRecordedTable
                              sampleData={attendanceData}
                              handleCheckboxChange={handleCheckboxChange}
                              date={formatSelectedDate(selectedDate)}
                              classId={selectedClassId}
                            />
                      </div>

                        <div style={{ textAlign: 'right', padding: '16px', marginRight: 'calc(4%)' }}>
                          <Button variant="contained" color="primary" onClick={handleUpdateButtonClick} disabled={formatSelectedDate(selectedDate) === '' || selectedClassId === ''}>
                            Update
                          </Button>
                        </div>

                  </div>
                  <div className = {classes.regularBox}>
                        <div>
                            <h2 style={{color: 'black', marginLeft: "calc(6.5%)", marginTop:"calc(6.5%)", marginBottom:'calc(5.4%)'}}>Absentees List</h2>
                            <AbsenteesListTable
                              sampleData={absenteesData}
                              date={formatSelectedDate(selectedDate)}
                              classId={selectedClassId}
                            />
                        </div>
                  </div>
              </div>


            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              >
                <MuiAlert onClose={handleCloseSnackbar} severity="primary" elevation={6} variant="filled">
                  Updated Successfully !!
                </MuiAlert>
            </Snackbar>
            </div>

          );
    };

export default UpdatePage;