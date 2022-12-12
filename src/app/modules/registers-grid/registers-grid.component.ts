import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { IApiResponseGrid } from 'src/app/shared/interfaces/api.interface';
import { BaseRegisters } from './class/base-registers-grid';

@Component({
  selector: 'app-registers-grid',
  templateUrl: './registers-grid.component.html',
  styleUrls: ['./registers-grid.component.scss']
})
export class RegistersGridComponent extends BaseRegisters
  implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  @Input() language: string = "";
  formatedCurrency: string = this.language === 'en-US' ? 'en-US' : 'pt-br';


  constructor(
    private apiService: ApiService,
    snackBar: MatSnackBar,
    fb: UntypedFormBuilder,
    public translateService: TranslateService,
  ) {
    super(snackBar, fb);
  }

  ngOnInit(): void {
    this.getRegisters();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getRegisters() {
    this.isLoading = true;
    this.apiService.getRegisters().subscribe({
      next: (registers: IApiResponseGrid[]) => {
        this.registers = registers
        console.log(this.registers)
      },
      error: () => {
        this.openSnackBar(
          `Erro ao listar os Polos, tente novamente mais tarde!`,
          'OK',
          'danger-snackbar',
        );
      },
    }).add(() => (this.isLoading = false));
  }

}
