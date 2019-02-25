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

type Loadable<T> = {
  loading: boolean;
  error?: string;
  current: T;
};

type List = {
  title: string;
  items: number[];
};

export type GroceryState = {
  lists: { [id: string]: Loadable<List> };
  items: { [id: string]: Item };
};

export type UserState = PossibleState<User> & {
  form: 'none' | 'pending' | 'error';
  token: string;
};
