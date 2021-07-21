import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItemsLogicService {

  constructor() { }

  public controlInput(itemControl: FormControl): void {
      let inputValue = itemControl.get('quantity').value.toString();
      let lastLetter = inputValue.slice(inputValue.length - 1);
      let unitAndDecArrays = inputValue.split(".");
      let commaQuant = unitAndDecArrays.length - 1;
      if( !lastLetter) { 
        // When all data was erased
        itemControl.get('rangeQuantity').setValue(0);
        itemControl.get('quantity').setValue(0);
        // this.fromInput = true;
      } else {
        if ((lastLetter === "." || Number(lastLetter) || lastLetter == 0) && commaQuant < 2 ){
          if( unitAndDecArrays[1] && unitAndDecArrays[1].length > 2) { 
            // if has more than 2 decimals
            let rollBackValue = Number(inputValue.slice(0, -1));
            itemControl.get('quantity').setValue(rollBackValue);
          } else {
            if( lastLetter === "."  && unitAndDecArrays[0].length === 0) {
              // if entered a . and has no number at left
              itemControl.get('rangeQuantity').setValue(0);
              itemControl.get('quantity').setValue("0.");
            } else {
              let value = Number(inputValue);
              itemControl.get('quantity').setValue(value);
              itemControl.get('rangeQuantity').setValue(value);
            }
          }
        } else {
          let rollBackValue = Number(inputValue.slice(0, -1));
          itemControl.get('quantity').setValue(rollBackValue);
        }
      }      
  }

  public blurInput(itemControl: FormControl): void {
    let inputValue = Number(itemControl.get('quantity').value.toString());
    itemControl.get('rangeQuantity').setValue(inputValue);
    itemControl.get('quantity').setValue(inputValue);
  }

  public rangeChange(itemControl: FormControl): void {
      const itemStep = Number(itemControl.get('steps').value);
      let rangeValue = (itemControl.get('rangeQuantity').value);

      const decimalPart = rangeValue % 1;
      const milecimalPart = rangeValue %100
      if ( itemStep == 0.1 && milecimalPart !== 0) {
        rangeValue =  Math.round(rangeValue*10)/10;
      }

      if ( itemStep === 0.25 && decimalPart === 0.5) {
        rangeValue = `${rangeValue}0`;
      }
      if ( itemStep === 0.25 && decimalPart === 0) {
        rangeValue = `${rangeValue}.00`;
      }
      
      itemControl.get('quantity').setValue(rangeValue);
  }


  public minusQuant(itemControl: FormControl): void {
    const inputValue = Number(itemControl.get('quantity').value);
    const itemStep = Number(itemControl.get('steps').value);
    if(inputValue > 0) {
      let value = Number(inputValue -  itemStep);
      let fixedValue;
      itemControl.get('rangeQuantity').setValue(value);

      const decimalPart = value % 1;
      const milecimalPart = value %100
      if ( itemStep == 0.1 && milecimalPart !== 0) {
        fixedValue =  Math.round(value*10)/10;
      } else {
        if ( itemStep === 0.25 && decimalPart === 0.5) {
          fixedValue = `${value}0`;
        } else {
          if ( itemStep === 0.25 && decimalPart === 0) {
            fixedValue = `${value}.00`;
          } else {
            fixedValue = value;
          }
        }
      }
      itemControl.get('quantity').setValue(fixedValue);
    }
  }

  public plusQuant(itemControl: FormControl): void {
    const inputValue = Number(itemControl.get('quantity').value);
    const itemStep = Number(itemControl.get('steps').value);
    const slid = itemControl.get('slid').value;
    if(inputValue < slid) {
      let value = Number(inputValue +  itemStep);
      itemControl.get('rangeQuantity').setValue(value);
      let fixedValue;

      const decimalPart = value % 1;
      const milecimalPart = value %100
      if ( itemStep == 0.1 && milecimalPart !== 0) {
        fixedValue =  Math.round(value*10)/10;
      } else {
        if ( itemStep === 0.25 && decimalPart === 0.5) {
          fixedValue = `${value}0`;
        } else {
          if ( itemStep === 0.25 && decimalPart === 0) {
            fixedValue = `${value}.00`;
          } else {
            fixedValue = value;
          }
        }
      }
      itemControl.get('quantity').setValue(fixedValue);
    }
  }

  public switchInputChange(itemControl: FormControl): void {
    const inputValue = Number(itemControl.get('quantity').value);
    if( (inputValue == 1) ) {
      itemControl.get('rangeQuantity').setValue(1);
      itemControl.get('quantity').setValue(1);
    } else {
      itemControl.get('rangeQuantity').setValue(0);
      itemControl.get('quantity').setValue(0);
    }
  }

  public changeCheckNeeded(itemControl: FormControl): void {
    const rangeValue = (itemControl.get('rangeQuantity').value);
    if(rangeValue) {
      itemControl.get('quantity').setValue(1);
    } else {
      itemControl.get('quantity').setValue(0);
    }
  }

}
