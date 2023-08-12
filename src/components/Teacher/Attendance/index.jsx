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
import { BACKEND_URL, TEACHER_EMAIL } from '../config';
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

    fontWeight: 'Bold',
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
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Set the initial date to today's date
    setSelectedDate(new Date());
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px', marginLeft: '10px', fontSize: 18,  color: '#4150B7' }}>DATE : </span>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMM dd"
          customInput={
            <Button variant="outlined" size="small" className={classes.button} startIcon={<CalendarToday />}>
              {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Date'}
              <ArrowDropDown style={{ marginLeft: '5px' }} />
            </Button>
          }
        />
      </div>
    </div>
  );
};

const RecordAttendanceTable = ({ stuData, handleCheckboxChange, filterData }) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const data = stuData;
  console.log(stuData);
  console.log(filterData)
  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter the data based on the search query
 const filteredData = data.filter((record) => {
   const lowerCaseQuery = searchQuery.toLowerCase();
   const lowerCaseName = `${record.first_name} ${record.last_name}`.toLowerCase();
   const lowerCaseRollNo = String(record.student_id); // Convert to string to use startsWith

   return (
     lowerCaseName.startsWith(lowerCaseQuery) ||
     lowerCaseRollNo.startsWith(lowerCaseQuery)
   );
 });

  return (
       <div>
         {/* Search input field */}
         <div className={classes.searchContainer}>
             <h2 style={{ color: 'black', marginLeft: 'calc(5%)', marginTop: 'calc(5%)' }}>Record Attendance</h2>
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
               <TableCell align="center" style={{ width: '25%' }}>
                 Roll No
               </TableCell>
               <TableCell align="left" style={{ width: '50%' }}>
                 Student Name
               </TableCell>
               <TableCell align="center" style={{ width: '25%' }}>
                 Status
               </TableCell>
             </TableRow>
          </TableHead>
          <TableBody>
                {filteredData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell align="center" style={{ width: '25%' }}>
                      {record.rollNo}
                    </TableCell>
                    <TableCell align="left" style={{ width: '50%' }}>
                      {`${record.first_name} ${record.last_name}`}
                    </TableCell>
                    <TableCell align="center" style={{ width: '25%' }}>
                      {!filterData.includes(Number(record.id)) ? (
                        <Checkbox
                          id={`checkbox-${record.id}`}
                          checked={record.present}
                          onChange={(e) => handleCheckboxChange(record.id, e.target.checked)}
                        />
                      ) : (
                         <Typography variant="h2" className={classes.fadedContent} style={{ fontSize: 16 }}>
                           ABSENT
                         </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    </div>
  );
};



const RecordAbsentees = ({ stuData}) => {
  const classes = useStyles();
   const data = stuData;
  return (
    <TableContainer className = {classes.tableContainer} style={{ marginBottom: '16px', }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ width: '50%' }}>Roll No</TableCell>
            <TableCell align="center" style={{ width: '50%' }}>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id}>
              <TableCell align="center" style={{ width: '50%' }}>{record.rollNo}</TableCell>
              <TableCell align="center" style={{ width: '50%' }}>{`${record.first_name} ${record.last_name}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const AttendanceRecordedTable = ({ attendanceData,stuData, handleCheck}) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const data = [...attendanceData].sort((a, b) => a.student_id - b.student_id).map((record) => {
      const studentId = Number(record.student_id);
        // Find the student info using student_id
        const studentInfo = stuData.find((student) => Number(student.id) === studentId);

        if (studentInfo) {
          // If student info is found, merge attributes
          return {
            ...record,
            first_name: studentInfo.first_name,
            last_name: studentInfo.last_name,
            rollNo: studentInfo.rollNo,
          };
        }

      return record;
    });
 console.log(data)
  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

 const filteredData = data.filter((record) => {
   const lowerCaseQuery = searchQuery.toLowerCase();
   const lowerCaseName = `${record.first_name} ${record.last_name}`.toLowerCase();
   const lowerCaseRollNo = String(record.student_id); // Convert to string to use startsWith

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
            <TableCell align="center" style={{ width: '25%' }}>
              Roll No
            </TableCell>
            <TableCell align="left" style={{ width: '50%' }}>
              Student Name
            </TableCell>
            <TableCell align="center" style={{ width: '25%' }}>
              Status
            </TableCell>
          </TableRow>
       </TableHead>
       <TableBody>
             {filteredData.map((record) => (
               <TableRow key={record.id}>
                 <TableCell align="center" style={{ width: '25%' }}>
                   {record.rollNo}
                 </TableCell>
                 <TableCell align="left" style={{ width: '50%' }}>
                   {`${record.first_name} ${record.last_name}`}
                 </TableCell>
                 <TableCell align="center" style={{ width: '25%' }}>
                   {record.leave_id === null ? (
                     <Checkbox
                       id={`checkbox-${record.id}`}
                       checked={record.present}
                       onChange={(e) => handleCheck(record.id, e.target.checked)}
                     />
                   ) : (
                     <Typography variant="h2" className={classes.fadedContent} style={{ fontSize: 16 }}>
                         ABSENT
                      </Typography>
                   )}
                 </TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
    </div>
  );
};



const AbsenteesRecorded = ({ attendanceData, stuData}) => {
  const classes = useStyles();
  const data = [...attendanceData].sort((a, b) => a.student_id - b.student_id).map((record) => {
        const studentId = Number(record.student_id);
        // Find the student info using student_id
        const studentInfo = stuData.find((student) => Number(student.id) === studentId);

        if (studentInfo) {
          return {
            ...record,
            first_name: studentInfo.first_name,
            last_name: studentInfo.last_name,
            rollNo: studentInfo.rollNo,
          };
        }

        return record;
      });
  return (
    <TableContainer className = {classes.tableContainer} style={{ marginBottom: '16px', }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ width: '50%' }}>Roll No</TableCell>
            <TableCell align="center" style={{ width: '50%' }}>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id}>
              <TableCell align="center" style={{ width: '50%' }}>{record.rollNo}</TableCell>
              <TableCell align="center" style={{ width: '50%' }}>{`${record.first_name} ${record.last_name}`}</TableCell>
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
   const [snackbarMessage, setSnackbarMessage] = useState('');

    // Function to open the Snackbar with a custom message
    const showSnackbar = (message) => {
      setSnackbarMessage(message);
      setIsSnackbarOpen(true);
    };

  const handleUpdateButtonClick = async () => {
     // Create a copy of the attendanceData array to work with
     const updatedData = attendanceData.map((record) => {
       const checkboxElement = document.getElementById(`checkbox-${record.id}`);
       if (checkboxElement) {
         const isChecked = checkboxElement.checked;
         return { ...record, present: isChecked };
       }
       return record;
     });

     // Update the attendanceData state with the new data
     setAttendanceData(updatedData);
     console.log(updatedData);


     try {
       // Send a PUT request using axios
       const response = await axios.put('http://localhost:8080/api/v1/attendance/', updatedData);

       if (response.status === 200) {
         console.log('Update successful');
         // After the update is successful, show the snackbar
         showSnackbar('Updated Successfully!!');
       } else {
         console.log('Update failed');
         // Handle error scenario here
       }
       setTimeout(() => {
               window.location.reload();
             }, 1500);
     } catch (error) {
       console.error('Error updating data:', error);
       // Handle error scenario here
     }
   };

  const handleSaveButtonClick = async () => {
    try {
      // Create new records for each student in stuData
      const newRecords = stuData.filter((student) => !filteredData.includes(Number(student.id)))
              .map((student) => {
                const studentId = student.id;
                const checkboxId = `checkbox-${studentId}`;
                const checkboxElement = document.getElementById(checkboxId);
                const isChecked = checkboxElement ? checkboxElement.checked : false;
                const date = formatSelectedDate(selectedDate);

                const newRecord = {
                  student_id: studentId,
                  class_id: selectedClassId,
                  teacher_id: student.teacherId,
                  date: date,
                  present: isChecked,
                };
                return newRecord;
              });

      // Make an API call to post the new records
      const apiUrl = 'http://localhost:8080/api/v1/attendance/';
      await axios.post(apiUrl, newRecords);

      // After the update is successful, show the snackbar
      showSnackbar('Saved Successfully!!');

      // Refresh the page
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error saving attendance:', error);
      // Handle error and show appropriate message to the user
    }
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [classIds, setClassIds] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const handleChange = (event) => {
        setSelectedClassId(event.target.value);
      };
    const formatSelectedDate = (date) => {
          return date ? format(date, 'yyyy-MM-dd') : ''; // Returns formatted date or an empty string if date is null
        };

      // Function to handle date change
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

  useEffect(() => {
      // Fetch classId values from the API when the component mounts
      axios
        .get(`${BACKEND_URL}/teachers/emailId/${TEACHER_EMAIL}`)
        .then((response) => {
          const classIdValues = response.data.map((item) => item.class_id);
          setClassIds(classIdValues);
        })
        .catch((error) => {
          console.error('Error fetching classIds:', error);
        });
    }, []);

  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
      useEffect(() => {
          async function fetchAttendanceData() {
            try {
              const response = await axios.get(`http://localhost:8080/api/v1/attendance/update?classId=${selectedClassId}&date=${formatSelectedDate(selectedDate)}`);
              const adata = response.data;
              const initialStudents = [...adata].sort((a, b) => a.id - b.id);
              const StudentIds = adata.map((student) =>Number(student.student_id));
              setFilteredData(StudentIds);
              setAttendanceData(initialStudents);
            } catch (error) {
              console.error('Error fetching attendance data:', error);
            }
          }

          if (selectedClassId && formatSelectedDate(selectedDate)) {
            fetchAttendanceData();
          }
        }, [selectedClassId, selectedDate]);

  const [stuData, setStuData] = useState([]);

        useEffect(() => {
          async function fetchStudentData() {
            try {
              const response = await axios.get(`http://localhost:8080/students/classId/${selectedClassId}`);
              const sdata = response.data;
              const initialStudents = [...sdata].sort((a, b) => a.id - b.id).map((student, index) => ({
                ...student,
                rollNo: index + 1,
                student_id: student.id,
                present: filteredData.includes(Number(student.id)) ? false : true,
              }));

              setStuData(initialStudents);
            } catch (error) {
              console.error('Error fetching student data:', error);
            }
          }

          if (selectedClassId) {
            fetchStudentData();
          }
        }, [selectedClassId, filteredData]);


