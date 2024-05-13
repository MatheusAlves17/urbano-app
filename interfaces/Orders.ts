export interface IOrders {
  id: string;
  value_total: string;
  created_at: Date;
  status: Status;
  item: Item[];
  payment_cards: PaymentCard[];
  payment_coupon: any[];
}

export interface Item {
  id: string;
  price: string;
  name: string;
  banner: string;
  path: null;
  created_at: Date;
  updated_at: Date;
  order_id: string;
  product_id: string;
  status_id: string;
  user_id: string;
}

export interface PaymentCard {
  id: string;
  value: string;
  created_at: Date;
  updated_at: Date;
  order_id: string;
  card_id: string;
}

export interface Status {
  id: string;
  name: string;
}
