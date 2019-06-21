
//import {Pipe, PipeTransform } from '@angular/core';

//@Pipe({
//  name: 'filter'
//})
//export class FilterPipe implements PipeTransform {
//  transform(items: any[], searchtext: string): any[] {

//    if (!items) {
//      return [];
//    }
//    if (!searchtext) {
//      return items;
//    }
//    searchtext = searchtext.toLocaleLowerCase();

//    return items.filter(it => {
//      return it.tolocalelowercase().includes(searchtext);
//    });
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

//import { Pipe, PipeTransform } from '@angular/core';

//@Pipe({
//  name: 'filter'
//})
//export class FilterPipe implements PipeTransform {

//  transform(value: any, args?: any): any {
//    return null;
//  }

//}
