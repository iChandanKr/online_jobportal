export interface User {
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
  isLocked: boolean;
  lockTime: Date;
  updatedAt: string;
  Roles: string;
}

export interface UserRes {
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
  isLocked: boolean;
  lockTime: Date;
}
