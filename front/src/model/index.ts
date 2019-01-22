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
}

export interface GroceryState extends PossibleState<Item[]> {
  itemToAdd: string;
}

export type UserState = PossibleState<User>;
