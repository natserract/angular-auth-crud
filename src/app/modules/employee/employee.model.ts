export interface Employee {
    nip: string | number;
    full_name: string;
    nick_name: string;
    birth_date: Date | string;
    address: string;
    phone: string;
    email: string;
    mobile: string;
}

export class EmployeeTemp {
    pagination: EmployeePagination;
    sort: EmployeeSort;
}

// tslint:disable: variable-name
export class AddEmployeeTemp {
    nip: string | number;
    full_name: string;
    nick_name: string;
    birth_date: Date | string;
    address: string;
    phone: string;
    email: string;
    mobile: string;
}

export interface EmployeePagination {
    page: number;
    perpage: number;
}

export interface EmployeeSort {
    sort: 'ASC' | 'DESC';
    field: string;
}