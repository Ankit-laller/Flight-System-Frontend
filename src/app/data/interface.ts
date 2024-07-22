export interface User {
    name: string;
    userId: string;
    userType: string;
    isParent: boolean;
  }
  
  export interface LoginResponse {
    success: boolean;
    message: string;
    user: User;
  }
  