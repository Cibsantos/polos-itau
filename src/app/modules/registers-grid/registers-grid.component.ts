import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { IApiResponseGrid } from 'src/app/shared/interfaces/api.interface';
import { BaseRegisters } from './class/base-registers-grid';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RegisterHubComponent } from '../register-hub/register-hub.component';

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
  sortedData: IApiResponseGrid[] = [];

  constructor(
    private apiService: ApiService,
    snackBar: MatSnackBar,
    fb: UntypedFormBuilder,
    public translateService: TranslateService,
    private dialog: MatDialog,
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

  filter() {
    this.isLoading = true;
    this.filterForm.value.name.length > 0 ?
      this.registers = this.registers.filter(a => a.name.indexOf(this.filterForm.value.name) >= 0) : this.getRegisters();
    this.isLoading = false;
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    console.log(sort)
    const data = this.registers.slice();
    this.sortedData = data;
    console.log(this.sortedData)
    this.registers = this.sortedData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'business':
          return this.compare(a.business, b.business, isAsc);
        case 'valuation':
          return this.compare(a.valuation, b.valuation, isAsc);
        default:
          return 0;
      }
    });
    console.log(this.registers)
  }
  openModalEditHub(hub?: IApiResponseGrid, readonly = false, language = this.language) {
    const dialogRef = this.dialog.open(RegisterHubComponent, {
      width: '920px',
      data: {
        hub,
        readonly,
        language
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (confirm: boolean) => {
        if (confirm) {
          this.getRegisters();
        }
      },
    });
  }
}
