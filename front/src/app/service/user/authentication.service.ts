import { Observable } from 'rxjs/Observable';
import { User } from './user';

export abstract class AuthenticationService {
  abstract user(): Observable<User>;
  abstract login(login: string, passwd: string): Observable<User>;
  abstract logout(): void;
}
