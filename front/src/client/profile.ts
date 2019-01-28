import { Profile } from '../state/profile/reducer';

export const getProfile = (token: string, id: string) => new Promise<Profile>((resolve, reject): void => {
  fetch('/api/users/' + id, {
    method: 'get',
    headers: {
      'Content-Type': 'application.json',
      'Authorization': token,
    }
  }).then(res => {
    if (res.ok) {
      res.json().then(json =>
        resolve(json)
      ).catch(reject);
    } else {
      reject({ name: res.statusText, message: '' + res.status });
    }
  })
  .catch(reject);
});
