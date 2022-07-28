import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkImage'
})
export class CheckImagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
      if(value){
        return value;
      }else{
        return "/assets/images/user.png";
      }
  }

}
