export interface IMembersList {
    count: number;
    next: string;
    previous: string;
    results: IMember[];
}

export interface IMember {
    id: number;
    employee: {
        id: number;
        user: {
            id: number;
            username: string;
            full_name: string;
        };
        position: {
            code: string;
            name: string;
        }
    };
    date_joined: string;
}