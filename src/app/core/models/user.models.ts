
export interface User {
    id: number;
    username: string;
    email: string;
    applications: any[];
    groups: Group[];
    roles: Group[];
    companies: any[];
}

export interface Group {
    id: number;
    name: string;
    slug: string;
    permissions?: any[];
}
