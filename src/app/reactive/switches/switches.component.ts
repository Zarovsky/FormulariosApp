import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  persona = {
    genero: 'F',
    notificaciones: true
  };

  // para asignarle valores que nos vengan (en el Oninit)
  // sería meterle a miFormulario
  // genero: [this.persona.genero, Validartors.required]
  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // esto es si en el objeto tenemos todos los campos
    // pero no tenemos el campo condiciones en persona
    // this.miFormulario.setValue(this.persona);
    // con reset funciona aún sin todos los campos
    this.miFormulario.reset(this.persona);

    // si no tenemos como validación el requiredTrue para las condiciones
    // el elemento empieza con null y da como válido el formulario
    // a ponerle en false. Para asignar todos los valores, además de persona
    // sería:
    /*
    this.miFormulario.reset({
      ...this.persona,
      condiciones: true
    });
    */

    // podríamos subscripbirnos al formulario
    /*
     this.miFormulario.valueChanges
     .subscribe( form=> {
       delete form.condiciones;
       this.persona = form;
     });
     */
    // otra forma de hacer lo mismo con desestructuración

    this.miFormulario.valueChanges
    .subscribe( ({condiciones, ...rest})=> {
      this.persona = rest;
    });
    
    // incluso subscribirnos a un solo campo
    // this.miFormulario.get('condiciones')?.valueChanges.subscribe( valor => {console.log(valor)});

  }

  guardar() {
    const formValue = {...this.miFormulario.value};
    // no queremos las condiciones
    delete formValue.condiciones;
    // ahora si podemos asignarlo al objeto persona
    this.persona = formValue;
  }


}
