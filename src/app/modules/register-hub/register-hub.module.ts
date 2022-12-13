import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterHubComponent } from './register-hub.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';

const MASK_CONFIG: Partial<IConfig> = {
  validation: false,
  allowNegativeNumbers: false,
  thousandSeparator: '.',
};
@NgModule({
  declarations: [
    RegisterHubComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    NgxMaskModule.forRoot(MASK_CONFIG),
  ],
  providers: [],
  exports: [RegisterHubComponent],
})
export class RegisterHubModule { }
