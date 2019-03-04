import { Task } from '../model';

const addTask = (client: typeof fetch) =>
  (projectId: number, task: string) =>
    new Promise<void>((resolve, reject): void => {
      client('/api/projects/' + projectId + '/tasks', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({ name: task }),
      }).catch(reject).then(_ => resolve());
    });

const deleteTask = (client: typeof fetch) =>
  (projectId: number, id: number) =>
    new Promise<void>((resolve, reject): void => {
      client('/api/projects/' + projectId + '/tasks/' + id, {
        method: 'delete'
      }).catch(reject).then(_ => resolve());
    });

const completeTask = (client: typeof fetch) =>
  (projectId: number, id: number) =>
    new Promise<void>((resolve, reject) => {
      client('/api/projects/' + projectId + '/tasks/' + id + '/completion', {
        method: 'post'
      }).catch(reject).then(_ => resolve());
    });

const uncompleteTask = (client: typeof fetch) =>
  (projectId: number, id: number) =>
    new Promise<void>((resolve, reject) => {
      client('/api/projects/' + projectId + '/tasks/' + id + '/completion', {
        method: 'delete'
      }).catch(reject).then(_ => resolve());
    });

const fetchTasks = (client: typeof fetch) =>
  (projectId: number) =>
    new Promise<Task[]>((resolve, reject) => {
      client('/api/projects/' + projectId + '/tasks', {
      }).then(res => {
        res.json().then(json => {
          // tslint:disable-next-line
          console.log('json!!!');
          // tslint:disable-next-line
          console.log(json);
          resolve(json.tasks as Task[]);
        }).catch(reject);
      }).catch(reject);
    });

export default (client: typeof fetch) => ({
  addTask: addTask(client),
  completeTask: completeTask(client),
  deleteTask: deleteTask(client),
  fetchTasks: fetchTasks(client),
  uncompleteTask: uncompleteTask(client),
});
