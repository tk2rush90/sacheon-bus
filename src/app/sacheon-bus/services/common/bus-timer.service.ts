import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusTimerService {
  // Start timer emitter.
  private _startTimer: EventEmitter<void> = new EventEmitter<void>();

  // Timer ended emitter.
  private _timerEnded: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  /**
   * Start bus timer to call api with interval.
   */
  startTimer(): void {
    this._startTimer.emit();
  }

  /**
   * Notice the timer ended state to subscribers.
   */
  timerEnded(): void {
    this._timerEnded.emit();
  }

  /**
   * Subscribe start timer emitter.
   * @param handler Event handler.
   */
  subscribeStartTimer(handler: () => void): Subscription {
    return this._startTimer.subscribe(handler);
  }

  /**
   * Subscribe timer ended emitter.
   * @param handler Event handler.
   */
  subscribeTimerEnded(handler: () => void): Subscription {
    return this._timerEnded.subscribe(handler);
  }
}
