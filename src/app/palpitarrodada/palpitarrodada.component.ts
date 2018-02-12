import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Partido } from '../partido';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-palpitarrodada',
  templateUrl: './palpitarrodada.component.html',
  styleUrls: ['./palpitarrodada.component.css']
})

export class PalpitarrodadaComponent implements OnInit {

  campeonatos = [];
  partidos = [];
  campeonato;
  url = "http://www.bolaocraquedebola.com.br";
  rodadas = [];
  campeonatoActual = 0;
  palpitesRealizados = false;

  //para almazenar el id de la rodada actual para setear
  //la classs active
  rodadaActual = 0;

  //indica si ya fue seleccionado un campeonato y cargado. 
  //sirve para mostrar el HTML en la pantalla;
  cargoCampeonato = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {

  }

  ngOnInit() {

    //carga los dados del campeonato en funcion de los parametros de la url
    this.route.params.subscribe(params => {
      this.campeonatoActual = params['campeonato'];

      //si no hay valor en la variable rodada, significa que el parametro
      //de la url rodada viene vacio, entonces tiene que cargar la 
      //rodada actual activa del campeonato
      if (params['rodada']) {
        this.rodadaActual = params['rodada'];
      } else {
        this.rodadaActual = null;
      }
      this.onChange();
    });

    this.http.post("http://bolaocraquedebola.com.br/public/mobile/cellgetcampeonatosabertos/?", {}).
      subscribe(res => {

        this.campeonatos.push(res[0]);
        this.campeonatos.push(res[1]);

      });
  }

  /**
   * carga todo lo necesario para realizar los palpites del campeonato y de la rodada
   */
  public onChange(): void {  

    this.http.post("http://bolaocraquedebola.com.br/public/mobile/cellbolao",
      { id: 3, champ: this.campeonatoActual, rodada: this.rodadaActual })
      .subscribe(res => {

        console.log(res);

        this.cargoCampeonato = true;

        //carga la rodada actual
        this.rodadaActual = res['n_rodada'];

        //carga los numeros de las rodadas para ser seleccionadas
        let rondas = [];
        rondas.push(res['rondas']);
        this.rodadas = rondas[0];

        //para pintar la rodada activa
        for (let rodada of this.rodadas) {
          if (rodada.rd_id == this.rodadaActual) {
            rodada.active = "active";
          }
        }

        //para pintar el campeonato activo
        for (let campeonato of this.campeonatos) {
          if (campeonato.ch_id == this.campeonatoActual) {
            campeonato.active = "blue";
          } else {
            campeonato.active = "white";
          }
        }

        //carga los partidos
        for (let partido of res['rodada']) {
          this.partidos.push(<Partido>partido);
        }

      })
  }

  /**
   * Crea o actualiza todos los palpites de la rodada this.rodadaActual 
   * y del campeonato this.campeonatoActual
   * @param value todos los partidos con los palpites realizados
   */
  logForm(value: any) {
    console.log(value);

    this.http.post("http://bolaocraquedebola.com.br/public/mobile/palpitarrodadatoda", { palpites: value, usuario: 3 })
      .subscribe(resultado => {
        if (resultado == 200) {
          this.palpitesRealizados = true;
        } else {
          this.palpitesRealizados = false;
        }
      })
  }
}