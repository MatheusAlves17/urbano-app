export interface IProduct {
  id: string;
  name: string;
  price: string;
  stock: string;
  category: Category;
  banner: string;
  description?: string;
  quantity: number;
  path: string;
}

export interface Category {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
