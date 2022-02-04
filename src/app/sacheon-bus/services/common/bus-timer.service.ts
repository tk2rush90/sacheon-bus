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

  // Timer pending emitter.
  private _timerPending: EventEmitter<void> = new EventEmitter<void>();

  // Timer pending ended emitter.
  private _timerPendingEnded: EventEmitter<void> = new EventEmitter<void>();

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
   * Start timer pending state when the data loading started automatically by timer.
   */
  startTimerPending(): void {
    this._timerPending.emit();
  }

  /**
   * End timer pending state when the automatic data loading finished.
   */
  endTimerPending(): void {
    this._timerPendingEnded.emit();
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

  /**
   * Subscribe timer pending emitter.
   * @param handler Event handler.
   */
  subscribeTimerPending(handler: () => void): Subscription {
    return this._timerPending.subscribe(handler);
  }

  /**
   * Subscribe timer pending ended emitter.
   * @param handler Event handler.
   */
  subscribeTimerPendingEnded(handler: () => void): Subscription {
    return this._timerPendingEnded.subscribe(handler);
  }
}
