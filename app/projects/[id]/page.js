'use client'

import {useEffect, useState} from 'react';
import {
    Autocomplete,
    AutocompleteItem,
    Avatar,
    Button,
    Card,
    Input, Modal, ModalBody, ModalContent,
    RangeCalendar,
    Select,
    SelectItem,
    Spinner, useDisclosure
} from "@heroui/react";
import {snakeCase} from "snake-case";
import {parseDate} from "@internationalized/date";
import countries from "i18n-iso-countries";
import * as worldMap from '../../lib/world-map.json';
import removeAccents from 'remove-accents';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/hu.json"));


export default function ProjectPage({params}) {

    const [id, setId] = useState(null);
    const [project, setProject] = useState(null);
    const [isProjectLoaded, setIsProjectLoaded] = useState(false);
    const [isUsersLoaded, setIsUsersLoaded] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [projectType, setProjectType] = useState(new Set(["training_course"]));
    const [touched, setTouched] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [users, setUsers] = useState([]);

    const europeanFeatures = worldMap.features.filter(
        feature => feature.properties.continent === 'Europe'
    );
    const europeanCountries = europeanFeatures
        .filter(country => country.properties.continent === "Europe")
        .map(country => ({
            key: countries.getAlpha2Code(country.properties.name, 'en').toLowerCase(),
            label: countries.getName(countries.getAlpha2Code(country.properties.name, 'en'), 'hu')
        }));

    useEffect(() => {
        const selectedType = projectTypes.find(type => projectType.has(type.key));
        if (selectedType) {
            setProject({...project, type: selectedType.label});
        }
    }, [projectType]);

    const projectTypes = [
        {key: "youth_exchange", label: "Youth Exchange"},
        {key: "training_course", label: "Training Course"},
        {key: "advanced_planning_visit", label: "Advanced Planning Visit"},

    ];

    const fetchProject = async () => {
        if (!id) return;
        await fetch(`/api/projectsapi/project?projectId=${id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(project => {
                setProject(project)
                setProjectType(new Set([snakeCase(project.type)]))
                setIsProjectLoaded(true)
            })
            .catch(error => {
                console.error('Error fetching project:', error)
                setIsProjectLoaded(true)
            });
    }

    const fetchUsers = async () => {
        await fetch(`/api/users`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(user => {
                setUsers(user)
                setIsUsersLoaded(true)
            })
            .catch(error => {
                console.error('Error fetching users:', error)
                setIsUsersLoaded(true)
            });
    }

    useEffect(() => {
        console.log(users)
    }, [users]);

    useEffect(() => {
        async function fetchParams() {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        }
        fetchParams()
    }, [params]);

    useEffect(() => {
        fetchProject()
        fetchUsers()
    }, [id]);

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>

                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {!isUsersLoaded || !isProjectLoaded ? (
                <div className="text-center">
                    <Spinner color="primary" size="lg" className="pt-20"/>
                </div>
            ) : (
                project && (
                    <div className="flex flex-col w-screen sm:w-2/3 mx-4 mt-5 mb-14 gap-2">
                        <div className="flex justify-end">
                            <Button color="primary" variant="ghost" radius="full"
                                    onPress={() => setEditMode(!editMode)}>
                                Projekt módosítása
                            </Button>
                        </div>
                        {editMode ?
                            <Card className="p-4 flex flex-col gap-2">
                                <div>
                                    <Input
                                        variant="underlined"
                                        color="primary"
                                        size="lg"
                                        isClearable
                                        value={project.title}
                                        onValueChange={(value) => setProject({...project, title: value})}
                                        classNames={{
                                            input: "kanit-bold text-5xl text-center mt-2",
                                            mainWrapper: "w-fit self-center mt-2 pl-6"
                                        }}
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
                                        classNames={{
                                            value: "pl-7 !text-gray-600 text-xl text-center",
                                            mainWrapper: "w-fit min-w-96 self-center"
                                        }}
                                    >
                                        {projectTypes.map((type) => (
                                            <SelectItem key={type.key}>{type.label}</SelectItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <div className="flex flex-col gap-2 flex-grow !w-full">
                                        <div>
                                            <div className="flex flex-row gap-2 items-center">
                                                <Autocomplete
                                                    errorMessage={project.country && project.country.length > 0 || !touched ? "" : "Választanod kell egy projekt típust!"}
                                                    isInvalid={project.country && project.country.length > 0 || !touched ? false : true}
                                                    onClose={() => setTouched(true)}
                                                    defaultItems={europeanCountries}
                                                    label="Ország"
                                                    placeholder="Adj meg egy országot"
                                                    color="primary"
                                                    variant="underlined"
                                                    defaultSelectedKey={project.country ? countries.getAlpha2Code(project.country, 'hu').toLowerCase() : null}
                                                    onSelectionChange={(selected) => setProject({
                                                        ...project,
                                                        country: countries.getName(selected, 'hu') ? countries.getName(selected, 'hu') : null
                                                    })}
                                                    className={"w-56"}
                                                    startContent={project.country &&
                                                        <Avatar alt="flag" className="!w-6 !h-6 min-w-[24px]"
                                                                src={`https://flagcdn.com/${countries.getAlpha2Code(project.country, 'hu').toLowerCase()}.svg`}/>}
                                                >
                                                    {(country) => <AutocompleteItem key={country.key} startContent={
                                                        <Avatar alt="flag" className="w-6 h-6"
                                                                src={`https://flagcdn.com/${country.key}.svg`}/>
                                                    }>
                                                        {country.label}
                                                    </AutocompleteItem>}
                                                </Autocomplete>
                                                <div>
                                                    <Input
                                                        variant="underlined"
                                                        color="primary"
                                                        value={project.location}
                                                        onValueChange={(value) => setProject({
                                                            ...project,
                                                            location: value
                                                        })}
                                                        label="Város"
                                                    >

                                                    </Input>
                                                </div>

                                            </div>
                                            <iframe className="mt-2" width="300" height="300" style={{border: '0'}}
                                                    loading="lazy"
                                                    allowFullScreen
                                                    src={`https://www.google.com/maps/embed/v1/place?q=${project.location},${project.country}&key=AIzaSyBQpb-zeHME6F8U4pDQIMpZ3gx3ScgnfuE`}></iframe>
                                        </div>
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
                                            calendarWidth={300}
                                            color="primary"
                                            value={{
                                                start: parseDate(new Date(project.startDate).toISOString().split('T')[0]),
                                                end: parseDate(new Date(project.endDate).toISOString().split('T')[0])
                                            }}
                                            onChange={(value) => setProject({
                                                ...project,
                                                startDate: new Date(value.start),
                                                endDate: new Date(value.end)
                                            })}
                                        />
                                        <p>{project.organization}</p>
                                    </div>
                                    <div className="flex flex-col gap-2 flex-gorw min-w-1/2 w-full">
                                        <div className="flex flex-row gap-2 w-full justify-end">
                                            <div
                                                className="border-solid border-0 border-l-[3px] border-blue-900 justify-self-start flex-grow ">
                                                <h2 className="kanit-semibold text-xl ml-2 text-gray-800">Csapatvezető</h2>
                                            </div>
                                            <Button
                                                color="primary"
                                                variant="ghost"
                                                radius="full"
                                                size="sm"
                                            >
                                                Hozzáadás
                                            </Button>
                                        </div>
                                        <div className="flex flex-row gap-2 w-full justify-end">
                                            <div
                                                className="border-solid border-0 border-l-[3px] border-blue-900 justify-self-start flex-grow ">
                                                <h2 className="kanit-semibold text-xl ml-2 text-gray-800">Résztvevők</h2>
                                            </div>
                                            <Button
                                                color="primary"
                                                variant="ghost"
                                                radius="full"
                                                size="sm"
                                            >
                                                Hozzáadás
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            :
                            <Card className="p-4 flex flex-col gap-2">
                                <div className="">
                                    <h1 className="kanit-bold text-5xl text-center mt-2">{project.title}</h1>
                                    <p className="text-gray-700 text-xl text-center">{project.type}</p>
                                </div>

                                <div className="flex flex-row gap-2 flex-grow" id="users">
                                    <div className="flex flex-col gap-2">
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
                                                calendarWidth={300}
                                                isReadOnly
                                                color="primary"
                                                defaultValue={{
                                                    start: parseDate(new Date(project.startDate).toISOString().split('T')[0]),
                                                    end: parseDate(new Date(project.endDate).toISOString().split('T')[0])
                                                }}
                                            />
                                        </div>

                                        <p>{project.organization}</p>
                                    </div>
                                    <div className="flex flex-col gap-2 flex-gorw min-w-1/2 w-full">
                                        <div className="border-solid border-0 border-l-[3px] border-blue-900">
                                            <h2 className="kanit-semibold text-xl ml-2 text-gray-800">Csapatvezető</h2>
                                        </div>
                                        <div className="flex flex-row gap-2 w-full justify-end">
                                            <div
                                                className="border-solid border-0 border-l-[3px] border-blue-900 justify-self-start flex-grow ">
                                                <h2 className="kanit-semibold text-xl ml-2 text-gray-800">Résztvevők</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        }
                    </div>
                )
            )}
        </>
    );
}