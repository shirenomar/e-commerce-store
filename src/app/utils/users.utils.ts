import { UserRole } from "../enums/user-role.enum";
import { User } from "../models/user";

export class UsersUtils {
    static Users: User[] = [
        {
            name: "user",
            role: UserRole.User,
            password: "user"
        },
        {
            name: "admin",
            role: UserRole.Admin,
            password: "admin"
        }
    ]

    static COLUMNS_SCHEMA = [
        {
            key: "id",
            type: "text",
            disabled: true,
            label: "id"
        },
        {
            key: "title",
            type: "text",
            disabled: false,
            label: "product name"
        },
        {
            key: "category",
            type: "text",
            disabled: false,
            label: "category"
        },
        {
            key: "price",
            type: "number",
            disabled: false,
            label: "price"
        }
    ]

}