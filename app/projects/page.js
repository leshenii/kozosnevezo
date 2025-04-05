'use client'

import {useEffect, useState} from "react";
import {DateObject, Calendar} from "react-multi-date-picker";
import {
    Autocomplete,
    AutocompleteItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Radio,
    RadioGroup,
    Spinner,
    Tooltip,
    Avatar,
    Card,
    CardBody,
    Button,
    useDisclosure,
    Modal,
    ModalContent,
    ModalBody,
    Input,
    Select,
    SelectItem,
    RangeCalendar, Chip
} from "@heroui/react";
import gregorian_hu from "../lib/gregorian_hu";
import {
    MapsComponent,
    Inject,
    LayersDirective,
    LayerDirective,
    MapsTooltip,
    Selection
} from '@syncfusion/ej2-react-maps';
import * as data from '../lib/tooltip-datasource.json';
import * as worldMap from '../lib/world-map.json';
import {useRouter, redirect, useSearchParams} from 'next/navigation'
import {snakeCase} from "snake-case";
import removeAccents from 'remove-accents';
import countries from 'i18n-iso-countries';
import {parseDate} from "@internationalized/date";
import {BiSolidAddToQueue, BiSolidErrorCircle, BiSolidUser, BiSolidXCircle} from "react-icons/bi";
import {TbHandClick} from "react-icons/tb";
import {registerLicense} from '@syncfusion/ej2-base';
import Dropzone from 'react-dropzone'
import {uploadFile} from "../components/UploadFile";
import {MdPictureAsPdf} from "react-icons/md";
import {FaFilePdf} from "react-icons/fa6";

registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY);

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/hu.json"));

let datasource = data;

