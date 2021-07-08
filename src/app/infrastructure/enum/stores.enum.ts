export enum StoresName {
    RVS = 0,
    LGE = 1,
    HWD = 2,
}

// storeAbv = StoresAbvDescript.get(StoresName.RVS)
export const StoresAbvDescript = new Map<number, StoreAbv> ([
    [StoresName.RVS ,'RVS'], // 0
    [StoresName.LGE ,'LGE'], // 1
    [StoresName.HWD ,'HWD'], // 2
]);

export const StoresNameDescript = new Map<number, StoreName> ([
    [StoresName.RVS ,'Riverside'], // 0
    [StoresName.LGE ,'La Grange'], // 1
    [StoresName.HWD ,'Homewood'], // 2
]);

export const StoresIdDescript = new Map<number, string> ([
    [StoresName.RVS ,'c556b629-e72b-4837-b481-349352afa870'], // 0
    [StoresName.LGE ,'83ed22cb-9166-437f-8eb0-c5e536e24303'], // 1
    [StoresName.HWD ,'9ce6aa2b-9e35-4f14-89eb-0215890afb12'], // 2
]);

export type StoreAbv = 'RVS'|'LGE'|'HWD';
export type StoreName = 'Riverside'|'La Grange'|'Homewood'; 