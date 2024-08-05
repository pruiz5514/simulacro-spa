export interface ICreateUser {
    email: string;
    password: string;
}

export interface ICreateUserResponse {
    id: number;
    token: string;
}