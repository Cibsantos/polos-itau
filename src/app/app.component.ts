import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  langague: string = "";


  constructor(public translateService: TranslateService) {
  }



  choiceLanguage(langague: any) {
    console.log(langague)
    this.langague = langague;
  }


}
