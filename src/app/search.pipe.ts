import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/model/post';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, ...args: any): Post [] {
    let input = args[0]
    if(!input){
      return value
    }else{

      let  list = value.filter(x=>{
        return x.description.toLowerCase().startsWith(input.toLowerCase())
    })
    
    return list;
  }
}

}
