export type Screen = 'LOGIN' | 'POS' | 'IDENTIFY' | 'SUCCESS' | 'DENIED' | 'TOTALS';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  balance: number;
  image: string;
}

export interface Transaction {
  id: string;
  time: string;
  student: {
    name: string;
    class: string;
    image: string;
  };
  cardLast4: string;
  type: 'Purchase' | 'Top-up' | 'Withdrawal';
  status: 'Success' | 'Failed';
  amount: number;
}

export interface AppState {
  currentScreen: Screen;
  cart: CartItem[];
  currentStudent: Student | null;
  lastTransaction: {
    id: string;
    amount: number;
    timestamp: string;
    items: number;
  } | null;
}
