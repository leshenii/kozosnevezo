'use client'

import {useEffect, useState} from 'react';
import {Avatar, Button, Card, Input, RangeCalendar, Select, SelectItem, Spinner} from "@heroui/react";
import {snakeCase} from "snake-case";
import {parseDate} from "@internationalized/date";
import countries from "i18n-iso-countries";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/hu.json"));

export default function ProjectPage({params}) {

    const [id, setId] = useState(null);
    const [project, setProject] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [projectType, setProjectType] = useState(new Set(["training_course"]));
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        console.log(projectType)
        const selectedType = projectTypes.find(type => projectType.has(type.key));
        if (selectedType) {
            setProject({...project, type: selectedType.label});
        }
    }, [projectType]);

    const projectTypes = [
        {key: "training_course", label: "Training Course"},
        {key: "mobility_project", label: "Mobility Project"},
        {key: "youth_exchange", label: "Youth Exchange"},
    ];

    const fetchProject = async () => {
        if (!id) return;
        await fetch(`/api/projectsapi/project?projectId=${id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(project => {
                setProject(project)
                setProjectType(new Set( [snakeCase(project.type)]))
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
    }, [id]);

    return (
        <>

            {!isLoaded ? (
                <div className="text-center">
                    <Spinner color="primary" size="lg" className="pt-20"/>
                </div>
            ) : (
                project && (
                    <div className="flex flex-col w-screen sm:w-2/3 mx-4 mt-5 mb-14 gap-2">
                        <div className="flex justify-end">
                            <Button color="primary" variant="ghost" radius="full" onPress={() => setEditMode(!editMode)}>
                                Projekt módosítása
                            </Button>
                        </div>
                        {editMode ?
                            <Card className="p-4 flex flex-col gap-2">

                                <Input
                                    variant="underlined"
                                    color="primary"
                                    size="lg"
                                    isClearable
                                    value={project.title}
                                    onValueChange={(value) => setProject({...project, title: value})}
                                    classNames={{input: "kanit-bold text-5xl text-center mt-2", mainWrapper: "w-fit self-center mt-2 pl-6"}}
                                    fullWidth={false}
                                ></Input>
                                <Select
                                    errorMessage={projectType.size > 0 || !touched ? "" : "Választanod kell egy projekt típust!"}
                                    isInvalid={projectType.size > 0 || !touched ? false : true}
                                    onClose={() => setTouched(true)}
                                    variant="underlined"
                                    color="primary"
                                    onSelectionChange={setProjectType}
                                    selectedKeys={projectType}
                                    classNames={{value: "pl-7 !text-gray-700 text-xl text-center", mainWrapper: "w-fit min-w-52 self-center"}}
                                >
                                    {projectTypes.map((type) => (
                                        <SelectItem key={type.key}>{type.label}</SelectItem>
                                    ))}
                                </Select>

                                <div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Avatar alt="flag" size="sm"
                                                src={`https://flagcdn.com/${snakeCase(countries.getAlpha2Code(project.country, 'hu'))}.svg`}/>
                                        <p>{project.country}, {project.location}</p>
                                    </div>
                                    <iframe className="mt-2" width="300" height="300" style={{border: '0'}}
                                            loading="lazy"
                                            allowFullScreen
                                            src={`https://www.google.com/maps/embed/v1/place?q=${project.location},${project.country}&key=AIzaSyBQpb-zeHME6F8U4pDQIMpZ3gx3ScgnfuE`}></iframe>
                                </div>
                                <p>{new Date(project.startDate).toLocaleDateString('hu-HU', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })} - {new Date(project.endDate).toLocaleDateString('hu-HU', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</p>
                                <p>{project.organization}</p>
                            </Card>
                            :
                            <Card className="p-4 flex flex-col gap-2">
                                <h1 className="kanit-bold text-5xl text-center mt-2">{project.title}</h1>
                                <p className="text-gray-700 text-xl text-center">{project.type}</p>

                                <div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Avatar alt="flag" size="sm"
                                                src={`https://flagcdn.com/${snakeCase(countries.getAlpha2Code(project.country, 'hu'))}.svg`}/>
                                        <p>{project.country}, {project.location}</p>
                                    </div>
                                    <iframe className="mt-2" width="300" height="300" style={{border: '0'}}
                                            loading="lazy"
                                            allowFullScreen
                                            src={`https://www.google.com/maps/embed/v1/place?q=${project.location},${project.country}&key=AIzaSyBQpb-zeHME6F8U4pDQIMpZ3gx3ScgnfuE`}></iframe>
                                </div>
                                <div>
                                    <p className="text-gray-700 text-sm">{new Date(project.startDate).toLocaleDateString('hu-HU', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })} - {new Date(project.endDate).toLocaleDateString('hu-HU', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</p>
                                    <RangeCalendar
                                        isReadOnly
                                        color="primary"
                                        defaultValue={{
                                            start: parseDate(new Date(project.startDate).toISOString().split('T')[0]),
                                            end: parseDate(new Date(project.endDate).toISOString().split('T')[0])
                                        }}
                                    />
                                </div>

                                <p>{project.organization}</p>
                            </Card>
                        }
                    </div>
                )
            )}
        </>
    );
}