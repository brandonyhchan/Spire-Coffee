export interface Cafe {
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
}

export interface Location {
  latitude: number;
  longitude: number;
}
