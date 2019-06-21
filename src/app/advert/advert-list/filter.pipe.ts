//import { Pipe, PipeTransform } from '@angular/core';

//@Pipe({
//  name: 'filter'
//})
//export class FilterPipe implements PipeTransform {

//  transform(value: any, args?: any): any {
//    return null;
//  }

//}


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any {
    return list ? list.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
  }

}


