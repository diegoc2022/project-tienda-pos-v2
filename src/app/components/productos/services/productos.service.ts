import { Injectable } from '@angular/core';
import Environment from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private URL?: string;
  private API?: string

  constructor(private http: HttpClient) {
    this.URL = Environment.endpoint;
    this.API = 'venta-producto';
  }

  funct_retorna_todos_los_productos(): Observable<any> {
    return this.http.get(`${this.URL}/${this.API}`)
  }

}
