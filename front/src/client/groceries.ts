import { Item } from '../model';

const addItem = (authorization: string, item: string) => new Promise<void>((resolve, reject): void => {
  fetch('/api/lists/1/items', {
    headers: {
      'Authorization': authorization,
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({ name: item }),
  }).catch(reject).then(_ => resolve());
});

const deleteItem = (authorization: string, id: number) => new Promise<void>((resolve, reject): void => {
  fetch('/api/lists/1/items/' + id, {
    headers: {
      'Authorization': authorization,
    },
    method: 'delete'
  }).catch(reject).then(_ => resolve());
});

const completeItem = (authorization: string, id: number) => new Promise<void>((resolve, reject) => {
  fetch('/api/lists/1/items/' + id + '/completion', {
    headers: {
      'Authorization': authorization,
    },
    method: 'post'
  }).catch(reject).then(_ => resolve());
});

const uncompleteItem = (authorization: string, id: number) => new Promise<void>((resolve, reject) => {
  fetch('/api/lists/1/items/' + id + '/completion', {
    headers: {
      'Authorization': authorization,
    },
    method: 'delete'
  }).catch(reject).then(_ => resolve());
});

const fetchItems = (authorization: string) => new Promise<Item[]>((resolve, reject) => {
  fetch('/api/lists/1/items', {
    headers: {
      'Authorization': authorization
    },
  }).then(res => {
    res.json().then(json => {
      resolve(json.groceries);
    }).catch(reject);
  }).catch(reject);
});

export default {
  addItem,
  completeItem,
  deleteItem,
  fetchItems,
  uncompleteItem,
};