export interface MyAddress {
  id: string;
  zipCode: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  type?: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  selected?: boolean;
}
