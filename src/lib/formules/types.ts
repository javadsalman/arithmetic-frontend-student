export type FormuleMode = 'simple-add-sub' | '5-add' | '5-add-sub' | '10-add' | '10-add-sub' | '5k-add' | '5k-add-sub' | 'mixed-add-sub';

export interface FormInfo {
    formule: FormuleMode;
    digitCount: number;
    numberCount: number;
    [key: string]: string | number; // Add index signature
}

export type OperationType = 'add' | 'subtract'


export type Availables = {
    [key: number]: number[]
}