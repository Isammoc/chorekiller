import { Item } from '../model';

const addItem = (token: () => string) => (item: string) => new Promise<void>((resolve, reject): void => {
  fetch('/api/lists/1/items', {
    headers: {
      'Authorization': token(),
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({ name: item }),
  }).catch(reject).then(_ => resolve());
});

const deleteItem = (token: () => string) => (id: number) => new Promise<void>((resolve, reject): void => {
  fetch('/api/lists/1/items/' + id, {
    headers: {
      'Authorization': token(),
    },
    method: 'delete'
  }).catch(reject).then(_ => resolve());
});

const completeItem = (token: () => string) => (id: number) => new Promise<void>((resolve, reject) => {
  fetch('/api/lists/1/items/' + id + '/completion', {
    headers: {
      'Authorization': token(),
    },
    method: 'post'
  }).catch(reject).then(_ => resolve());
});

const uncompleteItem = (token: () => string) => (id: number) => new Promise<void>((resolve, reject) => {
  fetch('/api/lists/1/items/' + id + '/completion', {
    headers: {
      'Authorization': token(),
    },
    method: 'delete'
  }).catch(reject).then(_ => resolve());
});

const fetchItems = (token: () => string) => () => new Promise<Item[]>((resolve, reject) => {
  fetch('/api/lists/1/items', {
    headers: {
      'Authorization': token(),
    },
  }).then(res => {
    res.json().then(json => {
      resolve(json.groceries);
    }).catch(reject);
  }).catch(reject);
});

export default (token: () => string) => ({
  addItem: addItem(token),
  completeItem: completeItem(token),
  deleteItem: deleteItem(token),
  fetchItems: fetchItems(token),
  uncompleteItem: uncompleteItem(token),
});
