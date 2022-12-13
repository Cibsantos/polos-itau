import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { AvatarModule } from 'ngx-avatar';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, SharedModule, AvatarModule, TranslateModule],
  exports: [HeaderComponent],
})
export class CoreModule { }
