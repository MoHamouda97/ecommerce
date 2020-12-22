import { Injectable } from '@angular/core';
import {  BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DatabindingService {
  private isLangChanged = new BehaviorSubject<string> (null);

  checkIsLangChanged = this.isLangChanged.asObservable();

  constructor() { }

  changeLang(changeLang) {
    this.isLangChanged.next(changeLang)
  }
}
