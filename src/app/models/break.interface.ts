export interface IBreaksList {
    count: number;
    next: string;
    previous: string;
    results: IBreak[];
}

export interface IBreak {
    id: number;
    group: {
        id: number;
        name: string;
        organisation: {
            id: number;
            name: string;
        };
        manager: {
            id: number;
            user: {
                id: number;
                username: string;
                full_name: string;
            };
            position: {
                code: string;
                name: string;
            };
        };
    };
    date: string;
    break_start: string;
    break_end: string;
    break_max_duration: number;
    min_active: number;
    stats: {
        all_pax: number;
        created_pax: number;
        confirmed_pax: number;
        on_break_pax: number;
        finished_pax: number;
        cancelled_pax: number;
    };
}

export interface IBreakRequest {
    group: number;
    date: string;
    break_start: string;
    break_end: string;
    break_max_duration: number;
    min_active: number;
    members: number[];
    all_group_members: boolean;
    remember_default_data: boolean;
}

export interface IBreakResponse {
    id: number;
    group: number;
    date: string;
    break_start: string;
    break_end: string;
    break_max_duration: number;
    min_active: number;
    members: number[];
    all_group_members: boolean;
    remember_default_data: boolean;
}