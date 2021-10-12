import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li{
      cursor: pointer;
    }
  `
  ]
})
export class PorPaisComponent{  
  termino: string ='';
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  hayError: boolean = false;
  mostrarSugerencias : boolean = false;

  constructor(private paisService: PaisService) { }

  buscar(termino: string){
    this.mostrarSugerencias = false;
      this.hayError = false;
      this.termino = termino;

      this.paisService.buscarPais(this.termino)
      .subscribe((paises: Country[]) => {   
        console.log(paises);
             
        if(paises.length === undefined){
          this.hayError = true
          this.paises = [];
        }else{
          this.paises = paises;
        }       
      }, (err) => {
        this.hayError = true;
        this.paises = [];       
      });
  }

  sugerencias(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino)
    .subscribe(
      paises => this.paisesSugeridos = paises.splice(0,3),
      (err) => this.paisesSugeridos =[]);
  }

  buscarSugerido( termino: string){
    this.buscar(termino);    
  }
}
