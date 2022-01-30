import {Component, OnInit} from '@angular/core';
import {ModalService} from '@tk-ui/components/modal/services/modal.service';
import {BusSearchModalComponent} from '@sb/components/bus-search/bus-search-modal/bus-search-modal.component';

@Component({
  selector: 'app-bus-search',
  templateUrl: './bus-search.component.html',
  styleUrls: ['./bus-search.component.scss']
})
export class BusSearchComponent implements OnInit {

  constructor(
    private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * Open search modal
   */
  openSearchModal(): void {
    this.modalService.open(BusSearchModalComponent);
  }
}
