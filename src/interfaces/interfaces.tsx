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
  caption: string | null;
  images: any;
}

export interface editProfile {
  name: string | null;
  username: string | null;
  email: string | null;
  avatar: any;
}
