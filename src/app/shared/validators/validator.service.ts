import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public nombreApellidosPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  userNameIncorrecto (argumento: FormControl ) :ValidationErrors | null {
    const valor:string = argumento.value?.trim().toLowerCase();

    if (valor === 'pepito') {
      // return ERROR
      return {
        noPepito: true
      }
    }
    return null;
  }

  camposIguales(campo1: string, campo2: string) {
    return (controles: AbstractControl): ValidationErrors | null => {

      const pass1 = controles.get(campo1)?.value;
      const pass2 = controles.get(campo2)?.value;

      if (pass1 !== pass2) {
        controles.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true }
      }

      controles.get(campo2)?.setErrors(null);

      return null
    }
  }


}
