import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import classIcon from "../../../images/classicon.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import userPic from '../../../images/user.png';
import { useEffect} from 'react';
import presentation from '../../../images/presentation.png'
import teachernotification from '../../../images/teachernotification.png'
import { BACKEND_URL, TEACHER_EMAIL } from '../config'; // Import the BACKEND_URL and TEACHER_EMAIL from the config.js file


const useStyles = makeStyles((theme) => ({
  root: {
//     backgroundColor: '#0F1E23',
    color: '#fff',
    padding: theme.spacing(2),
  },
   profileContainer: {
     display: 'flex',
     alignItems: 'center',
     marginBottom: theme.spacing(4),
     marginLeft: theme.spacing(4),
   },
   profilePic: {
     width: theme.spacing(8),
     height: theme.spacing(8),
     borderRadius: '50%',
     marginRight: theme.spacing(2),
   },
  greetings: {
    color:'black',

    fontSize: 30,
    fontWeight: 'medium',
    marginBottom: theme.spacing(1),
  },
  message: {
    fontSize: 13,
    color: 'black',

    fontWeight: 'light',
  },
  bodyContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bigBox: {
    position: 'relative',
    width: 'calc(33.33% - 20px)', // Adjust the width to fit three boxes in one row with spacing
    height: '400px', // Adjust the height as needed
    backgroundColor: '#fff',
    marginBottom: theme.spacing(4),
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  boxHeading: {
    position: 'sticky',
    top: 0,
    margin: '8px',
    padding: '0 8px',

    fontWeight: 500,
    color: '#000',
    zIndex: 1,
  },

  regularBox: {
    position: 'relative',
    width: 'calc(33.33% - 20px)', // Adjust the width to fit three boxes in one row with spacing
    height: '400px', // Adjust the height as needed
    backgroundColor: '#fff',
    marginBottom: theme.spacing(4),
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  today: {
    backgroundColor: '#000',
    color: '#fff',
  },
  classItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    borderBottom: '1px solid #CFCFCF',
    textAlign: 'left',

  },
  classIcon: {
    width: '60px !important',
    height: '60px !important',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },


  className: {
    marginRight: theme.spacing(2),

    fontWeight: 600,
    color: '#000',
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'right',
  },
  classDate: {
    marginLeft: 'auto',

    color: '#ccc',
    textAlign: 'right',
  },
  classSubstituted: {
    marginRight: theme.spacing(2),

    color: '#ccc',
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  classTotal: {
    marginLeft: 'auto',
    alignSelf: 'flex-end',
    color: '#777',
    fontSize: '0.9rem',
    textAlign: 'right',
  },
  separator: {
    borderTop: '1px solid #777',
    marginTop: theme.spacing(2),
  },
  boxContent: {
    height: 'calc(100% - 40px)',
    overflow: 'auto',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  scrollContainer: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),
    maxHeight: '100%',
  },
  notificationBox: {
    height: 'calc(100% - 40px)',
    overflow: 'auto',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  notificationItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderBottom: '1px solid #CFCFCF',
  },
  notificationProfilePic: {
    width: '40px !important',
    height: '40px !important',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  notificationContent: {
    flex: 1,
    marginRight: theme.spacing(2),
    color: '#000',
  },
  calenderContainer: {
    width: '100%',
    height: 'calc(100% - 60px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  approveIcon: {
    color: '#F47458',
    marginRight: theme.spacing(1),
  },
  declineIcon: {
    color: '#000',
    marginRight: theme.spacing(1),
  },
}));




const Dashboard = () => {
  const classes = useStyles();
  const currentDate = new Date();
  const tileClassName = ({ date }) => {
    if (date.toDateString() === currentDate.toDateString()) {
      return `${classes.today} react-calendar__tile--today`;
    }
    return '';
  };



  const [notificationsData, setNotificationsData] = useState([
    {
      id: 1,
      type: 'request',
      sender: 'John Doe',
      date: '2023-07-17',
      message: 'Can you substitute for me?',
      approved: false,
      declined: false,
    },
    {
      id: 2,
      type: 'request',
      sender: 'Jane Smith',
      date: '2023-07-16',
      message: 'Need a substitute for tomorrow.',
      approved: false,
      declined: false,
    },
    {
      id: 3,
      type: 'approval',
      sender: 'Ram Kal',
      date: '2023-07-15',
      message: 'Accepted your request for substitution.',
      approved: true,
      declined: false,
    },
    {
      id: 4,
      type: 'leave',
      sender: 'Alice Johnson',
      date: '2023-07-14',
      message: 'Applying for a leave.',
      approved: false,
      declined: false,
    },
  ]);

const handleApprove = (notificationId) => {
  confirmAlert({
    title: 'Confirmation',
    message: 'Are you sure you want to approve?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          setNotificationsData((prevData) =>
            prevData.map((notification) => {
              if (notification.id === notificationId) {
                return { ...notification, approved: true };
              }
              return notification;
            })
          );
          toast.success('You have accepted a substitution request');
        },
      },
      {
        label: 'No',
        onClick: () => {},
      },
    ],
  });
};

