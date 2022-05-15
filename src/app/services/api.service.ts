import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public isupdateLogin = new BehaviorSubject(true);
  constructor() { }
}
