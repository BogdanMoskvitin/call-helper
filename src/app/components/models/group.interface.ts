export interface IGroupsList {
    count: number;
    next: string;
    previous: string;
    results: IGroup[];
}

export interface IGroup {
    id: number;
    name: string;
    manager: {
        id: number;
        username: string;
        full_name: string;
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