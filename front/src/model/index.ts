export type Task = {
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

type Project = {
  title: string;
  tasks: number[];
};

export type ProjectState = {
  projects: { [id: string]: Loadable<Project> };
  tasks: { [id: string]: Task };
};

export type UserState = PossibleState<User> & {
  form: 'none' | 'pending' | 'error';
  token: string;
};
