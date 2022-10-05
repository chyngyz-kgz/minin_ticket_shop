export interface IResponse {
  success: number;
  status: number;
  message: string;
  data: {
    token: string;
    role: string;
  };
}

export interface INewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUserData {
  email: string;
  password: string;
}
