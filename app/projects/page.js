'use client'

import {useEffect, useState} from "react";
import {DateObject, Calendar} from "react-multi-date-picker";
import {Spinner, Tooltip} from "@heroui/react";
import gregorian_hu from "../lib/gregorian_hu";

export default function ProjectsPage() {

    const [projects, setProjects] = useState([])
    const [projectIntervals, setProjectIntervals ] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const fetchProjects = async () => {
        await fetch('/api/projects', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(projects => {
                setProjects(projects)
                const intervals = projects.map(project => [
                    new DateObject().set({year: new Date(project.startDate).getFullYear(), month: new Date(project.startDate).getMonth()+1, day: new Date(project.startDate).getDate()}),
                    new DateObject().set({year: new Date(project.endDate).getFullYear(), month: new Date(project.endDate).getMonth()+1, day: new Date(project.endDate).getDate()})
                ]);
                setProjectIntervals(intervals)
                setIsLoading(false)
            })
            .catch(error => {console.error('Error fetching projects:', error)
                setIsLoading(false);});
    }

    useEffect(() => {
        fetchProjects()
    }, []);


    const getProjectTitles = (date) => {
        console.log(date)
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

    const mapDays = ({ date, today }) => {
        const projectTitles = getProjectTitles(date.toDate());
        return {
            children: projectTitles.length > 0 ? (
                <Tooltip content={projectTitles.join(', ')}>
                    <div>{date.day}</div>
                </Tooltip>
            ) : (
                <div>{date.day}</div>
            )
        };
    };

    return (
        <div className="text-center">
            <h1 className="m-5 title text-center">Projektek</h1>
            {isLoading ? <Spinner color="primary" size="lg" className="pt-20"/> :
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
            }
        </div>
    );
}