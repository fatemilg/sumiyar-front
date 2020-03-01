import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {

  constructor() { }
  public urlAddress: string = environment.urlAddress;
}
