import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
                     {"id": 1, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-01", "present": true},
                     {"id": 2, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-02", "present": true},
                     {"id": 3, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-03", "present": false},
                     {"id": 4, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-04", "present": true},
                     {"id": 5, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-05", "present": false},
                     {"id": 6, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-06", "present": false},
                     {"id": 7, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-07", "present": true},
                     {"id": 8, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-08", "present": true},
                     {"id": 9, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-09", "present": false},
                     {"id": 10, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-10", "present": true},
                     {"id": 11, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-11", "present": false},
                     {"id": 12, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-12", "present": true},
                     {"id": 13, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-13", "present": false},
                     {"id": 14, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-14", "present": true},
                     {"id": 15, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-15", "present": true},
                     {"id": 16, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-16", "present": true},
                     {"id": 17, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-17", "present": false},
                     {"id": 18, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-18", "present": true},
                     {"id": 19, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-19", "present": false},
                     {"id": 20, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-20", "present": false},
                     {"id": 21, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-21", "present": true},
                     {"id": 22, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-22", "present": true},
                     {"id": 23, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-23", "present": true},
                     {"id": 24, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-24", "present": false},
                     {"id": 25, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-25", "present": true},
                     {"id": 26, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-26", "present": false},
                     {"id": 27, "class_id": "a1", "student_id": 1, "teacher_id": 5001, "date": "2023-07-27", "present": true}
];


const useStyles = makeStyles((theme) => ({
  root: {
      padding: theme.spacing(2),
  },
  tableContainer: {
      marginTop: theme.spacing(1),
  },
  pieChartContainer: {
      marginTop: theme.spacing(1),
  },
  tileHeadings: {
      fontSize: 20,

      fontWeight: 700,
      color: 'black',
      padding: '10px',
      paddingTop: '5px',
  },
      chartContainer: {

  },
  sideTileHeadings: {

      opacity:0.7,
      color: 'black',
  },
  cornerBox: {

      fontSize: 16,
      fontWeight: 700,
      marginLeft: theme.spacing(100),
      textAlign: 'right', // Align the text to the right
      marginRight: '20px',
  },
  name: {

      fontWeight: 400,
      color: 'black',
      fontSize : 15,
  },
  days: {

      fontWeight: 700,
      color: '#CDCDCD',
      fontSize : 12,
      opacity:0.7,
  },
}));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear().toString().substr(-2);
  let suffix = 'th';

  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st';
  } else if (day === 2 || day === 22) {
    suffix = 'nd';
  } else if (day === 3 || day === 23) {
    suffix = 'rd';
  }

  return `${day}${suffix} ${month} ${year}`;
};

const AbsentAttendance = (data) => {
  const absentEntries = [];

  data.forEach((entry) => {
    const { date, present } = entry;
    if (!present) {
      const formattedDate = formatDate(date);
      absentEntries.push(formattedDate);
    }
  });

  return absentEntries;
};

  const AbsentTable = ({ AbsentAttendance, absentDays }) => { const classes = useStyles();
  return (
      <div >
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" className={classes.tileHeadings} style={{ marginLeft: 'calc(5%)' }} component="h2">Absent Days</Typography>
            <Typography className={classes.sideTileHeadings} style={{ marginLeft: 'calc(43%)' }}>TOTAL DAYS: <b>{absentDays}</b></Typography>
        </div>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableBody>
              {AbsentAttendance.map((item, index) => (
                <TableRow key={index}>
                  <TableCell><Typography className={classes.name} style={{ marginLeft: 'calc(15%)' }}>{item}</Typography></TableCell>
                  <TableCell><Typography className={classes.name} style={{ marginLeft: 'calc(80%)' }}>Medical</Typography></TableCell>
                  <TableCell><Typography className={classes.days}>LEAVE</Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  const PieChartSection = ({ Percentage }) => {
    const classes = useStyles();

    const pieChartData = [
      { id: 0, value: 100 - Percentage, label: 'Absent', color: '#000000' },
      { id: 1, value: Percentage, label: 'Present', color: '#4150B7' },
    ];

    return (

        <div>
          <ResponsiveContainer width={550} height={280}>
            <PieChart>
              <Pie
                data={pieChartData.map((item) => ({
                  ...item,
                  percentage: item.value.toFixed(2),
                }))}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${entry.id}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" align="center" verticalAlign="bottom" formatter={(value, entry) => `${value} : ${entry.payload.percentage}            %`}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

    );
  };

  const AttendanceReport = ({ type }) => {
    const AbsentData = AbsentAttendance(sampleData);
    const totalDays = sampleData.length;
    const absentDays = AbsentData.length;
    const presentDays = totalDays - absentDays;
    const Percentage = Math.round((presentDays/totalDays)*100);


    return (
      <React.Fragment>
        {type === 'table' && <AbsentTable AbsentAttendance={AbsentData} absentDays={absentDays} />}
        {type === 'pie' && (<PieChartSection Percentage={Percentage} />)}
        {type === 'absentDays' && absentDays}
        {type === 'totalDays' && totalDays}
        {type === 'presentDays' && presentDays}
        {type === 'Percentage' && Percentage}
      </React.Fragment>
    );
  };

export default AttendanceReport;