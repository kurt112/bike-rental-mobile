import {UserCreate} from "./user";

export interface NotificationType {
    id: number,
    message: string,
    createdAt: string,
    link: string,
    from: UserCreate
}
