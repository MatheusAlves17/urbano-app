export interface IItems {
  id: string;
  name: string;
  banner: string;
  price: string;
  order_id: string;
  selected?: boolean;
  status?: Status;
}

export interface Status {
  id: string;
  name: string;
}
