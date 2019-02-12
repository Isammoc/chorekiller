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
          authorization: res.headers.get('Set-Authorization')!,
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

export const connectedUser = (token: string) => new Promise<User>((resolve, reject): void => {
  manageResponse(
    resolve,
    reject,
    fetch('/api/users/me', {
      method: 'get',
      headers: {
        'Content-Type': 'application.json',
        'Authorization': token,
      }
    })
  );
});

export const changePassword =
  (token: string, oldPassword: string, newPassword: string) => new Promise<void>((resolve, reject): void => {
    fetch('/api/users/me/password', {
      method: 'post',
      body: JSON.stringify({ oldPassword, newPassword }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    }).then(res => {
      if (res.ok) {
        resolve();
      } else {
        reject(res.status);
      }
    }).catch(reject);
  });
