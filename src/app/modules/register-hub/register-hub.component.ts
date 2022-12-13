import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { IApiResponseDetail } from 'src/app/shared/interfaces/api.interface';
import { BaseRegisters } from '../registers-grid/class/base-registers-grid';

@Component({
  selector: 'app-register-hub',
  templateUrl: './register-hub.component.html',
  styleUrls: ['./register-hub.component.scss']
})
export class RegisterHubComponent extends BaseRegisters
  implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  hubResponse: IApiResponseDetail | undefined;
  hubId: number | undefined;
  formHub!: UntypedFormGroup;
  title: string;
  subTitle: string;
  textOk: string;
  readonly: boolean;
  language: string;
  formatedCurrency: string;
  translateTitle: string;
  transtaleteSubTitle: string;
  titleEN: string = "Hub";
  subTitleEN: string = "displaying pole details";
  labelButton: string;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) data: { hub: IApiResponseDetail; readonly: boolean; language: string },
    private apiService: ApiService,
    snackBar: MatSnackBar,
    fb: UntypedFormBuilder,
    private dialog: MatDialogRef<RegisterHubComponent>,
  ) {
    super(snackBar, fb);
    this.language = data.language
    console.log(this.language)
    this.formatedCurrency = this.language === 'en-US' ? 'en-US' : 'pt-br';
    this.translateTitle = this.language === 'en-US' ? this.titleEN : 'Polo';
    this.transtaleteSubTitle = this.language === 'en-US' ? this.subTitleEN : 'exibindo detalhes do polo';
    this.labelButton = this.language === 'en-US' ? 'To Save' : 'Salvar'
    this.hubId = data.hub.id;
    this.readonly = data.readonly;
    this.title = `${this.translateTitle} - ${data.hub.name}`;
    this.subTitle = `${this.transtaleteSubTitle}  - ${data.hub.name} #${this.hubId}`;

    this.textOk = this.readonly ? `Ok` : `${this.labelButton}`;
  }

  ngOnInit(): void {
    this.loadForm();
    this.getRegisterHubById();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadForm() {
    this.formHub = this.fb.group({
      name: [null, [Validators.required]],
      business: [null, [Validators.required]],
      valuation: [null, [Validators.required]],
      cnpj: [null, [Validators.required]],
      active: [null, [Validators.required]],
      zipCode: [null],
      street: [null],
      district: [null],
      state: [null],
      city: [null],
    })
  }

  getRegisterHubById() {
    this.isLoading = true
    this.apiService.getRegisterById(this.hubId).subscribe({
      next: (data: any) => {
        let currencyStyle = this.language === 'en-US' ? '$' : 'R$';
        let parsedValue = {
          ...data,
          valuation: currencyStyle + data.valuation.toLocaleString(this.formatedCurrency)
        }
        this.formHub.patchValue({ ...parsedValue });
        console.log(this.formHub)
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.openSnackBar(
          'Ocorreu um erro ao carregar dados do Polo. Tente novamente mais tarde!',
          'Ok',
          'danger-snackbar',
        );
      }
    })
  }

  save() {
    let mensage = this.language === 'en-US' ? 'Data Saved Successfully' : 'Dados Salvos com Sucesso';
    this.dialog.close(true);
    this.openSnackBar(
      mensage,
      'OK',
      'success-snackbar',
    );
  }

}