export default function ProjectsPage() {

    const router = useRouter()

    const europeanFeatures = worldMap.features.filter(
        feature => feature.properties.continent === 'Europe'
    );
    const europeanCountries = europeanFeatures
        .filter(country => country.properties.continent === "Europe")
        .map(country => ({
            key: countries.getAlpha2Code(country.properties.name, 'en').toLowerCase(),
            label: countries.getName(countries.getAlpha2Code(country.properties.name, 'en'), 'hu')
        }));

    const filteredGeoJson = {
        type: 'FeatureCollection',
        features: europeanFeatures
    };

    const projectTypes = ["Youth Exchange", "Training Course", "Advanced Planning Visit"];

    const searchParams = useSearchParams()

    const [projects, setProjects] = useState([])
    const [projectIntervals, setProjectIntervals] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [numberOfMonths, setNumberOfMonths] = useState(3);
    const [selectedView, setSelectedView] = useState(searchParams.get('view') || 'calendar');
    const [countriesLocal, setCountriesLocal] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') === 'null' ? null : searchParams.get('country'));
    const [selectedOrganization, setSelectedOrganization] = useState(searchParams.get('organization') === 'null' ? null : searchParams.get('organization'));
    const [selectedType, setSelectedType] = useState(searchParams.get('type') === 'null' ? null : searchParams.get('type'));
    const [filteredProjects, setFilteredProjects] = useState([])
    const [createdProject, setCreatedProject] = useState({
        title: "",
        startDate: new Date(),
        endDate: new Date(),
        country: "",
        location: "",
        organization: "",
        type: ""
    });
    const {isOpen: isCreationModalOpen, onOpen: onCreationModalOpen, onClose: onCreationModalClose} = useDisclosure();
    const [touched, setTouched] = useState(false);
    const [uniqueOrganizations, setUniqueOrganizations] = useState([]);
    const [organizationValue, setOrganizationValue] = useState({id: null, name: ''});
    const [formData, setFormData] = useState(new FormData());

    const shapeSelected = (args) => {

        if (args.data) {
            const country = args.data.name;
            setSelectedCountry(countries.getAlpha2Code(country, "en"));
            setSelectedType(null);
            setSelectedOrganization(null);
            setSelectedView('filter');
            router.push('/projects?view=filter&country=' + countries.getAlpha2Code(country, "en"), {shallow: true});
        }

        //redirect('/projects?view=filter&country=' + countries.getAlpha2Code(country, "en"));
    };

    const shapeSetting = {
        fill: 'lightgrey',
        colorMapping: [
            {value: '1', color: '#cce5ff'},
            {value: '2', color: '#b3daff'},
            {value: '3', color: '#99ccff'},
            {value: '4', color: '#80bfff'},
            {value: '5', color: '#66b2ff'},
            {value: '6', color: '#4da6ff'},
            {value: '7', color: '#3399ff'},
            {value: '8', color: '#1a8cff'},
            {value: '9', color: '#007fff'},
            {value: '10', color: '#0073e6'},
            {value: '11', color: '#0066cc'},
            {value: '12', color: '#0059b3'},
            {value: '13', color: '#004d99'},
            {value: '14', color: '#004080'},
            {value: '15', color: '#003366'},
            {value: '16', color: '#00264d'},
            {value: '17', color: '#001a33'},
            {value: '18', color: '#000d1a'},
            {value: '19', color: '#000000'},
            {value: '20', color: '#000000'},
        ],
        colorValuePath: 'projects',
        onClick: shapeSelected
    };

    let template = '<div id="tooltemplate" class="bg-white rounded-xl p-2"><h1 class="kanit-bold">${country}</h1><h1 class="kanit-semibold">${projects} projekt</h1></div>';

    const onMapsLoad = () => {
        let maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    const load = (args) => {
    };
    //tslint:disable
    const tooltipRender = (args) => {
        if (!args.options['data']) {
            args.cancel = true;
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setNumberOfMonths(window.innerWidth < 640 ? 1 : 3);
        }
    }, []);

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
                const intervals = projects.map(project => [
                    new DateObject().set({
                        year: new Date(project.startDate).getFullYear(),
                        month: new Date(project.startDate).getMonth() + 1,
                        day: new Date(project.startDate).getDate()
                    }),
                    new DateObject().set({
                        year: new Date(project.endDate).getFullYear(),
                        month: new Date(project.endDate).getMonth() + 1,
                        day: new Date(project.endDate).getDate()
                    })
                ]);
                setProjectIntervals(intervals)
                setCountriesLocal([...new Set(projects.map(project => project.country))].map(country => ({
                    label: country,
                    key: countries.getAlpha2Code(country, "hu")
                })))
                setOrganizations([...new Set(projects.map(project => project.organization).filter(Boolean))].map(organization => ({
                    label: organization,
                    key: snakeCase(removeAccents(organization))
                })));
                setTypes([...new Set(projects.map(project => project.type))].map(type => ({
                    label: type,
                    key: snakeCase(removeAccents(type))
                })))
                setIsLoading(false)
            })
            .catch(error => {
                console.error('Error fetching projects:', error)
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchProjects()
    }, []);

    const getProjectTitles = (date) => {
        const normalizeDate = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const normalizedDate = normalizeDate(date);

        return projects
            .filter(project => {
                const start = normalizeDate(new Date(project.startDate));
                const end = normalizeDate(new Date(project.endDate));
                return normalizedDate >= start && normalizedDate <= end;
            })
    }

    const mapDays = ({date, today}) => {
        const projectTitlesRaw = getProjectTitles(date.toDate());
        const projectTitles = projectTitlesRaw.map(project => project.title);
        return {
            children: projectTitles.length > 0 ? (
                window.innerWidth < 640 ?
                    <Popover showArrow={true}>
                        <PopoverTrigger>
                            <div>{date.day}</div>
                        </PopoverTrigger>
                        <PopoverContent className="items-start"
                                        onClick={() => redirect(`/projects/${projectTitlesRaw[0].id}`)}>
                            {projectTitles.join(', ')}
                            <p className="text-xs text-blue-900">Részletekért kattints</p>
                        </PopoverContent>
                    </Popover>
                    :
                    <Tooltip content={projectTitles.join(', ')} showArrow={true}>
                        <div onClick={() => redirect(`/projects/${projectTitlesRaw[0].id}`)}>{date.day}</div>
                    </Tooltip>
            ) : (
                <div>{date.day}</div>
            )
        };
    };

    const viewChange = (value) => {
        setSelectedView(value)
        redirect('/projects?view=' + value)
    }

    useEffect(() => {
        if (searchParams.get('view') === 'filter') {
            router.push('/projects?view=filter&country=' + selectedCountry + '&type=' + selectedType + '&organization=' + selectedOrganization, {shallow: true});
        }
    }, [projects, selectedCountry, selectedOrganization, selectedType]);

    const filterProjects = () => {
        let filtered = projects;
        if (selectedCountry) {
            filtered = filtered.filter(project => countries.getAlpha2Code(project.country, "hu") === selectedCountry);
        }
        if (selectedOrganization) {
            filtered = filtered.filter(project =>
                project.organization && snakeCase(removeAccents(project.organization)) === selectedOrganization
            );
        }
        if (selectedType) {
            filtered = filtered.filter(project => snakeCase(removeAccents(project.type)) === selectedType);
        }
        setFilteredProjects(filtered);
    }

    useEffect(() => {
        filterProjects();
    }, [projects, selectedCountry, selectedOrganization, selectedType]);

    const createProject = async () => {
        await fetch(`/api/projectsapi`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...createdProject})
        })
            .then(response => response.json())
            .then(createdProject => {

            })
            .catch(error => {
                console.error('Error creating project:', error);
            });
    };

    const handleDelete = async (fileName) => {
        try {
            const response = await fetch(`/api/projectsapi/project/infopack?fileName=${fileName}`, {method: 'DELETE'});
            if (response.ok) {
                console.log("File deleted successfully");
                setCreatedProject({...createdProject, infopack: null});
            } else {
                console.error("Error deleting file");
            }
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    return (
        <>
            <Modal isOpen={isCreationModalOpen} size="lg" onClose={onCreationModalClose} scrollBehavior="outside"
                   backdrop="blur" isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <ModalBody className="">
                            <Input
                                variant="underlined"
                                color="primary"
                                size="lg"
                                isClearable
                                label="Cím"
                                value={createdProject.title}
                                onValueChange={(value) => setCreatedProject({...createdProject, title: value})}
                                classNames={{
                                    input: "kanit-bold text-4xl text-center mt-2",
                                    mainWrapper: "w-full self-center sm:mt-2 "
                                }}
                                fullWidth={false}
                            ></Input>
                            <Select
                                errorMessage={createdProject.type || !touched ? "" : "Választanod kell egy projekt típust!"}
                                isInvalid={!(createdProject.type || !touched)}
                                onClose={() => setTouched(true)}
                                variant="underlined"
                                color="primary"
                                label="Típus"
                                isRequired
                                onSelectionChange={(selected) => setCreatedProject({
                                    ...createdProject,
                                    type: selected.anchorKey
                                })}
                                selectedKeys={[createdProject.type]}
                                classNames={{
                                    value: "pl-7 !text-gray-600 text-xl text-center",
                                    mainWrapper: "w-full self-center"
                                }}
                            >
                                {projectTypes.map((type) => (
                                    <SelectItem key={type}>{type}</SelectItem>
                                ))}
                            </Select>
                            <Autocomplete
                                defaultItems={uniqueOrganizations.map(org => ({
                                    key: org,
                                    label: org
                                }))}
                                allowsCustomValue
                                label="Egyesület"
                                placeholder="Válassz egy egyesületet vagy adj meg újat"
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
                                        setCreatedProject({...createdProject, organization: organizationValue.name});
                                        setUniqueOrganizations([...uniqueOrganizations, organizationValue.name]);
                                    }
                                }}
                                onSelectionChange={(key, label) => {
                                    const orga = key ? uniqueOrganizations.find(org => org === key) : null;
                                    console.log(orga)
                                    if (orga) {
                                        setCreatedProject({...createdProject, organization: orga});
                                        setOrganizationValue({id: orga, name: orga});
                                    }
                                }}
                            >
                                {(org) => <AutocompleteItem key={org.key}>
                                    {org.label}
                                </AutocompleteItem>}
                            </Autocomplete>
                            <Autocomplete
                                errorMessage={createdProject.country && createdProject.country.length > 0 || !touched ? "" : "Választanod kell egy országot!"}
                                isInvalid={createdProject.country && createdProject.country.length > 0 || !touched ? false : true}
                                onClose={() => setTouched(true)}
                                defaultItems={europeanCountries}
                                label="Ország"
                                isRequired
                                color="primary"
                                variant="underlined"
                                defaultSelectedKey={createdProject.country ? countries.getAlpha2Code(createdProject.country, 'hu').toLowerCase() : null}
                                onSelectionChange={(selected) => setCreatedProject({
                                    ...createdProject,
                                    country: countries.getName(selected, 'hu') ? countries.getName(selected, 'hu') : null
                                })}
                                startContent={createdProject.country &&
                                    <Avatar alt="flag" className="!w-6 !h-6 min-w-[24px]"
                                            src={`https://flagcdn.com/${countries.getAlpha2Code(createdProject.country, 'hu').toLowerCase()}.svg`}/>}
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
                            <Input
                                isClearable
                                variant="underlined"
                                color="primary"
                                value={createdProject.location}
                                onValueChange={(value) => setCreatedProject({
                                    ...createdProject,
                                    location: value
                                })}
                                label="Város"
                            >
                            </Input>
                            <iframe className="mt-2" width="300" height="300"
                                    style={{border: '0'}}
                                    loading="lazy"
                                    allowFullScreen
                                    src={`https://www.google.com/maps/embed/v1/place?q=${createdProject.location},${createdProject.country}&key=AIzaSyBQpb-zeHME6F8U4pDQIMpZ3gx3ScgnfuE`}>
                            </iframe>
                            <RangeCalendar
                                calendarWidth={300}
                                color="primary"
                                value={{
                                    start: parseDate(new Date(createdProject.startDate).toISOString().split('T')[0]),
                                    end: parseDate(new Date(createdProject.endDate).toISOString().split('T')[0])
                                }}
                                onChange={(value) => setCreatedProject({
                                    ...createdProject,
                                    startDate: new Date(value.start),
                                    endDate: new Date(value.end)
                                })}
                            />
                            <Dropzone onDrop={acceptedFiles => {
                                const randomCode = Math.floor(1000000 + Math.random() * 9000000);
                                const file = acceptedFiles[0];
                                const fileNameParts = file.name.split('.');
                                const newFileName = `${fileNameParts[0]}_${randomCode}.${fileNameParts[1]}`;
                                const newFile = new File([file], newFileName, {type: file.type});
                                formData.append("file", newFile);
                                setCreatedProject({...createdProject, infopack: newFile.name});
                            }}>
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <div {...getRootProps()}
                                             className="border-3 border-blue-800 h-[10rem] rounded-xl cursor-pointer flex flex-col gap-2 justify-center items-center">
                                            <input {...getInputProps()} />
                                            <p className="text-gray-700">Húzd ide a pdf fájlt, vagy kattints ide és
                                                tallózd ki</p>
                                            <MdPictureAsPdf size="2em" className="text-gray-500"/>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                            {createdProject.infopack &&
                                <div className="flex flex-row gap-2">
                                    <Chip className="pl-3" startContent={<FaFilePdf/>}
                                          color="primary">{createdProject.infopack}</Chip>
                                    <Chip onClick={() => {
                                        setCreatedProject({...createdProject, infopack: null})
                                        setFormData(new FormData());
                                    }}
                                          className="pl-3 cursor-pointer" startContent={<BiSolidXCircle/>}
                                          color="danger">Törlés</Chip>
                                </div>

                            }

                            <div className="flex flex-row gap-2 justify-end">
                                <Button variant="ghost" color="primary" radius="full"
                                        onPress={onCreationModalClose}>
                                    Mégse
                                </Button>
                                <Button variant="ghost" color="success" radius="full" onPress={() => {
                                    if (createdProject.infopack) uploadFile(formData)
                                    createProject().then(() => {
                                        window.location.reload();
                                    });
                                }}>
                                    Mentés
                                </Button>
                            </div>
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
            <div className="mx-5">
                <h1 className="mt-5 title text-center">Projektek</h1>
                {isLoading ? <div className="text-center">
                        <Spinner color="primary" size="lg" className="pt-20"/>
                    </div> :
                    <>
                        <div className="flex flex-row gap-2 items-center">
                            <div className="w-4/5">
                                <RadioGroup label="Válassz nézetet:" value={selectedView} onValueChange={viewChange}
                                            orientation="horizontal"
                                            color="primary" className="my-4">
                                    <Radio value="calendar" className="mr-1">Naptár</Radio>
                                    <Radio value="map" className="mr-1">Térkép</Radio>
                                    <Radio value="filter">Szűrő</Radio>
                                </RadioGroup></div>
                            <div className="w-1/5 text-end">
                                <Button startContent={<BiSolidAddToQueue size="1.3em"/>} color="primary" radius="full"
                                        variant="ghost" onPress={onCreationModalOpen}>
                                    Új projekt
                                </Button>
                            </div>
                        </div>
                        {
                            selectedView === "calendar" && (
                                <Calendar
                                    value={projectIntervals}
                                    onChange={setProjectIntervals}
                                    readOnly={true}
                                    multiple
                                    range
                                    weekStartDayIndex={1}
                                    locale={gregorian_hu}
                                    currentDate={new DateObject()}
                                    mapDays={mapDays}
                                    className="mx-auto"
                                    numberOfMonths={window.innerWidth < 640 ? 1 : 3}
                                />
                            )
                        }
                        {
                            selectedView === "map" && (
                                <div className="w-[95vw] md:w-[70vw] h-[70vh] md:h-[90vh] mb-12">
                                    <MapsComponent id="maps" tooltipRender={tooltipRender} loaded={onMapsLoad} load={load}
                                                   itemSelection={shapeSelected}
                                                   background='#F2F2F2'
                                                   zoomSettings={{enable: false}} height="100%" width="100%" mapsArea={{
                                        background: '#F2F2F2',
                                        border: {
                                            width: 0,
                                            color: '#F2F2F2'
                                        }
                                    }}>
                                        <Inject services={[MapsTooltip, Selection]}/>
                                        <LayersDirective>
                                            <LayerDirective shapeData={filteredGeoJson} shapePropertyPath='name'
                                                            shapeDataPath='name' dataSource={datasource} tooltipSettings={{
                                                visible: true,
                                                valuePath: 'name',
                                                template: template
                                            }} shapeSettings={shapeSetting} selectionSettings={{
                                                enable: true,
                                                fill: 'black',
                                            }}/>
                                        </LayersDirective>
                                    </MapsComponent>
                                </div>
                            )
                        }
                        {
                            selectedView === "filter" && (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col sm:flex-row gap-4 items-center" id="filter">
                                        <Autocomplete
                                            defaultItems={countriesLocal}
                                            label="Ország"
                                            placeholder="Keress ország szerint"
                                            color="primary"
                                            variant="bordered"
                                            defaultSelectedKey={selectedCountry || null}
                                            onSelectionChange={(selected) => setSelectedCountry(selected)}
                                            fullWidth
                                        >
                                            {(country) => <AutocompleteItem key={country.key} startContent={
                                                <Avatar alt="flag" className="w-6 h-6"
                                                        src={`https://flagcdn.com/${snakeCase(country.key)}.svg`}/>
                                            }>
                                                {country.label}
                                            </AutocompleteItem>}
                                        </Autocomplete>
                                        <Autocomplete
                                            defaultItems={types}
                                            label="Fajták"
                                            placeholder="Keress projekt fajta szerint"
                                            color="primary"
                                            variant="bordered"
                                            defaultSelectedKey={selectedType || null}
                                            onSelectionChange={(selected) => setSelectedType(selected)}
                                            fullWidth
                                        >
                                            {(type) => <AutocompleteItem key={type.key}>{type.label}</AutocompleteItem>}
                                        </Autocomplete>
                                        <Autocomplete
                                            defaultItems={organizations}
                                            label="Egyesület"
                                            placeholder="Keress egyesület szerint"
                                            color="primary"
                                            variant="bordered"
                                            defaultSelectedKey={selectedOrganization || null}
                                            onSelectionChange={(selected) => setSelectedOrganization(selected)}
                                            fullWidth
                                        >
                                            {(organization) => <AutocompleteItem
                                                key={organization.key}>{organization.label}</AutocompleteItem>}
                                        </Autocomplete>
                                    </div>
                                    <div className="flex flex-col gap-3 mb-14">
                                        {filteredProjects.length === 0 ? (
                                                <p className="text-center mt-14 text-gray-700">Ilyen feltételekkel nincs
                                                    rögzített projektünk!</p>
                                            ) :
                                            filteredProjects.map(project => (
                                                <Card key={project.id} isPressable
                                                      onPress={() => redirect(`/projects/${project.id}`)}>
                                                    <CardBody>
                                                        <div className="flex flex-row">
                                                            <div className="flex flex-col w-3/5 sm:w-1/2">
                                                                <h2 className="kanit-bold text-xl">{project.title}</h2>
                                                                <p className="text-gray-700">{project.type}</p>
                                                                <div className="flex flex-row gap-1 text-blue-900">
                                                                    <p className=" text-sm">Részletek
                                                                        megtekintéséhez kattints!</p>
                                                                    <TbHandClick/>
                                                                </div>

                                                            </div>
                                                            <div
                                                                className="flex flex-col items-end text-end w-2/5 sm:w-1/2">
                                                                <p>{new Date(project.startDate).toLocaleDateString('hu-HU', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })} - {new Date(project.endDate).toLocaleDateString('hu-HU', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}</p>
                                                                <div className="flex flex-row gap-2">
                                                                    <p>{project.country}</p>
                                                                    <Avatar alt="flag" className="w-6 h-6"
                                                                            src={`https://flagcdn.com/${snakeCase(countries.getAlpha2Code(project.country, 'hu'))}.svg`}/>
                                                                </div>
                                                                <p>{project.organization}</p>

                                                            </div>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            ))}
                                    </div>
                                </div>
                            )
                        }
                    </>
                }
            </div>
        </>
    )
        ;
}