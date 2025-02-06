'use client'

import {useEffect, useState} from "react";
import {DateObject, Calendar} from "react-multi-date-picker";
import {Popover, PopoverContent, PopoverTrigger, Radio, RadioGroup, Spinner, Tooltip} from "@heroui/react";
import gregorian_hu from "../../lib/gregorian_hu";
import {MapsComponent, Inject, LayersDirective, LayerDirective, MapsTooltip} from '@syncfusion/ej2-react-maps';
import * as data from '../../lib/tooltip-datasource.json';
import * as worldMap from '../../lib/world-map.json';
import {useRouter, usePathname, redirect, useSearchParams} from 'next/navigation'

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
    const [selectedView, setSelectedView] = useState(searchParams.get('view'));


    let template = '<div id="tooltemplate" class="bg-white rounded-xl p-2"><h1 class="kanit-bold">${country}</h1><h1 class="kanit-semibold">${projects} projekt</h1></div>';
    let shapeSetting = {
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
    };
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

    return (
        <div className="">
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
                        <div className="w-full">
                            <MapsComponent id="maps" tooltipRender={tooltipRender} loaded={onMapsLoad} load={load} background='#F2F2F2'
                                           zoomSettings={{enable: false}} height="700px" width="600px" mapsArea={{
                                background: '#F2F2F2',
                                border: {
                                    width: 0,
                                    color: '#F2F2F2'
                                }
                            }}>
                                <Inject services={[MapsTooltip]}/>
                                <LayersDirective>
                                    <LayerDirective shapeData={filteredGeoJson} shapePropertyPath='name'
                                                    shapeDataPath='name' dataSource={datasource} tooltipSettings={{
                                        visible: true,
                                        valuePath: 'name',
                                        template: template
                                    }} shapeSettings={shapeSetting}/>
                                </LayersDirective>
                            </MapsComponent>
                        </div>
                    )}
                    {selectedView === "filter" && (
                        <div id="filter">
                            {/* Add your filter component or content here */}
                        </div>
                    )}
                </>
            }
        </div>
    );
}