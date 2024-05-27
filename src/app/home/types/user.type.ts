export interface User {
    name: string,
    surname: string,
    address: string,
    city: string,
    state: string,
    pin: string,
    email: string,
    password: string,
}

export interface loginToken {
    token: string;
    expiresInSeconds: number;
    user: loggedUser,
}

export interface loggedUser {
    name: string,
    surname: string,
    address: string,
    city: string,
    state: string,
    pin: string,
}