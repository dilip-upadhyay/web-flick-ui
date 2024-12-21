import { Type } from "@angular/core";

export interface Widget {
    id: string;
    name: string;
    rows?: number;
    columns?: number;
    value?: any;
    content?: Type<any>;
    showSettings?: boolean;
    children?: Widget[];
    showOptions?: boolean;
}
