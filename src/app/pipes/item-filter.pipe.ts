import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'itemFilter'
})
export class ItemFilterPipe implements PipeTransform {

  transform(itemsForm: FormControl[], filterWord: string, key: string): FormControl[] {
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
