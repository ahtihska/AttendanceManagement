import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { PieChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1/attendance';


const useStyles = makeStyles((theme) => ({
  root: {
      padding: theme.spacing(2),
  },
  tableContainer: {
      marginTop: theme.spacing(1),
  },
  pieChartContainer: {
      marginTop: theme.spacing(4),
  },
  tileHeadings: {
      fontSize: 20,

      fontWeight: 700,
      color: 'black',
      padding: '10px',
      paddingTop: '5px',
  },
      chartContainer: {
      paddingTop: '15px',
  },
  sideTileHeadings: {

      opacity:0.7,
      color: 'black',
  },
  cornerBox: {

      fontSize: 16,
      fontWeight: 700,
      marginLeft: theme.spacing(100),
      textAlign: 'right',
      marginRight: '20px',
  },
  name: {

      fontWeight: 400,
      color: 'black',
      fontSize : 15,
  },
  attendance: {

      fontWeight: 550,
      color: 'black',
      fontSize: 15,
      opacity: 0.8,
  },
  noOfDays: {

      fontWeight: 550,
      color: 'black',
      fontSize: 15,
      opacity: 0.8,
  },
  days: {

      fontWeight: 700,
      color: '#CDCDCD',
      fontSize : 12,
      opacity:0.7,
  },
}));
const formatDate = (date) => {
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const day = String(date.getDate()).padStart(2, '0');
   return `${year}-${month}-${day}`;
};
   const AttendanceReport = ({ type, startDate, endDate, classId }) => {
      const [attendanceData, setAttendanceData] = useState([]);
      const [totalDays, setTotalDays] = useState(0);

      const fetchData = (startDate, endDate, classId) => {
        if (!classId || !startDate || !endDate) {
          console.log('Please select a class and date range');
          return;
        }

        const apiUrl = `${baseUrl}/studentsbyclass?classId=${classId}&startdate=${formatDate(
          startDate
        )}&enddate=${formatDate(endDate)}`;

        axios
          .get(apiUrl)
          .then((response) => {
            setAttendanceData(response.data);
            setTotalDays(calculateTotalDays(response.data));
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
        });
      };

      useEffect(() => {
        fetchData(startDate, endDate, classId);
      }, [startDate, endDate, classId]);

    const calculateStudentAttendance = (data) => {
      const studentAttendance = {};
      data.forEach((entry) => {
        const { student_id, present } = entry;
        if (!studentAttendance[student_id]) {
          studentAttendance[student_id] = {
            name: `Student ${student_id}`,
            totalDays: 0,
            totalPresentDays: 0,
          };
        }
        studentAttendance[student_id].totalDays++;
        if (present) {
          studentAttendance[student_id].totalPresentDays++;
        }
      });

      Object.values(studentAttendance).forEach((student) => {
          student.attendancePercentage = (student.totalPresentDays / student.totalDays) * 100;
        });

        return Object.values(studentAttendance);
      };

      const calculateTotalDays = (data) => {
        const uniqueDates = new Set(data.map((entry) => entry.date));
        return uniqueDates.size;
    };

    const MainAttendanceTable = ({ studentAttendanceData, totalDays }) => { const classes = useStyles();
  return (
      <div >
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" className={classes.tileHeadings} component="h2">Attendance Report</Typography>
            <Typography className={classes.sideTileHeadings} style={{ marginLeft: '600px' }}>TOTAL DAYS: <b>{totalDays}</b></Typography>
        </div>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableBody>
              {studentAttendanceData.map((student) => (
                <TableRow key={student.name}>
                  <TableCell><Typography className={classes.name}>{student.name}</Typography></TableCell>
                  <TableCell><Typography className={classes.attendance}>{student.attendancePercentage.toFixed(2)}%</Typography></TableCell>
                  <TableCell><Typography className={classes.noOfDays}>{student.totalPresentDays}</Typography></TableCell>
                  <TableCell><Typography className={classes.days}>DAYS</Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  const LowAttendanceTable = ({ studentsWithLowAttendance, totalDays }) => {
    const classes = useStyles();

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" className={classes.tileHeadings} component="h2">Students with Low Attendance</Typography>
            <Typography className={classes.sideTileHeadings} style={{ marginLeft: '900px' }}>TOTAL DAYS: <b>{totalDays}</b></Typography>
        </div>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableBody>
              {studentsWithLowAttendance.map((student) => (
                <TableRow key={student.name}>
                  <TableCell><Typography className={classes.name}>{student.name}</Typography></TableCell>
                  <TableCell><Typography className={classes.attendance}>{student.attendancePercentage.toFixed(2)}%</Typography></TableCell>
                  <TableCell><Typography className={classes.noOfDays}>{student.totalPresentDays}</Typography></TableCell>
                  <TableCell><Typography className={classes.days}>DAYS</Typography></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  const PieChartSection = ({ studentAttendanceData, studentsWithLowAttendance }) => {
    const classes = useStyles();

    const lowAttendancePercentage = Math.round((
        studentsWithLowAttendance.length / studentAttendanceData.length
      ) * 100);
      const normalAttendancePercentage = 100 - lowAttendancePercentage;

      const pieChartData = [
        { id: 0, value: lowAttendancePercentage, label: 'Low', color: '#000000' },
        { id: 1, value: normalAttendancePercentage, label: 'Normal', color: '#4150B7' },
      ];

    return (
      <div className={classes.pieChartContainer}>
        <Typography variant="h6" className={classes.tileHeadings} component="h2">Attendance Overview</Typography>
        <div className={classes.chartContainer}>
            <PieChart
              series={[
                {
                  data: pieChartData.map((item) => ({ ...item, percentage: item.value.toFixed(2) })),
                },
              ]}
              width={400}
              height={200}
              labels={({ datum }) => `${datum.label}: ${datum.percentage}%`}
              colorScale={pieChartData.map((item) => item.color)}
              legendSettings={{ position: 'bottom' }}

            />
        </div>
      </div>
    );
  };


  const studentAttendanceData = calculateStudentAttendance(attendanceData);
  const studentsWithLowAttendance = studentAttendanceData.filter(
    (student) => student.attendancePercentage < 75
  );
    return (
      <React.Fragment>
        {type === 'main' && <MainAttendanceTable studentAttendanceData={studentAttendanceData} totalDays={totalDays} classId={classId}/>}
        {type === 'low' && <LowAttendanceTable studentsWithLowAttendance={studentsWithLowAttendance} totalDays={totalDays} classId={classId}/>}
        {type === 'pie' && (<PieChartSection studentAttendanceData={studentAttendanceData} studentsWithLowAttendance={studentsWithLowAttendance} classId={classId}/>)}
      </React.Fragment>
    );
  };

export default AttendanceReport;