import { User } from '../model';

const manageResponse = (
  resolve: (user: User) => void,
  reject: (reason: object) => void,
  response: Promise<Response>
) => {
  response.then(res => {
    if (res.ok) {
      res.json().then(json =>
        resolve({
          login: json.login,
          name: json.displayName,
          passwordChanged: 'none',
        })
      ).catch(reject);
    } else {
      reject({ name: res.statusText, message: '' + res.status });
    }
  })
    .catch(reject);
};

export const login = (username: string, password: string) => new Promise<User>((resolve, reject): void => {
  manageResponse(
    resolve,
    reject,
    fetch('/api/users/me', {
      method: 'post',
      body: JSON.stringify({ login: username.toLowerCase(), password: password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  );
});

export const connectedUser = (client: typeof fetch) => new Promise<User>((resolve, reject): void => {
  manageResponse(
    resolve,
    reject,
    client('/api/users/me', {
      method: 'get',
      headers: {
        'Content-Type': 'application.json',
      }
    })
  );
});

export const changePassword =
  (client: typeof fetch, oldPassword: string, newPassword: string) => new Promise<void>((resolve, reject): void => {
    client('/api/users/me/password', {
      method: 'post',
      body: JSON.stringify({ oldPassword, newPassword }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      if (res.ok) {
        resolve();
      } else {
        reject(res.status);
      }
    }).catch(reject);
  });
