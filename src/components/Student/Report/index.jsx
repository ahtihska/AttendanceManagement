import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { PieChart } from '@mui/x-charts/PieChart';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@mui/material';
import { CalendarToday, ArrowDropDown } from '@mui/icons-material';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import percentagePic from "../../../images/percentagePic.jpeg";
import AttendanceReport from "./AttendanceReport.jsx";
import Box from '@mui/material/Box';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { addDays } from 'date-fns';
import totalPic from '../../../images/total.png';
import absent from '../../../images/absent.png';
import present from '../../../images/present.png';


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
    width: 'calc(65%)',
    height: '400px',
    backgroundColor: '#fff',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(4),
    borderRadius: '10px',
    overflow: 'auto',
    paddingTop: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  bigBox: {
    width: 'calc(55%)',
    height: '350px',
    backgroundColor: '#fff',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
  regularBox: {
    width: 'calc(43%)',
    height: '350px',
    backgroundColor: '#fff',
    marginBottom: theme.spacing(2),
    borderRadius: '10px',
    overflow: 'auto',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
  smallBox: {
    width: 'calc(25% - 10px)',
    height: '150px',
    backgroundColor: '#fff',
    overflow: 'auto',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px'
  },
  summaryContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(6),
    marginLeft: theme.spacing(8),
    marginTop: theme.spacing(6),
  },
  summaryPic: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    borderRadius: '10%',
    marginRight: theme.spacing(2),
  },
  boldContent: {

    fontWeight: 'Bold',
    color: 'black',
  },
  fadedContent: {

    opacity: 0.5,
    color: 'black',
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '350px',
    marginTop: theme.spacing(1)
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
    alignItems: 'left',

    fontSize: 11,
    color: 'black',
    overflow: 'hidden',
    paddingTop: theme.spacing(3),
    paddingLeft: '10px',
  },
  days: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(5),
  },
}));

const DateRangePicker = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDateChange(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateChange(startDate, date);
  };
  const buttonStyle = {
    color: 'black',
    backgroundColor: '#fff',
    fontSize: 13,

    height: '27px',
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px', marginLeft: '10px', fontSize: 18, color: '#4150B7' }}>DATE : </span>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="MMM dd"
          customInput={
            <Button variant="outlined" size="small" style={buttonStyle} startIcon={<CalendarToday />}>
              {startDate ? startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Start Date'}
              <ArrowDropDown style={{ marginLeft: '5px' }} />
            </Button>
          }
        />
        <span style={{ marginRight: '10px', marginLeft: '10px' }}> - </span>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="MMM dd"
          customInput={
            <Button variant="outlined" size="small" style={buttonStyle} startIcon={<CalendarToday />}>
              {endDate ? endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'End Date'}
              <ArrowDropDown style={{ marginLeft: '5px' }} />
            </Button>
          }
        />
      </div>
    </div>
  );
};

