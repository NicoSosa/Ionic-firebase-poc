import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'itemFilter'
})
export class ItemFilterPipe implements PipeTransform {

  transform(itemsForm: AbstractControl[], filterWord: string, key: string): AbstractControl[] {
    if (filterWord === '') {
      return itemsForm;
    }

    filterWord = filterWord.toLowerCase();
    let items = itemsForm.filter( item => {
      return item.value[key].toLowerCase().includes(filterWord);
    });    
    return items;
  }
}
