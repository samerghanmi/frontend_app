import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/model/user';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], ...args: string[]): any[] {
    const search = args[0];
    if(!search || value.length===0){
      return [];
    }
    const result = value.filter((el)=>{
      const test = el.fname.toLowerCase().startsWith(search.toLowerCase()) || el.lname.toLowerCase().startsWith(search.toLowerCase())
      console.log(test);
      return test;

    })
   console.log(result);
    return result;
  }

}
