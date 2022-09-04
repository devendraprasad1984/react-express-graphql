import {gql, useQuery} from '@apollo/client'
import ClientRow from "./ClientRow";

const GET_CLIENTS = gql`
query getClients{
    clients{
        id
        name
        email
        phone
    }
}
`

export default function Clients(props) {
    const {data, loading, error} = useQuery(GET_CLIENTS)

    if(loading) return <div>Loading...</div>
    if(error) return <div>Couldn't fetch in error</div>
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
            {data.clients.map(client=>{
                return <ClientRow key={client.id} client={client} />
            })}
        </table>
    </>
}