import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Button, Box, Grid } from "@mui/material";
import DatePicker from "react-datepicker"; // Import the date picker
//import 'react-datepicker/dist/react-datepicker.css'; // Import the date picker styles
import { DesktopDatePicker } from "@mui/lab";
import { Snackbar } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { DateRangePicker } from "react-date-range";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { BACKEND_URL, STUDENT_EMAIL } from '../config';


const useStyles = makeStyles((theme) => ({
  root: {
    //     backgroundColor: '#0F1E23',
    minHeight: "100vh",
    color: "#000",
  },

  bodyContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
  },
  datePicker: {
    marginBottom: theme.spacing(2),
  },
  smallBox: {
    width: "calc(33.33% - 30px)",
    height: "380px",
    backgroundColor: "#fff",
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(45),
    borderRadius: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "scroll",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  regBox: {
    width: "calc(55.33% - 30px)",
    height: "409px",
    backgroundColor: "#fff",
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
    borderRadius: "10px",

    // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  regularBox: {
    width: "calc(45.33% - 30px)",
    height: "409px",
    backgroundColor: "#fff",
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
    borderRadius: "10px",
    overflow: "scroll",
    //boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  summaryContainer: {
    display: "flex",
    alignItems: "center",

    margin: theme.spacing(6),
    marginLeft: theme.spacing(7),
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(175),
  },

  profileContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(4),
  },
  profilePic: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    borderRadius: "50%",
    marginRight: theme.spacing(2),
  },
  teacher: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(5),
  },
  greetings: {

    color: "black", // Set the font color to black
    fontSize: 30,
    fontWeight: "medium",
    marginBottom: theme.spacing(1),
  },

  message: {
    fontSize: 13,
    color: "black",

    fontWeight: "light",
  },
  boldContent: {

    fontWeight: "Bold",
    color: "black",
  },
  fadedContent: {

    opacity: 0.5,
    color: "black",
  },

  tileHeadings: {
    fontSize: 20,

    fontWeight: 700,
    position: "absolute",
    color: "black",
    padding: "20px",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(4),
  },
  heading: {

    fontWeight: "Bold",
    color: "black",
    fontSize: 26,
    marginBottom: theme.spacing(2),
  },
}));

