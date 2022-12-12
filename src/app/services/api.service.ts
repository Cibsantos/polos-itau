import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IApiResponseGrid } from '../shared/interfaces/api.interface';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) { }

    getRegisters(): Observable<IApiResponseGrid[]> {
        return this.http.get<IApiResponseGrid[]>(
            `${environment.api}/itau_teste`,
            httpOptions,
        );
    }
}
