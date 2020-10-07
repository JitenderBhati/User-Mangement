export interface User {
  id?: number;
  name: String;
  email: String;
  role: String;
  password: String;
  createdAt?: string;
  updateAt?: string;
  updatedBy?: number;
}
