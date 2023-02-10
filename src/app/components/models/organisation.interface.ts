export interface IOrganisationsList {
    count: number;
    next: string;
    previous: string;
    results: IOrganisation[];
}

export interface IOrganisation {
    id: number;
    name: string;
    director: {
        id: number;
        username: string;
        full_name: string;
    };
    pax: number;
    groups_count: number;
    created_at: string;
    can_manage: boolean;
}

export interface IOrganisationRequest {
    name: string;
}

export interface IOrganisationResponse {
    id: number;
    name: string;
}