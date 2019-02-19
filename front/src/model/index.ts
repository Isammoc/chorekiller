export interface Item {
  id: number;
  name: string;
  completed: boolean;
}

export interface PossibleState<P> {
  current: P | null;
  status: 'none' | 'pending' | 'alive';
  form: 'none' | 'pending' | 'error';
}

export interface User {
  login: string;
  name: string;
  authorization: string;
  passwordChanged: 'none' | 'success' | 'error' | 'pending';
}

export interface GroceryState extends PossibleState<Item[]> {}

export type UserState = PossibleState<User>;
