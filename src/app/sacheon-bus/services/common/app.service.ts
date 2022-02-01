import {Injectable} from '@angular/core';
import {RandomUtil} from '@tk-ui/utils/random.util';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // Browser key for keep session to backend.
  browserKey = RandomUtil.key();

  constructor() { }
}
