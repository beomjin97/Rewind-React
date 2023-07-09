export interface userType {
  userName: string;
  _id: string;
}

export interface signInformData {
  email: string;
  password: string;
}

export interface singUpformData extends signInformData {
  name: string;
  passwordConfirm: string;
}

export interface DecodedJWT {
  userName: string;
  _id: string;
  iat: number;
  exp: number;
}