// This code is to handle todays date attendance absentees(saved)
     const [absentees, setAbsentees] = useState(
          stuData.filter((record) => !record.present)
        );

       const handleCheckboxChange = (id, isChecked) => {
           setStuData(prevData =>
             prevData.map(record =>
               record.id === id ? { ...record, present: isChecked } : record
             )
           );

       };
        useEffect(() => {
          async function updateAbsentees() {
            try {
              const newAbsentees = await stuData.filter((record) => !record.present);
              setAbsentees(newAbsentees);
            } catch (error) {
              console.error('Error updating absentees:', error);
            }
          }

          updateAbsentees();
        }, [stuData]);


        // This code is to handle absentees of update page
           const [absenteesData, setAbsenteesData] = useState(
             attendanceData.filter((record) => !record.present)
           );

           const handleCheck = (id, isChecked) => {
              setAttendanceData(prevData =>
                 prevData.map(record =>
                   record.id === id ? { ...record, present: isChecked } : record
                 )
               );
           };

          useEffect(() => {
            async function updateAbsenteesData() {
              try {
                const newAbsenteesData = await attendanceData.filter((record) => !record.present);
                setAbsenteesData(newAbsenteesData);
              } catch (error) {
                console.error('Error updating absentees data:', error);
              }
            }

            updateAbsenteesData();
          }, [attendanceData]);

     return (
         <div className={classes.root}>
           <div className={classes.largeBox}>
             {/* Left side - DateRangePicker */}
             <DateRangePicker onDateChange={handleDateChange} />
             <div className={classes.selectWrapper} style={{ marginRight: '20px' }}>
               <InputLabel className={classes.inputLabel} htmlFor="class-dropdown">
                 <span style={{ marginRight: '10px', marginLeft: '10px', fontSize: 18,  color: '#4150B7' }}>
                   CLASS :
                 </span>
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
                   {classIds.map((classId) => (
                     <MenuItem key={classId} value={classId}>

                       {classId}
                     </MenuItem>
                   ))}
                 </Select>
               </FormControl>
             </div>
           </div>
           {console.log("fil ", filteredData)}
           {console.log("stu ", stuData)}
           {filteredData.length !== stuData.length ? (
           <>
             <div className={classes.bodyContainer}>
               <div className={classes.bigBox}>
                 <div>
                   <RecordAttendanceTable stuData={stuData} handleCheckboxChange={handleCheckboxChange} filterData = {filteredData} />
                 </div>

                 <div style={{ textAlign: 'right', padding: '16px', marginRight: 'calc(4%)' }}>
                   <Button variant="contained" color="primary" onClick={handleSaveButtonClick} disabled={selectedClassId === ''}>
                     Save
                   </Button>
                 </div>
               </div>

                <div className={classes.regularBox}>
                  <div>
                    <h2 style={{ color: 'black', marginLeft: 'calc(6.5%)', marginTop: 'calc(6.5%)', marginBottom: 'calc(5.4%)' }}>Absentees List</h2>
                      <RecordAbsentees stuData={absentees}/>
                  </div>
                </div>
              </div>
             </>
             ) : (
               // Show this content when filteredData is not empty
               <>
               <div className={classes.bodyContainer}>
                   <div className={classes.bigBox}>
                     <div>
                       <AttendanceRecordedTable
                         attendanceData={attendanceData}
                         stuData={stuData}
                         handleCheck={handleCheck}
                       />
                     </div>

                     <div style={{ textAlign: 'right', padding: '16px', marginRight: 'calc(4%)' }}>
                       <Button variant="contained" color="primary" onClick={handleUpdateButtonClick} disabled={formatSelectedDate(selectedDate) === '' || selectedClassId === ''}>
                         Update
                       </Button>
                     </div>
                    </div>
                   <div className={classes.regularBox}>
                     <div>
                       <h2 style={{ color: 'black', marginLeft: 'calc(6.5%)', marginTop: 'calc(6.5%)', marginBottom: 'calc(5.4%)' }}>Absentees List</h2>
                         <AbsenteesRecorded attendanceData={absenteesData} stuData = {stuData}/>
                     </div>
                   </div>
                   </div>
                  </>
             )}
             <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={() => setIsSnackbarOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                 <MuiAlert onClose={() => setIsSnackbarOpen(false)} severity="success" elevation={6} variant="filled">
                   {snackbarMessage}
                 </MuiAlert>
               </Snackbar>

         </div>
       );
     };


export default UpdatePage;