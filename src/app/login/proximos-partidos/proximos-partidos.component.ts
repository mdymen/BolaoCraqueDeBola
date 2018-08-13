import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend.service';
import { FechaService } from '../../fecha.service';
import { PartidoService } from '../../services/partido.service';
import { Global } from '../../config/global.service';

@Component({
  selector: 'app-proximos-partidos',
  templateUrl: './proximos-partidos.component.html',
  styleUrls: ['./proximos-partidos.component.css']
})
export class ProximosPartidosComponent implements OnInit {

  partidos = [];
  partidosUltimosJugados = [];
  nomes = [];
  erro = false;

  url_img;

  constructor(private http: HttpClient,
    private _partidoService: PartidoService,
    private fechaService: FechaService) {

    this.url_img = Global.URL_BOLAO + Global.ASSETS_EQUIPOS;

  }

  ngOnInit() {
    this.proximosJogos();
    this.ultimosJugados();
  }

  proximosJogos() {

    if (localStorage.getItem("id") === null) {
      this._partidoService.games()
        .subscribe((res: any) => {
          //carga los partidos
          for (let partido of res.body) {
            partido.esHoy = this.esHoy(partido.mt_date) ? true : false;
            this.partidos.push(partido);
          }
          console.log(this.partidos);
        }, error => {
          console.log(error);
          this.erro = true;
        });
    }
  }

  ultimosJugados() {
    if (localStorage.getItem("id") === null) {
      this._partidoService.ultimosJugados()
        .subscribe((res: any) => {
          this.partidosUltimosJugados = res.body;
          console.log(this.partidosUltimosJugados);
        }, error => {
          console.log(error);
          this.erro = true;
        });
    }
  }

  esHoy(fecha: string): boolean {
    return this.fechaService.esHoy(fecha);
  }


}
