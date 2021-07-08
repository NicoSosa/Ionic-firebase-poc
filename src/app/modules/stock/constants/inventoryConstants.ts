import { FormType, FormTypeDescript } from '../../../infrastructure/enum/formType.enum';

export const WEEK_INVENTORY_TITLE_NAME: string = 'Week Inventory'
export const DAILY_INVENTORY_TITLE_NAME: string = 'Daily Inventory'
export const VIEW_TITLE_NAME: string = 'View Inventory'
export const STOCK_URL = 'stock';
export const INVENTORY_SAVE_MSG = 'The inventory has been saved';

export const ALERT_TYPE_OF_FORM_DATA = {
    header: 'Which inventory do you want to generate?',
    inputs: [
    {
        cssClass: 'one-option-item',
        name: FormTypeDescript.get(FormType.Weekly),
        type: 'radio',
        label: FormTypeDescript.get(FormType.Weekly),
        value: FormType.Weekly,
        handler: () => {},
    },
    {
        cssClass:'one-option-item',
        name: FormTypeDescript.get(FormType.Daily),
        type: 'radio',
        label: FormTypeDescript.get(FormType.Daily),
        value: FormType.Daily,
        handler: () => {}
    }],
}