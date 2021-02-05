import { IUserState } from "../../redux/reducers/user.reducer"

// Singeltone class
// Created to simplify interraction with local storage
export class LocalStorage
{
    private static _instance: LocalStorage

    private constructor()
    {}

    // check is we in web browser or server
    public get isOnClient() : boolean {
        return (typeof window !== 'undefined')
    }
    public static get Instance()
    {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this())
    }
    public get authToken(): string {
        if (this.isOnClient){
            const user: IUserState = JSON.parse(localStorage.getItem('user'))
            return user.token
        }
        return ''
    }
    public set authToken(token: string) {
        if (this.isOnClient){
            const user: IUserState = JSON.parse(localStorage.getItem('user'))
            user.token = token
            localStorage.setItem('user', JSON.stringify(user))
        }
    }
    public set user(user: IUserState) {
        if (this.isOnClient){
            localStorage.setItem('user', JSON.stringify(user))
        }
    }
    public get user(): IUserState {
        if (this.isOnClient){
            const user: IUserState = JSON.parse(localStorage.getItem('user'))
            return user
        }
    }

}

// example how to get instance
// const myClassInstance = MyClass.Instance