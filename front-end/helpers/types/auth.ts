export interface IUser {
    username: string,
    email: string,
    secondName: string,
    lastName: string,
    phone: string,
    birthday: string | Date
}
export interface IUserLogin{
    email: string,
    password: string,
}
export interface IUserRegister extends IUser{
    confirmPassword: string,
    password: string,
}