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

export const MASIVE_OPTIONS: ChangeOptions[] = [{
    optionDescript: 'Reoder Items',
    active: true
},{
    optionDescript: 'Delete Items',
    active: false
},{
    optionDescript: 'Create Items',
    active: false
},
]