export interface login {
  email: string | null;
  password: string | null;
}

export interface register {
  username: string | null;
  email: string | null;
  password: string | null;
}

export interface uploadPost {
  caption: string;
  images: any;
}

export interface editProfile {
  name: string;
  username: string;
  email: string;
  avatar: any;
}
