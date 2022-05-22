import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailPattern, nombreApellidosPattern, userNameIncorrecto } from 'src/app/shared/validators/validaciones';
import { ValidatorService } from 'src/app/shared/validators/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

 get msgEmailError() : string {

   const errors = this.miFormulario.get('email')?.errors;
   if (errors?.required)
   {
     return 'Email es obligatorio';
   } else if (errors?.pattern) {
     return 'El formato del email es erróneo';
   } else if (errors?.emailTomado) {
     return 'El email ya existe';
  }

   return '';
 }

  miFormulario: FormGroup = this.fb.group (
    {  nombre: ['', [Validators.required, Validators.pattern(this.srvValidator.nombreApellidosPattern)]],
      email: ['', [Validators.required, Validators.pattern(this.srvValidator.emailPattern)],[ this.emailVal]],
      username: ['', [Validators.required, this.srvValidator.userNameIncorrecto]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]]
    }, {
      Validators: [this.srvValidator.camposIguales('password','password2')]
    }
  );

  constructor( private fb: FormBuilder,
    private srvValidator: ValidatorService,
    private emailVal: EmailValidator) { }

  ngOnInit(): void {
  }

  campoNoValido (campo : string )
  {
    return this.miFormulario.get(campo)?.invalid &&
    this.miFormulario.get(campo)?.touched;
  }
/*
  emailRequired() {
    return this.miFormulario.get('email')?.errors?.required &&
    this.miFormulario.get('email')?.touched;
  }

  emailFormato() {
    return this.miFormulario.get('email')?.errors?.pattern &&
    this.miFormulario.get('email')?.touched;
  }

  emailExiste() {
    return this.miFormulario.get('email')?.errors?.emailTomado &&
    this.miFormulario.get('email')?.touched;
  }
*/
  submitFormulario() {
    this.miFormulario.markAllAsTouched();
  }

}
