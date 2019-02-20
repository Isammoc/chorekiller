import { Item } from '../model';

const addItem = (client: typeof fetch) =>
  (item: string) =>
    new Promise<void>((resolve, reject): void => {
      client('/api/lists/1/items', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({ name: item }),
      }).catch(reject).then(_ => resolve());
    });

const deleteItem = (client: typeof fetch) =>
  (id: number) => new Promise<void>((resolve, reject): void => {
    client('/api/lists/1/items/' + id, {
      method: 'delete'
    }).catch(reject).then(_ => resolve());
  });

const completeItem = (client: typeof fetch) =>
  (id: number) => new Promise<void>((resolve, reject) => {
    client('/api/lists/1/items/' + id + '/completion', {
      method: 'post'
    }).catch(reject).then(_ => resolve());
  });

const uncompleteItem = (client: typeof fetch) =>
  (id: number) => new Promise<void>((resolve, reject) => {
    client('/api/lists/1/items/' + id + '/completion', {
      method: 'delete'
    }).catch(reject).then(_ => resolve());
  });

const fetchItems = (client: typeof fetch) =>
  () => new Promise<Item[]>((resolve, reject) => {
    client('/api/lists/1/items', {
    }).then(res => {
      res.json().then(json => {
        resolve(json.groceries);
      }).catch(reject);
    }).catch(reject);
  });

export default (client: typeof fetch) => ({
  addItem: addItem(client),
  completeItem: completeItem(client),
  deleteItem: deleteItem(client),
  fetchItems: fetchItems(client),
  uncompleteItem: uncompleteItem(client),
});
