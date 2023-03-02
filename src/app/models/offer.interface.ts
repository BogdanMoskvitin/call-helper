export interface IOffersList {
    count: number;
    next: string;
    previous: string;
    results: IOffer[];
}

export interface IOffer {
    id: number;
    organisation: {
      id: number;
      name: string;
    };
    org_accept: boolean;
    user_accept: boolean;
    created_at: string;
    updated_at: string;
    can_accept: boolean;
    can_reject: boolean;
}