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
  phoneNumber?: string;
  postalCode?: string;
  website?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}
