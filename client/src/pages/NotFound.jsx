import {FaExclamationTriangle} from 'react-icons/fa'
import {Link} from "react-router-dom";

export default function NotFound() {
    return <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
        <FaExclamationTriangle style={{color: 'red', fontSize: '5em'}}/>
        <h1>404 Page Not Found</h1>
        <p>Page doesnt exist</p>
        <Link to={'/'} className={'btn btn-primary'}>
            Back to Home
        </Link>
    </div>
}
