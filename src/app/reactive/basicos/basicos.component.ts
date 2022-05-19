import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  /*
  miFormulario: FormGroup = new FormGroup(
    {
      'nombre': new FormControl('RTX 4080ti'),
      'precio': new FormControl(1500),
      'existencias': new FormControl(5),
    }
  );
  */

  ngOnInit(): void {
      // para establecer un valor por defecto
      // pero deben definirse todos los campos.
      // en vez de usar setValue, usar mejor reset
      // ya que acepta que falte algún campo
      /*
      this.miFormulario.setValue({
        nombre: 'RXT 4080ti',
        precio: 200,
        existencias: 100
      });

      this.miFormulario.reset({
        nombre: 'RXT 4080ti',
        precio: 200
      });
      */
  }
  // el primer parámetro es el valor, pero lo ponemos a nulo
  miFormulario: FormGroup = this.fb.group({
    'nombre': [, [Validators.required, Validators.minLength(3)]],
    'precio': [, [Validators.min(0), Validators.required]],
    'existencias': [, [Validators.min(0), Validators.required]]
  });

  constructor( private fb: FormBuilder) { }

campoNoValido(campo:string) {
  return this.miFormulario.controls[campo].errors
  && this.miFormulario.controls[campo].touched
}

guardar() {

  if (this.miFormulario.invalid) {
    // si queremos que se muestren todos los errores cuando se pulse
    // el botón guardar, deben cumplirse las condiciones
    // que tenemos en campoNoValido
    // Hay una propiedad para marcar como touched todos los campos
    this.miFormulario.markAllAsTouched();
    return;

  }

  console.log(this.miFormulario.value);
  // limpiamos todos los campos
  this.miFormulario.reset();
}

}
