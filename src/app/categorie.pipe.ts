import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categorie'
})
export class CategoriePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let cat = args[0];
    let list = value.filter(item=>{
      return item.categorie.toLowerCase() == cat.toLowerCase(); 
    })
    if(!list || cat=='hello'){
      return value
    }else{


      return list;
    }
  }

}
