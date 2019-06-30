import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PopService {

  constructor(private _matSnackBar : MatSnackBar) { }

  public showSnack(message: String) {
    this._matSnackBar.open( `${message}`,'close', {duration: 2500});
  }

}
