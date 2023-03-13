export interface ISchedulesList {
    count: number;
    next: string;
    previous: string;
    results: ISchedule[];
}

export interface ISchedule {
    color: string;
    colspan: number;
    value: string;
}