const Report = () => {
  const classes = useStyles();
  const [studentName, setStudentName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [classID, setClassID] = useState('');
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [absentDates, setAbsentDates] = useState([]); // State to store dates where present is false
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true); // Track initial render

  useEffect(() => {
    // Set default values to zero after the initial render
    if (isInitialRender) {
      setAttendancePercentage(0);
      setPresentCount(0);
      setAbsentCount(0);
      setTotalCount(0);
      setAbsentDates([]);
      setIsInitialRender(false);
    }
  }, [isInitialRender]);

  useEffect(() => {
    // Fetch student data
    axios
      .get('http://localhost:8086/students/id/1')
      .then((response) => {
        // Same code as before to set studentName, classID, and teacherName
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
        setStudentName('Error fetching data');
      });
  }, []);

  useEffect(() => {
    if (!isInitialRender && startDate && endDate) {
      // Convert startDate and endDate to ISO date strings
      const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = addDays(endDate, 1).toISOString().split('T')[0]; // Add one day to endDate

      axios
        .get(`http://localhost:8080/api/v1/attendance/students?studentId=1&startdate=${formattedStartDate}&enddate=${formattedEndDate}`)
        .then((response) => {
          if (response.data !== null) {
            const attendanceData = response.data;
            const totalDays = attendanceData.length;
            const presentDays = attendanceData.filter((item) => item.present).length;
            const absentDays = totalDays - presentDays;

            // Calculate attendancePercentage
           const calculatedAttendancePercentage = (presentDays / totalDays) * 100;
           const roundedAttendancePercentage = Math.round(calculatedAttendancePercentage);
           setAttendancePercentage(roundedAttendancePercentage);
            // Set presentCount, absentCount, totalCount, and absentDates
            setPresentCount(presentDays);
            setAbsentCount(absentDays);
            setTotalCount(totalDays);
            setAbsentDates(attendanceData.filter((item) => !item.present).map((item) => item.date));
          } else {
            // Reset values if no data found
            setAttendancePercentage(0);
            setPresentCount(0);
            setAbsentCount(0);
            setTotalCount(0);
            setAbsentDates([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching attendance data:', error);
          setAttendancePercentage(0);
          setPresentCount(0);
          setAbsentCount(0);
          setTotalCount(0);
          setAbsentDates([]);
        });
    }
  }, [startDate, endDate]);
      const handleDateChange = (startDate, endDate) => {
         setStartDate(startDate);
         setEndDate(endDate);
       };
       const absentPercentage = 100 - attendancePercentage;
       const roundedAttendancePercentage = Math.round(attendancePercentage);
       const roundedAbsentPercentage = Math.round(absentPercentage);
      const data = [
           { id: 0, value: absentCount, label: `Absent (${roundedAbsentPercentage}%)`, color: '#000000' },
           { id: 1, value: presentCount, label: `Present (${roundedAttendancePercentage}%)`, color: '#4150B7' },
         ];

        const total = data.reduce((sum, item) => sum + item.value, 0);
const AbsentTable = ({ AbsentAttendance, absentDays }) => {
  const classes = useStyles();

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" className={classes.tileHeadings} style={{ flex: 1 }}>
          Absent Days
        </Typography>
        <div style={{ position: 'relative', top: 0, left: '550px', zIndex: 2}}>
          <Typography>Total Days: <b>{absentDays}</b></Typography>
        </div>
      </div>
      <div style={{ maxHeight: '250px', overflowY: 'scroll' }}>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableBody>
              {AbsentAttendance.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography className={classes.name}>Absent Day {index + 1}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography className={classes.name} style={{ marginLeft: '80px' }}>
                      <TableCell><Typography className={classes.name} >{item}</Typography></TableCell>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className={classes.days}>LEAVE</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};


const AttendanceReport = ({ type, absentDates }) => {
  const classes = useStyles();

  return (
    <div>
      {type === 'table' && <AbsentTable AbsentAttendance={absentDates} absentDays={absentDates.length} />}
      {/* Add other conditional rendering based on 'type' prop */}
    </div>
  );
};
      return (
        <div className={classes.root}>
          <div>
            <DateRangePicker onDateChange={handleDateChange} />
          </div>
          <div className={classes.bodyContainer}>
            {/* Other JSX code inside the smallBox container */}
            <div className={classes.smallBox}>
              <div className={classes.summaryContainer}>
                <Avatar
                  src={percentagePic}
                  alt="Percentage Picture"
                  className={classes.summaryPic}
                />
                <div>
                  <Typography variant="h4" className={classes.boldContent} style={{ fontSize: 30 }}>
                    {roundedAttendancePercentage}%
                  </Typography>
                  <Typography variant="body1" className={classes.fadedContent} style={{ fontSize: 11 }}>
                    ATTENDANCE PERCENTAGE
                  </Typography>
                </div>
              </div>
            </div>

            {/* Other JSX code inside the smallBox container */}
            <div className={classes.smallBox}>
              <div className={classes.summaryContainer}>
                <Avatar
                  src={totalPic}
                  alt="Percentage Picture"
                  className={classes.summaryPic}
                />
                <div>
                  <Typography variant="h4" className={classes.boldContent} style={{ fontSize: 30 }}>
                    {totalCount}
                  </Typography>
                  <Typography variant="body1" className={classes.fadedContent} style={{ fontSize: 11 }}>
                    WORKING DAYS
                  </Typography>
                </div>
              </div>
            </div>

            {/* Other JSX code inside the smallBox container */}
            <div className={classes.smallBox}>
              <div className={classes.summaryContainer}>
                <Avatar
                  src={present}
                  alt="Percentage Picture"
                  className={classes.summaryPic}
                />
                <div>
                  <Typography variant="h4" className={classes.boldContent} style={{ fontSize: 30 }}>
                    {presentCount}
                  </Typography>
                  <Typography variant="body1" className={classes.fadedContent} style={{ fontSize: 11 }}>
                    DAYS ATTENDED
                  </Typography>
                </div>
              </div>
            </div>

            {/* Other JSX code inside the smallBox container */}
            <div className={classes.smallBox}>
              <div className={classes.summaryContainer}>
                <Avatar
                  src={absent}
                  alt="Percentage Picture"
                  className={classes.summaryPic}
                />
                <div>
                  <Typography variant="h4" className={classes.boldContent} style={{ fontSize: 30 }}>
                    {absentCount}
                  </Typography>
                  <Typography variant="body1" className={classes.fadedContent} style={{ fontSize: 11 }}>
                    DAYS UNATTENDED
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.bodyContainer}>
            <div className={classes.bigBox}>
              <div className={classes.tableContainer}>
                {/* Your custom table component for Absent days */}
                <AttendanceReport type="table" absentDates={absentDates} />
              </div>
            </div>
            <div className={classes.regularBox}>
              <Typography variant="h6" className={classes.tileHeadings} component="h2">
                Attendance Overview
              </Typography>
              <div className={classes.chartContainer}>
                <PieChart
                  series={[
                    {
                      data: data.map((item) => ({ ...item, percentage: (item.value / total) * 100 })),
                    },
                  ]}
                  width={400}
                  height={200}
                  labels={({ datum }) => `${datum.label}: ${datum.percentage.toFixed(2)}%`}
                  colorScale={data.map((item) => item.color)}
                />
              </div>
            </div>
          </div>
        </div>
      );

    };

    export default Report;