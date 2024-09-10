export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  profilePicture: string;
  role: string;
  token: string;
  tokenExpirationDate: Date;
}
