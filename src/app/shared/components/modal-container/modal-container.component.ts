import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
})
export class ModalContainerComponent {
  @Input() isLoading: boolean = true;
  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() textOk: string = 'Ok';

  @Input() hideCancel: boolean = false;
  @Input() textCancel: string = 'Voltar';

  @Input() textOptionalButton!: string;
  @Input() optionalButtonIcon!: string;

  @Input() disableCancel: boolean = false;
  @Input() disableOk: boolean = false;
  @Input() disableOptional!: string;

  @Output() confirmAction = new EventEmitter<boolean>();
  @Output() optionalEvent = new EventEmitter<boolean>();

  constructor() { }

  confirm() {
    this.confirmAction.emit(true);
  }

  optionalButtonEvent() {
    this.optionalEvent.emit();
  }
}
