import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BaseRegisters } from 'src/app/modules/registers-grid/class/base-registers-grid';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseRegisters
  implements OnInit, OnDestroy {

  @Output() langagueSelected = new EventEmitter<string>();


  subscriptions: Subscription[] = [];


  langagues = [
    { description: 'PT', value: 1, translate: 'pt-BR' },
    { description: 'EN', value: 2, translate: 'en-US' }
  ];
  user: any = {};
  filterLanguage = UntypedFormBuilder;



  constructor(
    public translateService: TranslateService,
    fb: UntypedFormBuilder,
    snackBar: MatSnackBar,
  ) {

    super(snackBar, fb);

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }


  public changeLanguage(event: any): void {
    this.langagueSelected.emit(event.value);
    this.translateService.use(event.value);
  }

}
