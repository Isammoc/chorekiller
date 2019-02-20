import { Profile } from '../state/profile/reducer';

export const getProfile =
  (client: typeof fetch) =>
    (id: string) =>
      new Promise<Profile>((resolve, reject): void => {
        client('/api/users/' + id, {
          method: 'get',
          headers: {
            'Content-Type': 'application.json',
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

export default (client: typeof fetch) => ({
  get: getProfile(client),
});
