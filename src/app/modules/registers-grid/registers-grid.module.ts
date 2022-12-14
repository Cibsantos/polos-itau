import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistersGridComponent } from './registers-grid.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterHubModule } from '../register-hub/register-hub.module';

@NgModule({
  declarations: [
    RegistersGridComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    RegisterHubModule

  ],
  providers: [],
  exports: [RegistersGridComponent],
})
export class RegistersGridModule { }
