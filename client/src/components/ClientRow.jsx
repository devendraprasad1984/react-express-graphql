import {FaTrash} from 'react-icons/fa'
import {useMutation} from '@apollo/client'
import {DELETE_CLIENT} from "../mutations/clientMutations";
import Spinner from "./Spinner";
import {GET_CLIENTS} from "../queries/clientQuery";
import {GET_PROJECTS} from "../queries/projectQuery";

export default function ClientRow(props) {
    const {client} = props
    const [deleteMutation, {data, loading, error}] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id},
        refetchQueries:[{query: GET_CLIENTS}, {query: GET_PROJECTS}],
        // update(cache, { data: { deleteClient } }) {
        //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
        //   cache.writeQuery({
        //     query: GET_CLIENTS,
        //     data: {
        //       clients: clients.filter((client) => client.id !== deleteClient.id),
        //     },
        //   });
        // },
    })

    const handleDeleteClient = () => {
        //useMutation deleteClient callback
        deleteMutation()
    }

    if (loading) return <Spinner/>
    if (error) return <div>Error while deleting</div>
    return <>
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className="btn btn-sm btn-primary" onClick={handleDeleteClient}>
                    <FaTrash/>
                </button>
            </td>
        </tr>
    </>
}