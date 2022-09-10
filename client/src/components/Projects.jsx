import React from 'react'
import {useQuery} from '@apollo/client'
import {GET_PROJECTS} from "../queries/projectQuery";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";

export default function Projects() {
    const {data, loading, error} = useQuery(GET_PROJECTS)
    if (loading) return <Spinner/>
    if (error) return <div>error fetching project</div>
    return (
        <React.Fragment>
            <h2>Projects</h2>
            <div className='row mt-4'>
                {
                    data.projects.length > 0 && data.projects.map(project => {
                        return <ProjectCard key={project.key} project={project} />
                    })
                }
            </div>
        </React.Fragment>
    )
}