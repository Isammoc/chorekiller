export type Item = {
  id: number;
  name: string;
  completed: boolean;
};

export type PossibleState<P> = {
  current: P | null;
  status: 'none' | 'pending' | 'alive';
};

export type User = {
  login: string;
  name: string;
  passwordChanged: 'none' | 'success' | 'error' | 'pending';
};

export type GroceryState = PossibleState<Item[]> & {};

export type UserState = PossibleState<User> & {
  form: 'none' | 'pending' | 'error';
  token: string;
};
