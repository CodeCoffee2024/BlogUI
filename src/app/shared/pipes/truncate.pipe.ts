import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 100, trail = '...'): string {
    return value?.length > limit ? value.slice(0, limit) + trail : value;
  }
}
