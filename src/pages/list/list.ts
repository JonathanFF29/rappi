import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, Events } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  
  data: any = {};
  valorAcumulado: any;
  constructor(private params: NavParams, public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,private view: ViewController,private events: Events) {
    this.data = this.params.data.articulosCompra;
    this.valorAcumulado = 0;
  }

  ionViewDidLoad() {
    this.data = this.params.data.articulosCompra;
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      let valor = element.cantidad * element.price;
      this.valorAcumulado += valor;
    }

  }


  quitarCantidadArticulos(articulo) {
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      if (element.id === articulo.id) {
          let cont = this.data[index].cantidad;
          this.data[index].cantidad = cont - 1;
          this.valorAcumulado = this.valorAcumulado - element.price;
          if (this.data[index].cantidad == 0) {
            this.data.splice(index, 1);
          }
      }
    }
    
    localStorage.setItem('compraActual', JSON.stringify(this.data));

  }

  agregarCantidadArticulos(articulo) {
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      if (element.id === articulo.id) {
          let cont = this.data[index].cantidad;
          this.data[index].cantidad = cont + 1;
          this.valorAcumulado = this.valorAcumulado + element.price;
        }
      
    }

    
    localStorage.setItem('compraActual', JSON.stringify(this.data));

  }

  comprar(){
    let alert = this.alertCtrl.create({
      title:'Compra exitosa',
      subTitle:'Gracias por escoger nuestro productos',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {
            this.resetearDatos();
          }
        },
      ]
    });
    alert.present();
  }

  resetearDatos(){
    localStorage.setItem('productos', JSON.stringify(null));
    localStorage.setItem('categorias', JSON.stringify(null));
    this.events.publish('compra', "compra");
    this.data = [];
    this.valorAcumulado = 0;
    this.view.dismiss();
  }


}
