export interface userType {
  name: string;
  _id: string;
}

export interface SignInformData {
  email: string;
  password: string;
}

export interface SignUpformData extends SignInformData {
  name: string;
  passwordConfirm: string;
}

export interface DecodedJWT {
  name: string;
  _id: string;
  iat: number;
  exp: number;
}
