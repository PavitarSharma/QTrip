export type City = {
  id: string;
  city: string;
  description: string;
  image: string;
};

export type Adventure = {
  _id: string;
  cityId: string;
  name: string;
  costPerHead: number;
  currency: string;
  image: string;
  duration: number;
  category: string;
  subtitle: string;
  images: [string];
  content: string;
  available: boolean;
  reserved: boolean;
  createdAt: Date;
  reviews: number
};

export type Reservation = {
  _id: string;
  userId: string;
  adventureId: string;
  name: string;
  adventureName: string;
  person: number;
  price: number;
  date: string;
  createdAt: string;
};
