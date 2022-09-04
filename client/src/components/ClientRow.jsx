import {FaTrash} from 'react-icons/fa'

export default function ClientRow(props) {
    const {client, id} = props

    const handleDeleteClient = () => {
        //useMutation delete client
    }

    return <>
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={handleDeleteClient}>
                    <FaTrash/>
                </button>
            </td>
        </tr>
    </>
}