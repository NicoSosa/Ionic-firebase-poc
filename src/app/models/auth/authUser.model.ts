export interface AuthUser {
    uid: string;
    email: string;
    displayName?: string;
    isInventoryAdmin?: boolean;
    isInventoryUser?: boolean;
}