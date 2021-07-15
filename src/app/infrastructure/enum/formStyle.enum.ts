export enum FormStyle {
    InputPlusSlider = 0,
    OnlyInput = 1,
    IsNeededInput = 2,
    IsNeededAndHide = 3,
    IsNeededOnly = 4,
    Final = 5,
}

export const FormStyleDescript = new Map<number, string> ([
    [FormStyle.InputPlusSlider ,'Slider'], // 0
    [FormStyle.OnlyInput ,'Only Input'], // 1
    [FormStyle.IsNeededInput ,'Is Needed Input'], // 2
    [FormStyle.IsNeededAndHide ,'Is Needed And Hide'], // 2
    [FormStyle.IsNeededOnly ,'Is Needed Only'], // 2
    [FormStyle.Final ,'Final'], // 2
]);

