import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '@tk-ui/components/modal/services/modal.service';
import {BusSearchModalComponent} from '@sb/components/bus-search/bus-search-modal/bus-search-modal.component';
import {Station} from '@sb/models/station';
import {SelectedStationService} from '@sb/services/common/selected-station.service';

@Component({
  selector: 'app-bus-search',
  templateUrl: './bus-search.component.html',
  styleUrls: ['./bus-search.component.scss'],
})
export class BusSearchComponent implements OnInit {
  // Selected station.
  @Input() station?: Station;

  constructor(
    private modalService: ModalService,
    private selectedStationService: SelectedStationService,
  ) {
  }

  /**
   * Get station label for input.
   */
  get stationLabel(): string | undefined {
    if (this.station) {
      return `${this.station.name} [${this.station.id}]`;
    } else {
      return;
    }
  }

  ngOnInit(): void {
  }

  /**
   * Open search modal
   */
  openSearchModal(): void {
    this.modalService.open(BusSearchModalComponent, {
      closeOnNavigating: true,
      data: this.station,
      onClose: (result?: Station) => {
        // Update the `station` only when the result exists to keep previous search.
        if (result) {
          this.selectedStationService.station = result;
        }
      }
    });
  }
}
