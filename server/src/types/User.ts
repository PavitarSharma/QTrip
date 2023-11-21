export interface UserPayload {
  _id: string;
  email: string;
  name: string;
}

export interface UserEditInput {
  name: string;
  phone?: number;
  country?: string;
  city?: string;
  state?: string;
  pinCode?: number;
}
