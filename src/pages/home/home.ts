import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { ListPage } from '../list/list';
import { updateDate } from 'ionic-angular/util/datetime-util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Declaracion de variables
  categorias: any = [];
  productoss: any = [];
  productos: any = [];
  productosSeleccionado: any = [];
  productosEspejo: any = [];
  productosCompra: any = [];
  imagen: any;
  imagen2: any;
  cantidad: any;
  precio: any;
  valorAcumulado: any = 0;
  mostrarfiltrar:boolean = false;
  mostrarordenar:boolean = false;
  id: any;

  constructor(public navCtrl: NavController, public http: Http,public modalCtrl: ModalController,
    public alertCtrl: AlertController, private events: Events) {
    // obtenemos las categorias y productos en el constructor
    this.obtenerCategorias();
    this.obtenerProductos();

  }

  // para realizar el cargue de lo necesario cada vez que se ingresa a la vista
  ionViewDidLoad() {
    
    this.productosCompra = JSON.parse(localStorage.getItem("compraActual"));
    if(this.productosCompra == null){
      this.productosCompra = [];
    }else{
      for (let index = 0; index < this.productosCompra.length; index++) {
        const element = this.productosCompra[index];
        let valor = element.cantidad * element.price;
        this.valorAcumulado += valor;
      }
    }
  }

  ionViewWillEnter(){
    // evento para realizar limpieza de datos cuando se realiza compra
    this.events.subscribe('compra', (compra) => {
      console.log("realizo compra", compra);
      this.productosCompra = [];
      this.productosSeleccionado =[];
      this.valorAcumulado = 0
      this.obtenerProductos();
      
    });
   
  }

  
  obtenerCategorias() {
    this.http.get('../assets/servicios/categories.json')
      .subscribe(data => {
        this.categorias = data;
        this.categorias = JSON.parse(this.categorias._body);
      });
  }

  obtenerProductos() {
    this.productos = JSON.parse(localStorage.getItem("productos"));
    if(this.productos == null){
      this.http.get('../assets/servicios/products.json')
      .subscribe(data => {
        this.productoss = data;
        this.productoss = JSON.parse(this.productoss._body);
        this.productos = this.productoss.products;
        this.productos.forEach(element => {
          let precio = element.price.replace('$', '');
          precio = precio.replace(',', '');
          precio = Number(precio);
          element.price = precio;
          element.cantidad = 0;
        });
        localStorage.setItem('productos', JSON.stringify(this.productos));
      });
    }else{

    }
    
  }

  desplegar(id) {
    
    if(this.id == undefined){
      if (id == 0) {
        this.imagen = '../assets/imgs/bebidas.jpg';
      } else if (id == 14) {
        this.imagen = '../assets/imgs/desayuno.jpg';
      } else if (id == 8) {
        this.imagen = '../assets/imgs/almuerzos.jpg';
      } else if (id == 11) {
        this.imagen = '../assets/imgs/vino.jpg';
      }
      this.imagen2 = this.imagen;
    }else if(this.id != id){
      
      if (id == 0) {
        this.imagen2 = '../assets/imgs/bebidas.jpg';
      } else if (id == 14) {
        this.imagen2 = '../assets/imgs/desayuno.jpg';
      } else if (id == 8) {
        this.imagen2 = '../assets/imgs/almuerzos.jpg';
      } else if (id == 11) {
        this.imagen2 = '../assets/imgs/vino.jpg';
      }
    }
    if(this.id != undefined){
      document.getElementById(this.id).classList.toggle("show");
    }
    
    this.id = id;
    document.getElementById(id).classList.toggle("show");
  }

  desplegar1(id, sublevel) {
    this.imagen = this.imagen2;
    if (sublevel.sublevels == undefined) {
      this.buscarProducto(sublevel.id);
    } else {
      let parent = document.getElementById(id);
      if (parent.className === "dropdown-contentb show") {
        parent.setAttribute('class', 'dropdown-contenta');
      } else {
        parent.setAttribute('class', 'dropdown-contentb');
        document.getElementById(id).classList.toggle("show");
      }
    }

  }

  desplegar2(id, sublevel) {
    if (sublevel.sublevels == undefined) {
      this.buscarProducto(sublevel.id);
    } else {
      let parent = document.getElementById(id);
      if (parent.className === "dropdown-contentd show") {
        parent.setAttribute('class', 'dropdown-contentc');
      } else {
        parent.setAttribute('class', 'dropdown-contentd');
        document.getElementById(id).classList.toggle("show");
      }

    }
  }

  desplegar3(sublevel) {
    this.buscarProducto(sublevel.id);
  }

  buscarProducto(producto) {
    this.productosSeleccionado = [];
    this.productos.forEach(element => {
      if (element.sublevel_id == producto) {
        this.productosSeleccionado.push(element);
      }
    });
    this.productosEspejo = this.productosSeleccionado;

  }

  filtrarPorDisponibilidad(estado) {
    this.productosSeleccionado = [];
    this.productosEspejo.forEach(element => {
      if (element.available == estado) {
        this.productosSeleccionado.push(element);
      }
    });

  }

  filtrarPorPrecio() {
    this.productosSeleccionado = [];
    this.productosEspejo.forEach(element => {

      if (element.price <= this.precio) {
        this.productosSeleccionado.push(element);
      }
    });
  }

  filtrarPorCantidad() {
    this.productosSeleccionado = [];
    this.productosEspejo.forEach(element => {
      if (element.quantity <= this.cantidad) {
        this.productosSeleccionado.push(element);
      }
    });
  }


  ordenarPorCantidad(int) {
    if (int == 3) {
      this.productosSeleccionado.sort(this.dynamicSort("quantity"));
    } else if (int == 2) {
      this.productosSeleccionado.sort(this.dynamicSort("available"));
    } else if (int == 1) {
      this.productosSeleccionado.sort(this.dynamicSort("price"));
    }

  }


 // metodo para realizar filtrado de un array por campos
  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  buscarProducto1(producto) {
    this.productosSeleccionado = this.productos.filter((location) => {
      return location.sublevel_id.indexOf(producto);
    });


  }

  agregarArticulo(producto) {
    producto.cantidad = 1;
    producto.imagen = this.imagen;
    this.productosCompra.push(producto);
    if (this.productosCompra.length > 0) {
      //this.valorAcumulado = 0;
      for (let index = 0; index < this.productosCompra.length; index++) {
        const element = this.productosCompra[index];
        if (element.id == producto.id) {
          this.valorAcumulado = this.valorAcumulado + element.price;
        }

      }
    }
    localStorage.setItem('productos', JSON.stringify(this.productos));
    localStorage.setItem('compraActual', JSON.stringify(this.productosCompra));
  }

  quitarCantidadArticulos(producto) {
    for (let index = 0; index < this.productosCompra.length; index++) {
      const element = this.productosCompra[index];
      if (element.id === producto.id) {
        let cont = this.productosCompra[index].cantidad;
        this.productosCompra[index].cantidad = cont - 1;
        this.valorAcumulado = this.valorAcumulado - element.price;
        if (this.productosCompra[index].cantidad == 0) {
          this.productosCompra.splice(index, 1);
        }
      }
    }

    localStorage.setItem('productos', JSON.stringify(this.productos));
    localStorage.setItem('compraActual', JSON.stringify(this.productosCompra));

  }

  agregarCantidadArticulos(producto) {
    for (let index = 0; index < this.productosCompra.length; index++) {
      const element = this.productosCompra[index];
      if (element.id === producto.id) {
        let cont = this.productosCompra[index].cantidad;
        this.productosCompra[index].cantidad = cont + 1;
        this.valorAcumulado = this.valorAcumulado + element.price;

      }
    }
    localStorage.setItem('productos', JSON.stringify(this.productos));
    localStorage.setItem('compraActual', JSON.stringify(this.productosCompra));
  }

  pedidoActual() {
      let profileModal = this.modalCtrl.create(ListPage, { articulosCompra: this.productosCompra });
      profileModal.present();
   
  }

  ordenarfiltrar(int){
    if(int == 1){
       this.mostrarfiltrar = true;
       this.mostrarordenar = false;
    }else if(int == 2){
      this.mostrarfiltrar = false;
      this.mostrarordenar = true;
    }

  }

  filtrar(int){
     if(int == 1){
        this.crearAlertaFiltrarDisponibilidad();
     }else if(int == 2){
      this.crearAlertaFiltrar("precio");
     }else if(int == 3){
      this.crearAlertaFiltrar("cantidad");
     }
  }

  crearAlertaFiltrar(datos) {
    let alert = this.alertCtrl.create({
      title:'Filtrar por' + ' ' + datos,
      cssClass: 'alert-danger2',
      inputs: [
        {
          name: 'dato',
          placeholder: 'Ingrese' + ' ' + datos,
        },

      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            if(datos === 'precio'){
              this.precio = data.dato;
              this.filtrarPorPrecio();
            }else if(datos === 'cantidad'){
              this.cantidad = data.dato;
              this.filtrarPorCantidad();
            }
          }
        }
      ]
    });
    alert.present();
  }
  crearAlertaFiltrarDisponibilidad() {
    let alert = this.alertCtrl.create({
      title:'Filtrar por disponibilidad',
      buttons: [
        {
          text: 'Disponible',
          role: 'cancel',
          handler: () => {
            this.filtrarPorDisponibilidad(true);
          }
        },
        {
          text: 'Agotado',
          handler: data => {
            this.filtrarPorDisponibilidad(false);
          }
        }
      ]
    });
    alert.present();
  }

}
