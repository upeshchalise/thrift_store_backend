export enum TokenScope {
    REFRESH,
    CUSTOMER_ACCESS = 'customer:access',
    ADMIN_ACCESS = 'admin:access'
  }
  export interface Payload {
    user_id: string;
    scope: TokenScope[];
    role: string;
  }