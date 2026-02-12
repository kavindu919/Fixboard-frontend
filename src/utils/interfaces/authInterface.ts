export interface registerPageInterface {
  name: string;
  email: string;
  password: string;
}
export interface loginPageInterface {
  email: string;
  password: string;
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: UserProps | null;
}
