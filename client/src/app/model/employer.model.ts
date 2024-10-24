export interface employer {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  contact: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  department: string;
  designation: string;
  addressLine1: string;
  addressLine2: string;
  companyCity: string;
  companyState: string;
  companyPincode: string;
  companyCountry: string;
  companyName: string;
  totalEmployees: string;
  foundedDate: string;
  companyIndustry: string;
  companyEmail: string;
  companyContact: string;
  branchName: string;
}

export interface EmployerResponse {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  contact: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  department: string;
  designation: string;
  name: string;
  companyIndustry: string;
  companyEmail: string;
  companyContact: string;
  totalEmployees: number;
  foundedDate: string;
  branchName: string;
  line1: string;
  line2: string;
  companyCity: string;
  companyState: string;
  companyPincode: string;
  companyCountry: string;
}
