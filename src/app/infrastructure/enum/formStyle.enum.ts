export enum FormStyle {
    InputPlusSlider = 0,
    OnlyInput = 1,
    IsNeededInput = 2,
    Final = 3,
}

const FormStyleDescript = new Map<number, string> ([
    [FormStyle.InputPlusSlider ,'En Progreso'], // 0
    [FormStyle.OnlyInput ,'Entregado'], // 1
    [FormStyle.IsNeededInput ,'Cancelado'], // 2
]);

