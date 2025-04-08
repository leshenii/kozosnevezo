'use client'

import {useEffect, useState} from 'react';
import {
    Autocomplete,
    AutocompleteItem,
    Avatar,
    Button,
    Card, Chip,
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
import {useUser} from "@clerk/nextjs";
import {
    BiEditAlt,
    BiSolidEditAlt, BiSolidErrorCircle,
    BiSolidLeftArrowCircle,
    BiSolidSave, BiSolidTrash,
    BiSolidUser,
    BiSolidXCircle
} from "react-icons/bi";
import {router} from "next/client";
import {useRouter} from "next/navigation";
import {FaFilePdf} from "react-icons/fa6";
import {downloadFile} from "@/app/components/UploadFile";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/hu.json"));

export default function ProjectPage({params}) {

    const [projects, setProjects] = useState([])
    const [id, setId] = useState(null);
    const [project, setProject] = useState(null);
    const [isProjectLoaded, setIsProjectLoaded] = useState(false);
    const [isUsersLoaded, setIsUsersLoaded] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [projectType, setProjectType] = useState(new Set(["training_course"]));
    const [touched, setTouched] = useState(false);
    const [users, setUsers] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [participantValue, setParticipantValue] = useState({id: null, name: ''});
    const [organizationValue, setOrganizationValue] = useState({id: null, name: ''});
    const {isLoaded, user} = useUser()
    const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
    const [uniqueOrganizations, setUniqueOrganizations] = useState([]);
    const [blob, setBlob] = useState(null);
    const {
        isOpen: isDeletionConfirmationModalOpen,
        onOpen: onDeletionConfirmationModalOpen,
        onClose: onDeletionConfirmationModalClose
    } = useDisclosure();

    const router = useRouter()

    const fetchProjects = async () => {
        await fetch('/api/projectsapi', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(projects => {
                setProjects(projects)
                setUniqueOrganizations([...new Set(projects
                    .map(project => project.organization)
                    .filter(organization => organization !== null)
                )]);
            })
            .catch(error => {
                console.error('Error fetching projects:', error)
            });
    }

    useEffect(() => {
        console.log(uniqueOrganizations);
    }, [uniqueOrganizations]);

    useEffect(() => {
        fetchProjects()
    }, []);

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
                console.log(project)
                setParticipants(project.participants.map(participant => ({
                    id: participant.user.id,
                    name: participant.user.lastName + ' ' + participant.user.firstName
                })))
                setProject(project)
                setProjectType(new Set([snakeCase(project.type)]))
                setIsProjectLoaded(true)
            })
            .catch(error => {
                console.error('Error fetching project:', error)
                setIsProjectLoaded(true)
            });
    }

    const fetchBlob = async () => {
        await fetch(`/api/projectsapi/project/infopack?url=${project.infopack}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(blobDetails => {
                setBlob(blobDetails)
            })
            .catch(error => {
                console.error('Error fetching blob:', error)
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
        async function fetchParams() {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        }

        fetchParams()
    }, [params]);

    useEffect(() => {
        fetchProject().then(r => {
            if (project && project.infopack) {
                fetchBlob();
            }
        }).finally(() => fetchUsers());

    }, [id]);

    const updateProject = async () => {
        await fetch(`/api/projectsapi/project`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, ...project, participants})
        })
            .then(response => response.json())
            .then(updatedProject => {
                setProject(updatedProject);
                setEditMode(false);
            })
            .catch(error => {
                console.error('Error updating project:', error);
            });
    };

    const deleteProject = async () => {
        if (!id) return;
        await fetch(`/api/projectsapi/project?projectId=${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(project => {
                router.push('/projects?view=calendar');
            })
            .catch(error => {
                console.error('Error deleting project:', error)
                setIsProjectLoaded(true)
            });
    }

    return (
        <div className="responsive-height">
            <Modal isOpen={isDeletionConfirmationModalOpen} size="xs" onClose={onDeletionConfirmationModalClose}>
                <ModalContent>
                    {(onClose) => (
                        <ModalBody className="items-center px-10 py-5">
                            <BiSolidErrorCircle size="1.5rem" color="orange"/>
                            <p className="text-center items-center justify-center ">
                                Biztosan törölni szeretnéd a projektet az adatbázisból? A döntés nem visszafordítható!
                            </p>
                            <div className="flex flex-row gap-2">
                                <Button variant="ghost" color="primary" radius="full"
                                        onPress={onDeletionConfirmationModalClose}>
                                    Mégse
                                </Button>
                                <Button variant="ghost" color="danger" radius="full" onPress={() => {
                                    setIsButtonsDisabled(true)
                                    deleteProject()
                                    onDeletionConfirmationModalClose()
                                }}>
                                    Törlés
                                </Button>
                            </div>
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
            {!isUsersLoaded || !isProjectLoaded ? (
                <div className="text-center">
                    <Spinner color="primary" size="lg" className="pt-20"/>
                </div>
            ) : (
                project && (
                    <div className="flex flex-col justify-center mx-4 mt-5 mb-14 gap-2">
                        {isLoaded && user && user.publicMetadata.role === "admin" && (
                            <div className="flex justify-end gap-2">
                                {editMode ? (
                                    <>
                                        <Button color="primary" variant="ghost" radius="full"
                                                isDisabled={isButtonsDisabled}
                                                onPress={() => {
                                                    setIsButtonsDisabled(true)
                                                    window.location.reload()
                                                }}
                                                startContent={<BiSolidXCircle size="1.5rem"/>}>
                                            Vissza
                                        </Button>
                                        <Button color="danger" variant="ghost" radius="full"
                                                isDisabled={isButtonsDisabled}
                                                onPress={() => {
                                                    onDeletionConfirmationModalOpen()
                                                }}
                                                startContent={<BiSolidTrash size="1.5rem"/>}>
                                            Törlés
                                        </Button>
                                        <Button color="success" variant="ghost" radius="full"
                                                isDisabled={isButtonsDisabled}
                                                onPress={() => {
                                                    setIsButtonsDisabled(true)
                                                    updateProject()
                                                }}
                                                startContent={<BiSolidSave size="1.5rem"/>}

                                        >
                                            Mentés
                                        </Button>
                                    </>
                                ) : (

                                    <Button color="primary" variant="ghost" radius="full"
                                            onPress={() => setEditMode(!editMode)}
                                            startContent={<BiSolidEditAlt size="1.5em"/>}>
                                        Projekt módosítása
                                    </Button>

                                )
                                }
                            </div>
                        )}

                        {editMode ?
                            <Card className="p-4 flex flex-col gap-2">
                                <div>
                                    <Input
                                        variant="underlined"
                                        color="primary"
                                        label="Cím"
                                        size="lg"
                                        isClearable
                                        value={project.title}
                                        onValueChange={(value) => setProject({...project, title: value})}
                                        classNames={{
                                            input: "kanit-bold text-4xl text-center mt-2",
                                            mainWrapper: "w-full sm:w-fit self-center sm:mt-2 sm:pl-6"
                                        }}
                                        fullWidth={false}
                                    ></Input>
                                    <Select
                                        isRequired
                                        label="Típus"
                                        errorMessage={projectType.size > 0 || !touched ? "" : "Választanod kell egy projekt típust!"}
                                        isInvalid={projectType.size > 0 || !touched ? false : true}
                                        onClose={() => setTouched(true)}
                                        variant="underlined"
                                        color="primary"
                                        onSelectionChange={setProjectType}
                                        selectedKeys={projectType}
                                        classNames={{
                                            value: "!text-gray-600 text-xl text-center",
                                            mainWrapper: "w-full self-center"
                                        }}
                                    >
                                        {projectTypes.map((type) => (
                                            <SelectItem key={type.key}>{type.label}</SelectItem>
                                        ))}
                                    </Select>
                                    <Autocomplete
                                        defaultItems={uniqueOrganizations.map(org => ({
                                            key: org,
                                            label: org
                                        }))}
                                        allowsCustomValue
                                        label="Egyesület"
                                        color="primary"
                                        variant="underlined"
                                        selectedKey={null}
                                        inputValue={organizationValue.name}
                                        onInputChange={(value) => setOrganizationValue({
                                            ...organizationValue,
                                            id: null,
                                            name: value
                                        })}
                                        onKeyUp={(e) => {
                                            e.continuePropagation()
                                            if (e.key === 'Enter') {
                                                setProject({...project, organization: organizationValue.name});
                                                setUniqueOrganizations([...uniqueOrganizations, organizationValue.name]);
                                            }
                                        }}
                                        onSelectionChange={(key, label) => {
                                            const orga = key ? uniqueOrganizations.find(org => org === key) : null;
                                            console.log(orga)
                                            if (orga) {
                                                setProject({...project, organization: orga});
                                                setOrganizationValue({id: orga, name: orga});
                                            }
                                        }}
                                    >
                                        {(org) => <AutocompleteItem key={org.key}>
                                            {org.label}
                                        </AutocompleteItem>}
                                    </Autocomplete>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-2 flex-grow !w-full">
                                        <div className="flex flex-col sm:flex-row items-center gap-2">
                                            <div>
                                                <div className="flex flex-col gap-2 ">
                                                    <Autocomplete
                                                        isRequired
                                                        errorMessage={project.country && project.country.length > 0 || !touched ? "" : "Választanod kell egy országot!"}
                                                        isInvalid={project.country && project.country.length > 0 || !touched ? false : true}
                                                        onClose={() => setTouched(true)}
                                                        defaultItems={europeanCountries}
                                                        label="Ország"
                                                        color="primary"
                                                        variant="underlined"
                                                        defaultSelectedKey={project.country ? countries.getAlpha2Code(project.country, 'hu').toLowerCase() : null}
                                                        onSelectionChange={(selected) => setProject({
                                                            ...project,
                                                            country: countries.getName(selected, 'hu') ? countries.getName(selected, 'hu') : null
                                                        })}
                                                        startContent={project.country &&
                                                            <Avatar alt="flag" className="!w-6 !h-6 min-w-[24px]"
                                                                    src={`https://flagcdn.com/${countries.getAlpha2Code(project.country, 'hu').toLowerCase()}.svg`}/>}
                                                    >
                                                        {(country) => <AutocompleteItem key={country.key}
                                                                                        startContent={
                                                                                            <Avatar alt="flag"
                                                                                                    className="w-6 h-6"
                                                                                                    src={`https://flagcdn.com/${country.key}.svg`}/>
                                                                                        }>
                                                            {country.label}
                                                        </AutocompleteItem>}
                                                    </Autocomplete>
                                                    <div>
                                                        <Input
                                                            isClearable
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
                                                <iframe className="mt-2" width="300" height="300"
                                                        style={{border: '0'}}
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
                                            </div>
                                        </div>
                                    </div>
                                    {project.infopack &&
                                        <div className="flex flex-row gap-2">
                                            <Chip className="pl-3 cursor-pointer"
                                                  startContent={<FaFilePdf/>} color="primary">
                                                {blob.pathname}
                                            </Chip>
                                            <Chip
                                                  className="pl-3 cursor-pointer" startContent={<BiSolidXCircle/>}
                                                  color="danger">Törlés</Chip>
                                        </div>
                                    }
                                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                                        {/*<div className="flex flex-row gap-2 w-full justify-end">

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
                                        </div>*/}
                                        <div className="flex flex-row gap-2 w-full justify-end">
                                            <div
                                                className="border-solid border-0 border-l-[3px] border-blue-900 justify-self-start flex-grow ">
                                                <div className="flex flex-row gap-2">
                                                    <h2 className="kanit-semibold text-xl ml-2 text-gray-800">Résztvevők</h2>
                                                    <Chip color="primary"
                                                          size="sm"
                                                          endContent={<BiSolidUser/>}
                                                    >{participants.length} résztvevő</Chip>
                                                </div>
                                            </div>
                                        </div>
                                        <Autocomplete
                                            defaultItems={users.map(user => ({
                                                key: user.id,
                                                label: user.lastName + ' ' + user.firstName
                                            }))}
                                            allowsCustomValue
                                            label="Résztvevő hozzáadása"
                                            placeholder="Add meg a résztvevőt"
                                            color="primary"
                                            variant="underlined"
                                            selectedKey={null}
                                            inputValue={participantValue.name}
                                            onInputChange={(value) => setParticipantValue({
                                                ...participantValue,
                                                id: null,
                                                name: value
                                            })}
                                            onKeyUp={(e) => {
                                                e.continuePropagation()
                                                if (e.key === 'Enter') {
                                                    setParticipants([...participants, participantValue]);
                                                    setParticipantValue({id: null, name: ''});
                                                }
                                            }}
                                            onSelectionChange={(selected) => {
                                                const user = users.find(user => user.id === parseInt(selected));
                                                if (user) {
                                                    setParticipants([...participants, {
                                                        id: user.id,
                                                        name: user.lastName + ' ' + user.firstName
                                                    }]);
                                                    setParticipantValue({id: null, name: ''});
                                                }
                                            }}
                                        >
                                            {(user) => <AutocompleteItem key={user.key}>
                                                {user.label}
                                            </AutocompleteItem>}
                                        </Autocomplete>
                                        {participants.map((participant, index) => (
                                            <Chip
                                                endContent={<BiSolidXCircle/>}
                                                color="primary"
                                                variant="bordered"
                                                radius="full"
                                                key={participant + index}
                                                onClose={() => setParticipants(participants.filter((_, i) => i !== index))}
                                            >
                                                {participant.name}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                            :
                            <Card className="p-4 flex flex-col gap-2 w-fit">
                                <div className="">
                                    <h1 className="kanit-bold text-4xl text-center mt-2">{project.title}</h1>
                                    <p className="mb-3 text-gray-700 text-xl text-center">{project.type}</p>
                                    <p>{project.organization}</p>
                                </div>

                                <div className="flex flex-col gap-2 flex-grow">
                                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full justify-center">
                                        <div className="flex flex-col" id="location_and_map">
                                            <div className="flex flex-row gap-2 items-center">
                                                <Avatar alt="flag" size="sm"
                                                        src={`https://flagcdn.com/${snakeCase(countries.getAlpha2Code(project.country, 'hu'))}.svg`}/>
                                                <p>{project.country}, {project.location}</p>
                                            </div>
                                            <iframe className="mt-2" width="300" height="300"
                                                    style={{border: '0'}}
                                                    loading="lazy"
                                                    allowFullScreen
                                                    src={`https://www.google.com/maps/embed/v1/place?q=${project.location},${project.country}&key=AIzaSyBQpb-zeHME6F8U4pDQIMpZ3gx3ScgnfuE`}></iframe>
                                        </div>
                                        <div className="flex flex-col pt-5" id="date_and_calendar">
                                            <p className="text-gray-700 text-sm text-right">{new Date(project.startDate).toLocaleDateString('hu-HU', {
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
                                    </div>
                                    {project.infopack &&
                                        <Chip className="pl-3 cursor-pointer"
                                              onClick={() => handleDownload(project.infopack)}
                                              startContent={<FaFilePdf/>} color="primary">
                                            {project.infopack}
                                        </Chip>
                                    }
                                    <div className="flex flex-col gap-2 flex-gorw min-w-1/2 w-full">
                                        <div className="border-solid border-0 border-l-[3px] border-blue-900">
                                            <h2 className="kanit-semibold text-xl ml-2 text-gray-800">Csapatvezető</h2>
                                        </div>
                                        <div className="flex flex-row gap-2 w-full justify-end">
                                            <div
                                                className="border-solid border-0 border-l-[3px] border-blue-900 justify-self-start flex-grow ">
                                                <div className="flex flex-row gap-2">
                                                    <h2 className="kanit-semibold text-xl ml-2 text-gray-800">Résztvevők</h2>
                                                    <Chip color="primary"
                                                          size="sm"
                                                          endContent={<BiSolidUser/>}
                                                    >{participants.length} résztvevő</Chip>
                                                </div>
                                                {user && user.publicMetadata.role === "admin" && (
                                                    <div className="flex flex-col gap-1 ml-2">
                                                        {participants.map((participant, index) => (
                                                            <Chip
                                                                startContent={<BiSolidUser/>}
                                                                color="primary"
                                                                variant="bordered"
                                                                radius="full"
                                                                key={participant + index}
                                                            >
                                                                {participant.name}
                                                            </Chip>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        }
                    </div>
                )
            )}
        </div>
    );
}