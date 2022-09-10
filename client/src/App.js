import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import NotFound from "./pages/NotFound";
import Project from "./pages/project";



const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming
                    }
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming
                    }
                }
            }
        }
    }
})

const client = new ApolloClient({
    uri: 'http://localhost:5200/graphql',
    cache
})

function App() {
    return <ApolloProvider client={client}>
        <Router>
            <Header/>
            <div className="container">
                <Routes>
                    <Route exact={true} path={'/'} element={<Home/>}/>
                    <Route path={'/project/:id'} element={<Project />}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </div>
        </Router>
    </ApolloProvider>
}

export default App;
