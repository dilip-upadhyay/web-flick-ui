import { Type } from "@angular/core";

export interface Widget {
    id: number;
    name: string;
    rows?: number;
    columns?: number;
    content: Type<any>;
}