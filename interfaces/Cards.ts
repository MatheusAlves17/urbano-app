export interface ICard {
  id: string;
  number: string;
  cvv: string;
  validity: string;
  name: string;
  flag: string;
  principal: boolean;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  selected?: boolean;
}