const handleDecline = (notificationId) => {
  confirmAlert({
    title: 'Confirmation',
    message: 'Are you sure you want to decline?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          setNotificationsData((prevData) =>
            prevData.map((notification) => {
              if (notification.id === notificationId) {
                return { ...notification, declined: true };
              }
              return notification;
            })
          );
          toast.error('You have declined the request');
        },
      },
      {
        label: 'No',
        onClick: () => {},
      },
    ],
  });
};

// Filter out the notifications that have been approved or declined
const filteredNotificationsData = notificationsData.filter(
  (notification) => !notification.approved && !notification.declined
);


const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [data, setData] = useState([]); // Add this line to define the 'data' state variable

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/teachers/emailId/${TEACHER_EMAIL}`);
      const jsonData = await response.json();
      setData(jsonData);


      if (jsonData && jsonData.length > 0) {
        setFirstName(jsonData[0].firstName);
        setLastName(jsonData[0].lastName);
      }
    } catch (error) {
      console.error('error fetching data:', error);
    }
  };
  setData([]);
  fetchData();
}, []);



  // Define a state to store the total number of students for each class
  const [classStudentCounts, setClassStudentCounts] = useState({});

  useEffect(() => {
    // Fetch the total number of students for each class and store it in the state
    const fetchStudentCounts = async () => {
      try {
        const response = await Promise.all(
          data.map(async (item) => {
            const classId = item.classId;
            const response = await fetch(`${BACKEND_URL}/students/classId/${classId}/studentCount`);
            const jsonData = await response.json();
            return { classId, studentCount: jsonData };
          })
        );

        // Create a new object with classId as keys and studentCount as values
        const studentCounts = response.reduce((acc, { classId, studentCount }) => {
          acc[classId] = studentCount;
          return acc;
        }, {});

        setClassStudentCounts(studentCounts);
      } catch (error) {
        console.error('Error fetching student counts:', error);
      }
    };

    fetchStudentCounts();
  }, [data]);




  return (
<div className={classes.root}>
      <div style={{ marginTop: '20px' }}>
        {/* Add margin or padding to ensure content below the header */}
        <div className={classes.profileContainer}>
          <Avatar src={userPic} alt="Profile Picture" className={classes.profilePic} />
          <div>
            {/* Use the dynamic firstName and lastName here */}
            <Typography variant="h4" className={classes.greetings} style={{ fontWeight: 500, fontSize: 30 }}>
              Hey {firstName}!
            </Typography>
            <Typography variant="body1" className={classes.message} style={{ fontWeight: 300, fontSize: 15 }}>
              We hope you have a nice day.
            </Typography>
        </div>
      </div>
      <div className={classes.bodyContainer}>
        <div className={classes.bigBox}>
          <Typography
              variant="h5"
              className={classes.boxHeading}
              style={{  fontWeight: 600, fontSize: 20, color: '#000' }}
            >
              Calendar
            </Typography>
            <div className={classes.boxContent}>
          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className={classes.calendarContainer}>
              <Calendar value={currentDate} tileClassName={tileClassName} />
            </div>
          </div>
          </div>
        </div>
        <div className={classes.regularBox}style={{ overflow:'auto'}}>
          <Typography
              variant="h5"
              className={classes.boxHeading}
              style={{  fontWeight: 600, fontSize: 20, color: '#000' }}
            >
              Assigned Classes
            </Typography>
            <div className={classes.boxContent}>





          <div style={{ background: '#fff', padding: '10px', color: '#000' }}>
  {/* Display the fetched data */}
  {data.map((item) => (
    <div
      key={item.id}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ccc',
        marginBottom: '50px',
      }}
    >
      {/* Increase the marginLeft value to move the presentation icon towards the right */}
      <img src={presentation} alt="Item Image" style={{ width: '50px', height: '50px', marginRight: '10px', marginLeft: '70px' }} />
      <div>
        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>{item.classId}</p>
        <p>Total Students: {classStudentCounts[item.classId] || 0}</p>
      </div>
    </div>

  ))}
  </div>
</div>













        </div>
        <div className={classes.regularBox}>
          <Typography
              variant="h5"
              className={classes.boxHeading}
              style={{ fontWeight: 600, fontSize: 20, color: '#000' }}
            >
              Notifications
            </Typography>
            <div className={classes.boxContent}>
          <div className={classes.notificationBox}>
            {filteredNotificationsData.map((notification) => (
              <div key={notification.id} className={classes.notificationItem}>
                <Avatar
                  src={teachernotification}
                  alt="Sender Profile Picture"
                  className={classes.notificationProfilePic}
                />
                <div className={classes.notificationContent}>
                  <Typography variant="body1">{notification.sender}</Typography>
                  <Typography variant="body2">{notification.date}</Typography>
                  <Typography variant="body2">{notification.message} </Typography>
                </div>
                {!notification.approved && !notification.declined && (
                  <div className={classes.notificationButtons}>
                    <CheckIcon
                      className={classes.approveIcon}
                      onClick={() => handleApprove(notification.id)}
                    />
                    <CloseIcon
                      className={classes.declineIcon}
                      onClick={() => handleDecline(notification.id)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
