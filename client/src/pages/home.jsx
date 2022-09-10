import AddClientModal from "../components/addClientModal";
import Clients from "../components/Clients";
import Projects from "../components/Projects";
import AddProjectModal from "../components/addProjectModal";


export default function Home(props) {
    return <>
        <div className='d-flex flex-row'>
            <AddClientModal/>
            <AddProjectModal/>
        </div>
        <div>
            <Projects/>
            <Clients/>
        </div>
    </>
}