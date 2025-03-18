import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncatepost' })
export class TruncatePostPipe implements PipeTransform {
  transform(value: string, limit: number = 150): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.slice(0, limit) + '...';
  }
}