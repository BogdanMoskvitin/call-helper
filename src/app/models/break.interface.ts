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
        breaks_count: number;
        members_break: number;
        members_busy: number;
        members_count: number;
        members_offline: number;
        members_online: number;
    };
    new_stats: string;
    personal_stats: {
        time_break_end: string;
        time_break_start: string;
        time_offline: string;
        time_online: string;
        time_until_break: string;
    };
    breaks: {
        info: {
            break_end: string;
            break_start: string;
        };
        button: string;
    };
    actions: {
        break_button: string;
        replacement_button: string;
    };
    members: IMember[];
    general: {
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
                    full_name: string
                };
                position: {
                    code: string;
                    name: string;
                    color: string;
                };
            };
        };
        date: string;
        break_start: string;
        break_end: string;
        break_max_duration: number;
        min_active: number;
    }
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

interface IMember {
    id: string;
    full_name: string;
    username: string;
    email: string;
    status: {
        code: string;
        name: string;
        color: string;
    };
    description: string;
}