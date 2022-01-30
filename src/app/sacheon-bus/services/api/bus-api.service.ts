import {Injectable} from '@angular/core';
import {ApiBaseService} from '@tk-ui/services/common/api-base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Station} from '@sb/models/station';
import {ArrivalInfo} from '@sb/models/arrival-info';

@Injectable({
  providedIn: 'root'
})
export class BusApiService extends ApiBaseService {

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  /**
   * Get station list with search text
   * @param search search string
   */
  getStationList(search: string): Observable<Station[]> {
    return this.http.get<Station[]>(this.endpoint('/station-list'), {
      params: {
        search,
      },
    });
  }

  /**
   * Get arrival info with station id
   * @param station station id
   */
  getArrivalInfo(station: string): Observable<ArrivalInfo[]> {
    return this.http.get<ArrivalInfo[]>(this.endpoint('/arrival-info'), {
      params: {
        station,
      },
    });
  }
}
