import {Component, Inject, OnInit} from '@angular/core';
import {MODAL_REF, ModalRef} from '@tk-ui/components/modal/models/modal-ref';

@Component({
  selector: 'app-bus-search-modal',
  templateUrl: './bus-search-modal.component.html',
  styleUrls: ['./bus-search-modal.component.scss']
})
export class BusSearchModalComponent implements OnInit {

  constructor(
    @Inject(MODAL_REF) private modalRef: ModalRef<BusSearchModalComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * Close the modal with response
   * @param res response
   */
  close(res?: boolean): void {
    this.modalRef.close(res);
  }
}
