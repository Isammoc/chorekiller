import { User } from '../model';

export const login = (username: string, password: string) => new Promise<User>((resolve, reject): void => {
  fetch('/api/users/me', {
    method: 'post',
    body: JSON.stringify({ login: username, password: password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) {
        res.json().then(json =>
          resolve({
            login: json.login,
            name: json.displayName,
            authorization: res.headers.get('Set-Authorization')!,
          })
        ).catch(reject);
      } else {
        reject({ name: res.statusText, message: '' + res.status });
      }
    })
    .catch(reject);
});
