import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ReactDom from 'react-dom';
import { Button, Box, Grid } from '@mui/material';
import axios from 'axios';
import MaterialTable from 'material-table';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material';
import { Snackbar } from '@material-ui/core';
import Alert from '@mui/material/Alert';


const timeLimitInMinutes = 1;

const useStyles = makeStyles((theme) => ({
  root: {
//     backgroundColor: '#0F1E23',
    color: '#fff',
    padding: theme.spacing(2),
    posotion: 'fixed',
    width: '100%'
  },

  greetings: {

    fontSize: 30,
    fontWeight: 'medium',
    marginBottom: theme.spacing(1),
  },
  message: {
    fontSize: 13,

    fontWeight: 'light',
  },
  bodyContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft : theme.spacing(2),
    marginRight : theme.spacing(3),
  },
  mediumBox: {
    width: 'calc(39%)',
    height: '250px',
    backgroundColor: '#fff',
    marginBottom: theme.spacing(2),
    marginLeft : theme.spacing(1),
    borderRadius: '10px'
  },
  regularBox: {
    width: 'calc(55.33% - 30px)',
    height: '420px',
    backgroundColor: '#fff',
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
    borderRadius: '10px',
    overflow: 'scroll',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

  },
  regBox: {
    width: 'calc(45.33% - 30px)',
    height: '420px',
    backgroundColor: '#fff',
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
    borderRadius: '10px',
    overflow: 'scroll',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  smallBox: {
      width: 'calc(100% - 10px)',
      height: '150px',
      backgroundColor: '#fff',
      marginBottom: theme.spacing(2),
      marginLeft : theme.spacing(1),
      borderRadius: '10px'
    },

    classItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: theme.spacing(2),
      borderBottom: '1px solid #CFCFCF',
      textAlign: 'left',
    },
    className: {
      marginRight: theme.spacing(2),

      fontWeight: 600,
      color: '#000',
      fontSize: 20,
      alignSelf: 'center',
      textAlign: 'right',
    },

  summaryContainer:{
    display: 'flex',
    alignItems: 'center',

    margin: theme.spacing(6),
    marginLeft: theme.spacing(7),
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(175),
  },

  boldContent: {

      fontWeight: 'Bold',

      color: 'black',
    },
  fadedContent:{

      opacity:0.5,
      color: 'black',
  },
  containerStyle :{
    display: 'flex',
    flexDirection: 'column',
  },
  elementStyle :{
    marginBottom: '10px',

    fontSize : 22,
    fontWeight: 'medium',
    margin: theme.spacing(6),
    marginLeft: theme.spacing(7),
    marginTop: theme.spacing(3),
  },
  butticon:{
    marginLeft : theme.spacing(30),
    marginRight: theme.spacing(6),
    marginTop: theme.spacing(-8),
    alignSelf: 'right',
  },
  syles:{
    width: '100px',
    height:'100px',
    overflow: 'scroll'

},
  schoolitem:{
    color: '#ff5722',

  },
  items:{

        fontSize : 20,
        color: 'black',
     marginTop: theme.spacing(1),
  },


}));

