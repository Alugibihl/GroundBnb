import { useHistory } from "react-router-dom";


function NotFound() {
    const history = useHistory()

    return (

        <div className="unavailable">
            <h2>There's nothing here...</h2>
            <button onClick={() => history.push('/')}>Return to main page</button>
        </div >

    )
}


export default NotFound;
