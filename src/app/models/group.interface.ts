export interface IGroupsList {
    count: number;
    next: string;
    previous: string;
    results: IGroup[];
}

export interface IGroup {
    id: number;
    breaks_info: {
        min_active: number;
        break_start: string;
        break_end: string;
        break_max_duration: number;
    };
    name: string;
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
    organisation: {
        id: number;
        name: string;
    };
    pax: number;
    created_at: string;
    can_manage: boolean;
    is_member: boolean;
}

export interface IGroupRequest {
    organisation: number;
    manager: number;
    name: string;
}

export interface IGroupResponse {
    id: number;
    organisation: number;
    manager: number;
    name: string;
}