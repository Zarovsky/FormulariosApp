import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


interface Persona {
  nombre:string,
  favoritos: Favorito[]
}

interface Favorito {
  id: number,
  nombre: string
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent  {

nuevoJuego : string = '';

persona: Persona = {
  nombre: 'David',
  favoritos: [
    { id:1,nombre: 'Call of Duty'},
    { id:2,nombre: 'School Days'}
  ]
}

  guardar() {

  }

  agregarJuego() {
    const nuevoJuegoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push({ ...nuevoJuegoFavorito});
    this.nuevoJuego = '';
  }

  eliminar(i : number) {
    this.persona.favoritos.splice(i,1);
  }

}
