export const ADMIN_PAGE_TITLE_TOOLBAR = 'Administrator';
export const ADMIN_ITEM_TITLE_TOOLBAR = 'Items Administrator';
export const ADMIN_PRODUCTS_TITLE_TOOLBAR = 'Products Administrator';
export const ADMIN_STORES_TITLE_TOOLBAR = 'Stores Administrator';
export const ADMIN_USERS_TITLE_TOOLBAR = 'Users Administrator';

export const ADMIN_URL = 'admin';

export interface AdminPageCard {
    title: string;
    description: string;
    description2?: string;
    url: string;
    icon: string;
};
export const ADMIN_PAGE_CARDS: AdminPageCard[] = [
    { title: 'Products', description: 'Create, Delete or update Products', url: 'products', icon: 'pricetag' },
    { title: 'Items', description: 'Create, Delete or update utility items', url: 'items', icon: 'pint' },
    { title: 'Stores', description: 'Create, Delete or update Stores', url: 'stores', icon: 'storefront' },   
    { title: 'Users', description: 'Create, Delete or update Users', url: 'users', icon: 'people' },   
];