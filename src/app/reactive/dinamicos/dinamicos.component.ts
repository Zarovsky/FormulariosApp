import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [],
})
export class DinamicosComponent {
  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['metal gear', Validators.required],
      ['Spanish Incident']
    ],Validators.required)
  });
  // otro control enlazado con el input de agregar
  // pero al no pertenecer a miFormulario, se enlaza
  // mediante [formControl]
  nuevoFavorito: FormControl = this.fb.control('',Validators.required);

  get favoritosArr() {
    // esto es para extraer el array de favoritos
    // para el ngFor del html y no tener que montar allí
    // let favorito of miFormulario.controls.favoritos.controls
    return this.miFormulario.get('favoritos') as FormArray;

  }

  constructor(private fb: FormBuilder) {}

  agregarFavorito() {
    if (this.nuevoFavorito.invalid) { return; }

    // lo agregamos al array de miFormulario Favoritos
    // aprovechamos el get que siempre se pasan los objetos
    // por referencia
    // this.favoritosArr.push( new FormControl(this.nuevoFavorito.value, Validators.required));
    // lo mismo pero conel formBuilder (fb)
    this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value, Validators.required));

    // ahora borramos el valor del input que ya lo tenemos
    this.nuevoFavorito.reset();
  }

  eliminar(index: number) {
    this.favoritosArr.removeAt(index);
  }


  campoNoValido(campo: string) {
    return (
      this.miFormulario.controls.nombre.errors &&
      this.miFormulario.controls.nombre.touched
    );
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
