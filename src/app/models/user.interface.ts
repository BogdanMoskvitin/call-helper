export interface IUsersList {
    count: number;
    next: string;
    previous: string;
    results: IUser[];
}

export interface IUser {
    id: number;
    username: string;
    full_name: string;
}