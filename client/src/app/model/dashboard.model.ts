import { Type } from '@angular/core';

export interface Widget {
  id: number;
  label: string;
  content: Type<unknown>;
  color?: string;
  backgroundColor?:string;
}
