import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IApiResponseGrid } from 'src/app/shared/interfaces/api.interface';
import { BaseFormComponent } from 'src/app/shared/utils/base-form.component';



@Component({
    template: '',
})
export class BaseRegisters extends BaseFormComponent {
    isLoading: boolean = false;
    filterForm!: UntypedFormGroup;
    registers: IApiResponseGrid[] = [];

    displayedColumns: string[] = [

        'name',
        'business',
        'valuation',
        'situation',
        'actions',
    ];

    public paging = {
        index: 0,
        size: 10,
        length: 0,
        ordenacao: '',
    };

    constructor(snackBar: MatSnackBar, private fb: UntypedFormBuilder) {
        super(snackBar);
        this.buildForm();
    }

    buildForm() {
        this.filterForm = this.fb.group({
            name: [null],
            language: [null],
        });
    }
}
