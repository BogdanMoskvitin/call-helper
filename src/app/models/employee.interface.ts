export interface IEmployeesList {
    count: number;
    next: string;
    previous: string;
    results: IEmployee[];
}

export interface IEmployee  {
    id: number;
    date_joined: string;
    user: {
        id: number;
        username: string;
        full_name: string;
        email: string;
        phone_number: string;
        is_corporate_account: boolean;
    };
    position: {
        code: string;
        name: string;
    };
}

export interface IEmployeeRequest {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    position: string;
}

export interface IEmployeeResponse {
    id: number;
    position: string;
}