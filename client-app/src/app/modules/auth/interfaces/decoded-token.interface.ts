export interface DecodedToken {
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  address: string;
  id: string;
  iat: number;
  exp: number;
}
