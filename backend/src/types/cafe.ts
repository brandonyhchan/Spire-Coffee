export type Cafe = {
  id: number;
  name: string;
  stringId: string;
  street: string;
  city: string;
  province: string;
  profilePhotoURL: string;
  busyness: string;
  noisiness: string;
  price: string;
  location: Location;
  distance: number;
};

export type Location = {
  latitude: number;
  longitude: number;
};

export type distance<T> = T & {
  distance: number;
};