const Dashboard = () => {
  const classes = useStyles();
  const defaultMaterialTheme = createTheme();
  const [sentClasses, setSentClasses] = useState([]);
  const [lastSavedDates, setLastSavedDates] = useState({});
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [studentsData, setStudentsData] = useState([]);
  const [post, setPost] = useState(false);
  const [data, setData] = useState(null);
  const [studentid, setStudentid] = useState("");
  const [classIds, setClassIds] = useState([]);
  const [studentNames, setStudentNames] = useState([]);
  const [saveButtonDisabledMap, setSaveButtonDisabledMap] = useState({});
  const [absenteesData, setAbsenteesData] = useState([]);
    const [attendanceSavedForSelectedDay, setAttendanceSavedForSelectedDay] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

 const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setIsSnackbarOpen(false);
    };

    // Rest of the code...
 const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Move the if statement inside the handleChange function
    if (lastSavedDates[selectedValue] && new Date() - lastSavedDates[selectedValue] < timeLimitInMinutes * 60 * 1000) {
      setAttendanceSavedForSelectedDay(true);
    } else {
      setAttendanceSavedForSelectedDay(false);
    }
  };


  useEffect(() => {
    // Fetch classId values from the API when the component mounts
    const TEACHER_EMAIL = 'Dinesh.Kumar@gmail.com';
    axios
      .get(`http://localhost:8086/teachers/emailId/${TEACHER_EMAIL}`)
      .then((response) => {
        const classIdValues = response.data.map((item) => item.classId);
        setClassIds(classIdValues);
      })
      .catch((error) => {
        console.error('Error fetching classIds:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedOption) {
      axios
        .get(`http://localhost:8086/students/classId/${selectedOption}`)
        .then((response) => {
          const initialStudents = response.data.map((student) => ({
            id: student.id,
            firstName: student.firstName,
            lastName: student.lastName,
            Status: true,
          }));
          setStudentsData(initialStudents);
        })
        .catch((error) => {
          console.error('Error fetching student data:', error);
        });
    }
  }, [selectedOption]);

  const handleCheckboxChange = (id) => {
    const updatedStudentsData = studentsData.map((row) =>
      row.id === id ? { ...row, Status: !row.Status } : row
    );
    setStudentsData(updatedStudentsData);

    if (!updatedStudentsData.find((row) => row.id === id).Status) {
      const studentToAdd = updatedStudentsData.find((row) => row.id === id);
      setAbsenteesData((prevData) => [...prevData, studentToAdd]);
    } else {
      setAbsenteesData((prevData) =>
        prevData.filter((student) => student.id !== id)
      );
    }
  };

  const handleAttendanceUpdate = async (newData) => {
      try {
        await axios.put(
          `http://localhost:8080/api/v1/attendance/${selectedOption}/${studentid}`,
          studentsData.filter((student) => student.id === studentid)[0]
        );
        setPost(true);
      } catch (error) {
        console.error('Error updating attendance:', error);
      }
    };



  useEffect(() => {
    handleAttendanceUpdate(studentsData);
  }, [studentsData]);

   const fetchNewData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/attendance/${selectedOption}`, {
          params: {
            Status: false,
          },
        });
        setAbsenteesData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  const columns = [
    { title: 'Roll No', field: 'id', editable: 'never' },
    { title: 'Name', field: 'firstName', editable: 'never' },

    {
      title: 'Status',
      field: 'Status',
      type: 'boolean',
      render: (rowData) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={rowData.Status}
              onChange={() => handleCheckboxChange(rowData.id)}
              style ={{color: '#4150b7'}}
            />
          }
          label=""
        />
      ),
    },
  ];

  const Columns = [
    { title: 'Name', field: 'firstName', editable: 'never' },
    { title: 'Last Name', field: 'lastName', editable: 'never' },
    {
      title: 'Status',
      field: 'Status',
      render:(rowData) => rowData.Status ? "Present" : "Absent"
    },
  ];
  useEffect(() => {
      // Fetch the list of classes for which attendance is already sent
      axios
        .get('http://localhost:8080/api/v1/attendance/')
        .then((response) => {
          const sentClassIds = response.data.map((item) => item.class_id);
          setSentClasses(sentClassIds);

          // Check the last saved date for each class
          const lastSavedDatesMap = {};
          sentClassIds.forEach((classId) => {
            const lastSavedAttendanceForClass = response.data
              .filter((item) => item.class_id === classId)
              .pop();
            if (lastSavedAttendanceForClass) {
              lastSavedDatesMap[classId] = new Date(lastSavedAttendanceForClass.date);
            } else {
              lastSavedDatesMap[classId] = null;
            }
          });
          setLastSavedDates(lastSavedDatesMap);

          // Initialize the disabled state of the "Save" button for each class
          const saveButtonDisabledMap = {};
          sentClassIds.forEach((classId) => {
            saveButtonDisabledMap[classId] = false;
          });
          setSaveButtonDisabledMap(saveButtonDisabledMap);
        })
        .catch((error) => {
          console.error('Error fetching sent classes:', error);
        });
    }, []);


  const handleSave = () => {
      const presentStudentIds = studentsData
        .filter((student) => student.Status)
        .map((student) => student.id);

      const absentStudentIds = studentsData
        .filter((student) => !student.Status)
        .map((student) => student.id);

      const attendanceData = [
        ...presentStudentIds.map((studentId) => ({
          student_id: studentId,
          teacher_id: 5001,
          class_id: selectedOption,
          delegation_id: 5001,
          hours: 8,
          present: true,
          date: new Date().toISOString().slice(0, 10),
        })),
        ...absentStudentIds.map((studentId) => ({
          student_id: studentId,
          teacher_id: 5001,
          class_id: selectedOption,
          delegation_id: 5001,
          hours: 0, // You can adjust this value as needed for absent students
          present: false,
          date: new Date().toISOString().slice(0, 10),
        })),
      ];

      axios
        .post('http://localhost:8080/api/v1/attendance/', attendanceData)
        .then((response) => {
          console.log('Attendance saved:', response.data);
          setIsSnackbarOpen(true);


          setSentClasses((prevSentClasses) => [...prevSentClasses, selectedOption]);

          setLastSavedDates((prevDates) => ({
            ...prevDates,
            [selectedOption]: new Date(),
          }));

          setSaveButtonDisabled(true);
          setTimeout(() => {
            setSaveButtonDisabled(false);
          }, timeLimitInMinutes * 60 * 1000);

          // After saving, fetch the updated data from the server
          fetchNewData();
        })
        .catch((error) => {
          console.error('Error saving attendance:', error);
        });

      setAttendanceSavedForSelectedDay(true);
    };




  useEffect(() => {
    // Fetch the list of classes for which attendance is already sent
    axios
      .get('http://localhost:8080/api/v1/attendance/')
      .then((response) => {
        const sentClassIds = response.data.map((item) => item.class_id);
        setSentClasses(sentClassIds);

        // Check the last saved date for each class
        const lastSavedDatesMap = {};
        sentClassIds.forEach((classId) => {
          const lastSavedAttendanceForClass = response.data
            .filter((item) => item.class_id === classId)
            .pop();
          if (lastSavedAttendanceForClass) {
            lastSavedDatesMap[classId] = new Date(lastSavedAttendanceForClass.date);
          } else {
            lastSavedDatesMap[classId] = null;
          }
        });
        setLastSavedDates(lastSavedDatesMap);

        // Initialize the disabled state of the "Save" button for each class
        const saveButtonDisabledMap = {};
        sentClassIds.forEach((classId) => {
          saveButtonDisabledMap[classId] = false;
        });
        setSaveButtonDisabledMap(saveButtonDisabledMap);

        // Fetch initial attendance data
        if (selectedOption) {
          fetchNewData();
        }
      })
      .catch((error) => {
        console.error('Error fetching sent classes:', error);
      });
  }, [selectedOption]);

   return (
     <div className={classes.root}>
       <div className={classes.bodyContainer}>
         <div className={classes.smallBox}>
           <div className={classes.summaryContainer}>
             <FormControl fullWidth>
             <InputLabel style ={{ width: 150}}id="dropdown-label">Class</InputLabel>
             <Select value={selectedOption} onChange={handleChange}>
               {classIds.map((classId) => (
                 <MenuItem key={classId} value={classId}>
                   {classId}
                 </MenuItem>

               ))}
             </Select>
             </FormControl>
           </div>
         </div>

         <div className={classes.regularBox}>
           <div style={{ width: '100%', height: '100%' }}>
             <ThemeProvider theme={defaultMaterialTheme}>
               <MaterialTable title="Attendance Record" columns={columns} data={studentsData} />
               <Snackbar
                 open={isSnackbarOpen}
                 autoHideDuration={6000}
                 onClose={handleSnackbarClose}
                 anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
               >
                 <Alert onClose={handleSnackbarClose} severity="success" elevation={6} variant="filled" sx={{ backgroundColor: '#4caf50' }}>
                   Attendance Saved Successfully
                 </Alert>
               </Snackbar>
             </ThemeProvider>

           </div>
         </div>

         <div className={classes.regBox}>
           <ThemeProvider theme={defaultMaterialTheme}>
             <MaterialTable
               title="Absentees List"
               columns={Columns}
               data={absenteesData}
             />
           </ThemeProvider>

         </div>
         <Grid container justifyContent= "center">
                    <Button
                                     variant="contained"
                                     color="primary"
                                     onClick={handleSave}
                                     disabled={
                                       saveButtonDisabled ||
                                       sentClasses.includes(selectedOption) ||
                                       attendanceSavedForSelectedDay // Disable the button if attendance has been saved for the selected day
                                     }
                                     style={{
                                       backgroundColor:
                                         saveButtonDisabled ||
                                         sentClasses.includes(selectedOption) ||
                                         attendanceSavedForSelectedDay // Add this condition for the button color
                                           ? 'grey'
                                           : '',
                                     }}
                                   >
                                     Save
                                   </Button>
                                   </Grid>
       </div>
     </div>
   );
 };

 export default Dashboard;
