import {gql, useQuery} from '@apollo/client'
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";
import {GET_CLIENTS} from "../queries/clientQuery";

export default function Clients(props) {
    const {data, loading, error} = useQuery(GET_CLIENTS)

    if (loading) return <Spinner/>
    if (error) return <div>Couldn't fetch in error</div>
    return <>
        <table className='table table-hover mt-3'>
            <thead>
            <tr>
                <td>name</td>
                <td>email</td>
                <td>phone</td>
                <td>...</td>
            </tr>
            </thead>
            {data.clients.map(client => {
                return <ClientRow key={client.id} client={client}/>
            })}
        </table>
    </>
}