import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { PortalModule } from '@angular/cdk/portal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        PortalModule,
        BrowserAnimationsModule
    ],
    providers: [],
    exports: [MaterialModule]
})
export class SharedModule { }
