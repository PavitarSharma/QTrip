export type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  state?: string;
  city?: string;
  pinCode?: string;
  country?: string;
  favorites?: [string]
};
