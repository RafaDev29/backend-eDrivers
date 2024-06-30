export interface User{

    id: number;
    username: string;
    password: string;
    role: 'MASTER_ADMIN_ROLE' | 'ADMIN_ROLE' | 'REGULAR_USER_ROLE' | 'OPERATOR_ROLE';
}