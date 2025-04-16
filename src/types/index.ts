export interface FormData {
  roomCount: number;
}

export interface AddressData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface OrderData extends FormData, AddressData {}
