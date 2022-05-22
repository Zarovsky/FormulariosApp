import { FormControl } from '@angular/forms';

export const nombreApellidosPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

export const userNameIncorrecto = (argumento: FormControl ) => {
  const valor:string = argumento.value?.trim().toLowerCase();

  if (valor === 'pepito') {
    // return ERROR
    return {
      noPepito: true
    }
  }
  return null;
}
