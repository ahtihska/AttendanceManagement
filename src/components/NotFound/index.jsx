import { Card } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <Card className="App-Card">
            <h1>Oops! Accessing route not exist.</h1>
            <p>Here are some helpful links to get in to the system back</p>
            <Link to='/'>Home</Link>
            <Link to='/contact'>Contact</Link>
        </Card>
    )
}
export default NotFound