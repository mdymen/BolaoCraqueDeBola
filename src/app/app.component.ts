import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logado = false;
  menu = [];

  constructor(private route: Router) {
    var usuario = localStorage.getItem("username");
    if (usuario) {
      this.logado = true;
    }
    console.log("logado " + this.logado);
  }

  ngOnInit(): void {
    this.menu.push(new Opciones("Inicio", "fa fa-home", "/palpitarrodada"));

    let admin = localStorage.getItem("username");

    if (admin == "m") {
      this.menu.push(new Opciones("Adicionar Campeonato", "fa fa-home", "/adicionarcampeonato"));
      this.menu.push(new Opciones("Adicionar Partidos", "fa fa-home", "/adicionarpartidos"));
      this.menu.push(new Opciones("Resultados", "fa fa-user", "/partidos"));
      this.menu.push(new Opciones("Setear Rodada", "fa fa-user", "/setrodada"));

    }

  }

  logout() {
    localStorage.clear();
    location.reload();
  }

}

class Opciones {
  link: string;
  icono: string;
  nombre: string;

  constructor( private n: string, private i: string, private l: string) {
    this.link = l;
    this.icono = i;
    this.nombre = n;
  }
}