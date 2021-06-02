import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pointReplacer'
})

export class PointReplacerPipe implements PipeTransform {
  transform(value: string, ...args): string {
    if (value) {
      return value.replace(/,/g, ' ');
    }
    return '';
  }
}
