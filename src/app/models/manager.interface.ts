export interface IManager {
    id: number;
    position: {
        code: string;
        name: string;
    };
    user: {
        id: number;
        username: string;
        full_name: string;
        email: string;
        phone_number: string;
        is_corporate_account: boolean;
    };
}