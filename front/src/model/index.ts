export interface Item {
  id: number;
  name: string;
  completed: boolean;
}

export interface PossibleState<P> {
  current: P | null;
  status: 'none' | 'pending' | 'alive';
}

export interface User {
  login: string;
  name: string;
  passwordChanged: 'none' | 'success' | 'error' | 'pending';
}

export interface GroceryState extends PossibleState<Item[]> {}

export interface UserState extends PossibleState<User> {
  form: 'none' | 'pending' | 'error';
  token: string;
}
