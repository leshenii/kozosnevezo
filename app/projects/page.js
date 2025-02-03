'use client'

import {useEffect, useState} from "react";
import {DateObject, Calendar} from "react-multi-date-picker";
import {Popover, PopoverContent, PopoverTrigger, Radio, RadioGroup, Spinner, Tooltip } from "@heroui/react";
import gregorian_hu from "../lib/gregorian_hu";
import { MapsComponent, Inject, LayersDirective, LayerDirective, MapsTooltip } from '@syncfusion/ej2-react-maps';
import * as data from '../lib/tooltip-datasource.json';
import * as worldMap from '../lib/world-map.json';
let datasource = data;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export default function ProjectsPage() {

    const europeanFeatures = worldMap.features.filter(
        feature => feature.properties.continent === 'Europe'
    );

    // Create a valid GeoJSON object containing only the European features
    const filteredGeoJson = {
        type: 'FeatureCollection',
        features: europeanFeatures
    };

    const [projects, setProjects] = useState([])
    const [projectIntervals, setProjectIntervals] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [numberOfMonths, setNumberOfMonths] = useState(3);
    const [selectedView, setSelectedView] = useState("calendar");

    let template = '<div id="tooltemplate" ><h1 className="kanit-bold">${country}</h1></div>';
    let shapeSetting = {
        fill: 'lightgrey',
        colorMapping: [
            { value: '1', color: '#b3daff' },
            { color: '#80c1ff', value: '2' },
            { color: '#1a90ff', value: '3' },
            { color: '#005cb3', value: '7' },
        ],
        colorValuePath: 'value1',
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
        await fetch('/api/projects', {
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

    return (
        <div className="">
            <h1 className="mt-5 title text-center">Projektek</h1>
            {isLoading ? <div className="text-center"><Spinner color="primary" size="lg" className="pt-20"/></div> :
                <>
                    <RadioGroup label="Válassz nézetet:" value={selectedView} onValueChange={setSelectedView} orientation="horizontal"
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
                            <MapsComponent id="maps" tooltipRender={tooltipRender} loaded={onMapsLoad} load={load} zoomSettings={{ enable: false }} height="100%" width="150%" titleSettings={{ text: 'Finalist in Cricket World Cup', textStyle: { size: '16px' } }}>
                                <Inject services={[MapsTooltip]}/>
                                <LayersDirective>
                                    <LayerDirective shapeData={filteredGeoJson} shapePropertyPath='name' shapeDataPath='name' dataSource={datasource} tooltipSettings={{ visible: true, valuePath: 'name', template: template }} shapeSettings={shapeSetting}/>
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