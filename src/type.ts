export interface CommentType {
  _id: string;
  author: userType;
  content: string;
  createdAt: Date;
}

export interface PostType {
  _id: string;
  content: string;
  author: userType;
  imgUrl?: string[];
  like: string[];
  tags?: string[];
  comment?: CommentType[];
  createdAt: Date;
  updatedAt?: Date;
}

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
  userName: string;
  passwordConfirm: string;
}
