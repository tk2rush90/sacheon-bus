import {Component, OnDestroy, OnInit} from '@angular/core';
import {MathUtil} from '@tk-ui/utils/math.util';
import {Animator} from '@tk-ui/utils/animation.util';
import {BusTimerService} from '@sb/services/common/bus-timer.service';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Dash array.
  dashArray = MathUtil.getCircleRoundLength(12);

  // Dash offset.
  dashOffset = 0;

  // State to show timer.
  showTimer = false;

  // Animator.
  private _animator: Animator = new Animator<number>();

  constructor(
    private busTimerService: BusTimerService,
    private subscriptionService: SubscriptionService,
  ) {
  }

  ngOnInit(): void {
    this._subscribeStartTimer();
  }

  ngOnDestroy() {
    this._animator.cancel();
  }

  /**
   * Call `_onTimerEnded()` method to refresh.
   */
  onClickRefresh(): void {
    this._onTimerEnded();
  }

  /**
   * Subscribe start timer emitter to run timer.
   */
  private _subscribeStartTimer(): void {
    const sub = this.busTimerService
      .subscribeStartTimer(() => {
        this._startTimer();
      });

    this.subscriptionService.store('_subscribeStartTimer', sub);
  }

  /**
   * The timer will run for 10 seconds, then call the `timerEnded()` to call api.
   */
  private _startTimer(): void {
    this.showTimer = true;
    this._animator.animate({
      start: 15,
      target: this.dashArray,
      duration: 10000,
      onProgress: value => this.dashOffset = value,
      onEnd: () => this._onTimerEnded(),
    });
  }

  /**
   * Stop animator and call timer ended.
   * @private
   */
  private _onTimerEnded(): void {
    this.showTimer = false;
    this.busTimerService.timerEnded();
  }
}
