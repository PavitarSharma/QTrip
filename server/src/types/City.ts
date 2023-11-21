export interface CityInput {
  name: string;
  image: string;
  id: string;
  description: string;
}

export interface AdventureInput {
  cityId: string;
  name: string;
  costPerHead: number;
  currency: string;
  duration: number;
  category: string;
  subtitle: string;
  content: string;
  available?: boolean;
  image?: string;
  images?: [string];
}

export interface ReserveAdventureInput {
  name: string;
  date: string;
  person: number;
  price: number;
  adventureId: string;
}
