export interface IResponse<Data = string, Error = string, Message = string> {
    message: Message
    error: Error
    data: Data
}