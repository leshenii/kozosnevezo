'use client'

import { useEffect, useState } from 'react';
import {Spinner} from "@heroui/react";

export default function ProjectPage({params}) {

    const [id, setId] = useState('');
    const [project, setProject] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchProject = async () => {
        await fetch(`/api/projectsapi/project?projectId=1`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(project => {
                setProject(project)
                setIsLoaded(true)
            })
            .catch(error => {
                console.error('Error fetching project:', error)
                setIsLoaded(true)
            });
    }

    useEffect(() => {
        async function fetchParams() {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        }
        fetchParams()
    }, [params]);

    useEffect(() => {
        fetchProject()
    }, []);

    useEffect(() => {
        console.log(project)
    }, [project]);

    return (
        <div>
            <h1 className="mt-5 title text-center">Projekt</h1>
            {!isLoaded ? (
                <div className="text-center">
                    <Spinner color="primary" size="lg" className="pt-20" />
                </div>
            ) : (
                project && (
                    <div>
                        <p>{project.country}</p>
                        <p>{project.startDate}</p>
                        <p>{project.endDate}</p>
                        <p>{project.organization}</p>
                        <p>{project.location}</p>
                    </div>
                )
            )}
        </div>
    );
}