const Leave = () => {
  const classes = useStyles();
  const defaultMaterialTheme = createTheme();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [classname, setClassname] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [loadedLeaves, setLoadedLeaves] = useState([]);

  const [formData, setFormData] = useState({
    student_id: "",
    type: "",
    application_date: new Date().toISOString().slice(0, 10),
    start_date: null,
    end_date: null,
  });
  //const [selectedDate, setSelectedDate] = React.useState(null);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };

  useEffect(() => {
    //Fetch student data
    axios
      .get(`${BACKEND_URL}/students/emailId/${STUDENT_EMAIL}`)
      .then((response) => {
        if (response.data) {
         setStudentName(response.data.first_name);
         setClassname(response.data.class_id);

         const teacherId = response.data.teacher_id;

           //Fetch teacher data using teacherId from student data
         axios
            .get(`${BACKEND_URL}/teachers/id/${teacherId}`)
            .then((teacherResponse) => {
             if (teacherResponse.data && teacherResponse.data.length > 0) {
                const teacherData = teacherResponse.data[0]; // Select the first teacher from the response array
                const { first_name, last_name } = teacherData;
                setTeacherName(`${first_name} ${last_name}`);
             } else {
                setTeacherName('No Teacher Found');
              }
            })
            .catch((error) => {
              console.error('Error fetching teacher data:', error);
              setTeacherName('Error fetching data');
          });
       } else {
         setStudentName('No Student Found');
        }
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
        setStudentName('Error fetching data');
     });
   }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/leave")
      .then((response) => {
        setLoadedLeaves(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leaves data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateRangeChange = (ranges) => {
    const { start_date, end_date } = ranges.dateRange;
    setFormData((prevData) => ({ ...prevData, start_date, end_date }));
  };

  const handleSubmit = () => {
    const { student_id, type, application_date, start_date, end_date } =
      formData;
    const leaveData = {
      student_id,
      type,
      application_date,
      start_date,
      end_date,
    };

    axios
      .post("http://localhost:8080/api/v1/leave", leaveData)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        setIsSnackbarOpen(true);

        // Update the list of applied leaves with the new leave
        setLoadedLeaves([...loadedLeaves, leaveData]);

        // Reset the form data after submission
        setFormData({
          rollNumber: "",
          type: "",
          start_date: null,
          end_date: null,
        });
        window.location.reload();
      })

      .catch((error) => {
        console.error("Failed to save data:", error);
      });
  };


  return (
    <div className={classes.root}>
      <div className={classes.bodyContainer}>
        <Grid container justify="space-between">
          <Grid item>
            <div
              style={{
                position: "absolute",
                top: 120,
                left: 30,
                textAlign: "left",
              }}
            >
              <Typography variant="h4" className={classes.greetings}>
                Hey {studentName}!
              </Typography>
            </div>
            <div
              style={{
                position: "absolute",
                top: 30,
                right: 60,
                textAlign: "right",
              }}
            >
              <Typography
                variant="body1"
                className={classes.message}
                style={{ fontSize: 18, marginTop: "90px" }}
              >
                Assigned to:{" "}
                <span style={{ color: "#4150B7", textDecoration: "underline" }}>
                  {teacherName}
                </span>
              </Typography>
              <Typography
                variant="body1"
                className={classes.message}
                style={{ fontSize: 18, marginBottom: "30px" }}
              >
                Class:{" "}
                <span style={{ color: "#4150B7", textDecoration: "underline" }}>
                  {classname}
                </span>
              </Typography>
            </div>
          </Grid>
        </Grid>

        <div className={classes.regBox}>
          <Typography
            variant="h5"
            className={classes.boxHeading}
            style={{

              fontWeight: 600,
              fontSize: 22,
              marginBottom: "20px",
              color: "#000",
            }}
          >
            Leave Application
          </Typography>
          <div>
            <div style={{ display: "flex", marginBottom: "16px" }}>
              <div style={{ marginRight: "66px" }}>
                <label htmlFor="startDate">Start Date:  </label>
                <input
                  type="date"
                  id="startDate"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>
              <div>
                <label htmlFor="endDate">End Date:  </label>
                <input
                  type="date"
                  id="endDate"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>
            </div>

            <TextField
              fullWidth
              style={{ marginBottom: "16px" }} // Add space after each field
              id="outlined-basic"
              label="Roll No"
              variant="outlined"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              style={{ marginBottom: "16px" }} // Add space after each field
              select
              label="Type of Leave"
              variant="outlined"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <MenuItem value="MEDICAL">Medical Leave</MenuItem>
              <MenuItem value="PERSONAL">Personal Leave</MenuItem>
              <MenuItem value="VACATION">Vacation Leave</MenuItem>
            </TextField>

            <TextField
              multiline
              rows={7}
              variant="outlined"
              label="Reason For Applying Leave"
              fullWidth
              style={{ marginBottom: "16px" }} // Add space after each field
            />
          </div>
        </div>

        <div className={classes.regularBox}>
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              title=<Typography
                variant="h5"
                className={classes.boxHeading}
                style={{

                  fontWeight: 600,
                  fontSize: 22,
                  marginBottom: "20px",
                  color: "#000",
                }}
              >
                Applied Leaves
              </Typography>
              columns={[
                { title: "Type", field: "type",headerStyle: { fontWeight: 'bold' } },
                { title: "Start Date", field: "start_date" ,headerStyle: { fontWeight: 'bold' }},
                { title: "End Date", field: "end_date",headerStyle: { fontWeight: 'bold' } },
              ]}
              data={loadedLeaves}
              options={{
                pageSize: 10,
                sorting: true,
              }}
            />
          </ThemeProvider>
        </div>
      </div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          elevation={6}
          variant="filled"
          sx={{ backgroundColor: "#4caf50" }}
        >
          Leave Application Submitted
        </Alert>
      </Snackbar>

      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Apply
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Leave;

