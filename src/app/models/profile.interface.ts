export interface IProfile {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    username: string;
    profile: {
        telegram_id: string;
    }
    date_joined?: string;
}