export interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  contact: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  role: string;
  refreshToken: string;
  accessToken: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: CurrentUser;
}
