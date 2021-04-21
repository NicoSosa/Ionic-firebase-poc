export interface ChangeOptions {
    optionDescript: string;
    active: boolean;
}

export const CHANGE_OPTIONS: ChangeOptions[] = [{
    optionDescript: 'Create/Update',
    active: true
},{
    optionDescript: 'Reoder Pages',
    active: false
},{
    optionDescript: 'Reoder Categories',
    active: false
},
]