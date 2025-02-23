'use client'

import {useEffect, useState} from "react";
import {DateObject, Calendar} from "react-multi-date-picker";
import {
    Autocomplete, AutocompleteItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Radio,
    RadioGroup,
    Spinner,
    Tooltip,
    Avatar, Card, CardBody
} from "@heroui/react";
import gregorian_hu from "../lib/gregorian_hu";
import {MapsComponent, Inject, LayersDirective, LayerDirective, MapsTooltip, Selection } from '@syncfusion/ej2-react-maps';
import * as data from '../lib/tooltip-datasource.json';
import * as worldMap from '../lib/world-map.json';
import {useRouter, redirect, useSearchParams} from 'next/navigation'
import {snakeCase} from "snake-case";
import removeAccents from 'remove-accents';
import countries from 'i18n-iso-countries';
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/hu.json"));

let datasource = data;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export default function ProjectsPage() {

    const router = useRouter()

    const europeanFeatures = worldMap.features.filter(
        feature => feature.properties.continent === 'Europe'
    );

    const filteredGeoJson = {
        type: 'FeatureCollection',
        features: europeanFeatures
    };

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

    const shapeSelected = (args) => {

        if (args.data) {
            const country = args.data.name;
            setSelectedCountry(countries.getAlpha2Code(country, "en"));
            setSelectedView('filter');
            router.push('/projects?view=filter&country=' + countries.getAlpha2Code(country, "en"), { shallow: true });
        }

        //redirect('/projects?view=filter&country=' + countries.getAlpha2Code(country, "en"));
    };

    const shapeSetting = {
        fill: 'lightgrey',
        colorMapping: [
            { value: '1', color: '#cce5ff' },
            { value: '2', color: '#b3daff' },
            { value: '3', color: '#99ccff' },
            { value: '4', color: '#80bfff' },
            { value: '5', color: '#66b2ff' },
            { value: '6', color: '#4da6ff' },
            { value: '7', color: '#3399ff' },
            { value: '8', color: '#1a8cff' },
            { value: '9', color: '#007fff' },
            { value: '10', color: '#0073e6' },
            { value: '11', color: '#0066cc' },
            { value: '12', color: '#0059b3' },
            { value: '13', color: '#004d99' },
            { value: '14', color: '#004080' },
            { value: '15', color: '#003366' },
            { value: '16', color: '#00264d' },
            { value: '17', color: '#001a33' },
            { value: '18', color: '#000d1a' },
            { value: '19', color: '#000000' },
            { value: '20', color: '#000000' },
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
            .map(project => project.title);
    }

    const mapDays = ({date, today}) => {
        const projectTitles = getProjectTitles(date.toDate());
        return {
            children: projectTitles.length > 0 ? (
                window.innerWidth < 640 ?
                    <Popover showArrow={true}>
                        <PopoverTrigger>
                            <div>{date.day}</div>
                        </PopoverTrigger>
                        <PopoverContent>
                            {projectTitles.join(', ')}
                        </PopoverContent>
                    </Popover>
                    :
                    <Tooltip content={projectTitles.join(', ')} showArrow={true}>
                        <div>{date.day}</div>
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
            router.push('/projects?view=filter&country=' + selectedCountry + '&type=' + selectedType + '&organization=' + selectedOrganization, { shallow: true });
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

    return (
        <div className="mx-5">
            <h1 className="mt-5 title text-center">Projektek</h1>
            {isLoading ? <div className="text-center">
                    <Spinner color="primary" size="lg" className="pt-20"/>
                </div> :
                <>
                    <RadioGroup label="Válassz nézetet:" value={selectedView} onValueChange={viewChange}
                                orientation="horizontal"
                                color="primary" className="my-4">
                        <Radio value="calendar" className="mr-1">Naptár</Radio>
                        <Radio value="map" className="mr-1">Térkép</Radio>
                        <Radio value="filter">Szűrő</Radio>
                    </RadioGroup>
                    {selectedView === "calendar" && (
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
                    )}
                    {selectedView === "map" && (
                        <div className="w-[95vw] md:w-[70vw] h-[70vh] md:h-[90vh] mb-12">
                            <MapsComponent id="maps" tooltipRender={tooltipRender} loaded={onMapsLoad} load={load} itemSelection={shapeSelected}
                                           background='#F2F2F2'
                                           zoomSettings={{enable: false}} height="100%" width="100%" mapsArea={{
                                background: '#F2F2F2',
                                border: {
                                    width: 0,
                                    color: '#F2F2F2'
                                }
                            }}>
                                <Inject services={[MapsTooltip, Selection]} />
                                <LayersDirective>
                                    <LayerDirective shapeData={filteredGeoJson} shapePropertyPath='name'
                                                    shapeDataPath='name' dataSource={datasource} tooltipSettings={{
                                        visible: true,
                                        valuePath: 'name',
                                        template: template
                                    }} shapeSettings={shapeSetting} selectionSettings={ {
                                        enable: true,
                                        fill: 'black',
                                    } }/>
                                </LayersDirective>
                            </MapsComponent>
                        </div>
                    )}
                    {selectedView === "filter" && (
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
                                        <Avatar alt="flag" className="w-6 h-6" src={`https://flagcdn.com/${snakeCase(country.key)}.svg`} />
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
                                {filteredProjects.map(project => (
                                    <Card key={project.id} isPressable>
                                        <CardBody>
                                            <div className="flex flex-row">
                                                <div className="flex flex-col w-3/5 sm:w-1/2">
                                                    <h2 className="kanit-bold text-xl">{project.title}</h2>
                                                    <p className="text-gray-700">{project.type}</p>
                                                    <p className="text-blue-900 text-sm" >Részletek megtekintéséhez kattints!</p>
                                                </div>
                                                <div className="flex flex-col items-end text-end w-2/5 sm:w-1/2">
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
                    )}
                </>
            }
        </div>
    );
}