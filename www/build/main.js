webpackJsonp([0],{

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 150;

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_list__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, http, modalCtrl, alertCtrl, events) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.events = events;
        // Declaracion de variables
        this.categorias = [];
        this.productoss = [];
        this.productos = [];
        this.productosSeleccionado = [];
        this.productosEspejo = [];
        this.productosCompra = [];
        this.valorAcumulado = 0;
        this.mostrarfiltrar = false;
        this.mostrarordenar = false;
        // obtenemos las categorias y productos en el constructor
        this.obtenerCategorias();
        this.obtenerProductos();
    }
    // para realizar el cargue de lo necesario cada vez que se ingresa a la vista
    HomePage.prototype.ionViewDidLoad = function () {
        this.productosCompra = JSON.parse(localStorage.getItem("compraActual"));
        if (this.productosCompra == null) {
            this.productosCompra = [];
        }
        else {
            for (var index = 0; index < this.productosCompra.length; index++) {
                var element = this.productosCompra[index];
                var valor = element.cantidad * element.price;
                this.valorAcumulado += valor;
            }
        }
    };
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // evento para realizar limpieza de datos cuando se realiza compra
        this.events.subscribe('compra', function (compra) {
            console.log("realizo compra", compra);
            _this.productosCompra = [];
            _this.productosSeleccionado = [];
            _this.valorAcumulado = 0;
            _this.obtenerProductos();
        });
    };
    HomePage.prototype.obtenerCategorias = function () {
        var _this = this;
        this.http.get('../assets/servicios/categories.json')
            .subscribe(function (data) {
            _this.categorias = data;
            _this.categorias = JSON.parse(_this.categorias._body);
        });
    };
    HomePage.prototype.obtenerProductos = function () {
        var _this = this;
        this.productos = JSON.parse(localStorage.getItem("productos"));
        if (this.productos == null) {
            this.http.get('../assets/servicios/products.json')
                .subscribe(function (data) {
                _this.productoss = data;
                _this.productoss = JSON.parse(_this.productoss._body);
                _this.productos = _this.productoss.products;
                _this.productos.forEach(function (element) {
                    var precio = element.price.replace('$', '');
                    precio = precio.replace(',', '');
                    precio = Number(precio);
                    element.price = precio;
                    element.cantidad = 0;
                });
                localStorage.setItem('productos', JSON.stringify(_this.productos));
            });
        }
        else {
        }
    };
    HomePage.prototype.desplegar = function (id) {
        if (this.id == undefined) {
            if (id == 0) {
                this.imagen = '../assets/imgs/bebidas.jpg';
            }
            else if (id == 14) {
                this.imagen = '../assets/imgs/desayuno.jpg';
            }
            else if (id == 8) {
                this.imagen = '../assets/imgs/almuerzos.jpg';
            }
            else if (id == 11) {
                this.imagen = '../assets/imgs/vino.jpg';
            }
            this.imagen2 = this.imagen;
        }
        else if (this.id != id) {
            if (id == 0) {
                this.imagen2 = '../assets/imgs/bebidas.jpg';
            }
            else if (id == 14) {
                this.imagen2 = '../assets/imgs/desayuno.jpg';
            }
            else if (id == 8) {
                this.imagen2 = '../assets/imgs/almuerzos.jpg';
            }
            else if (id == 11) {
                this.imagen2 = '../assets/imgs/vino.jpg';
            }
        }
        if (this.id != undefined) {
            document.getElementById(this.id).classList.toggle("show");
        }
        this.id = id;
        document.getElementById(id).classList.toggle("show");
    };
    HomePage.prototype.desplegar1 = function (id, sublevel) {
        this.imagen = this.imagen2;
        if (sublevel.sublevels == undefined) {
            this.buscarProducto(sublevel.id);
        }
        else {
            var parent = document.getElementById(id);
            if (parent.className === "dropdown-contentb show") {
                parent.setAttribute('class', 'dropdown-contenta');
            }
            else {
                parent.setAttribute('class', 'dropdown-contentb');
                document.getElementById(id).classList.toggle("show");
            }
        }
    };
    HomePage.prototype.desplegar2 = function (id, sublevel) {
        if (sublevel.sublevels == undefined) {
            this.buscarProducto(sublevel.id);
        }
        else {
            var parent = document.getElementById(id);
            if (parent.className === "dropdown-contentd show") {
                parent.setAttribute('class', 'dropdown-contentc');
            }
            else {
                parent.setAttribute('class', 'dropdown-contentd');
                document.getElementById(id).classList.toggle("show");
            }
        }
    };
    HomePage.prototype.desplegar3 = function (sublevel) {
        this.buscarProducto(sublevel.id);
    };
    HomePage.prototype.buscarProducto = function (producto) {
        var _this = this;
        this.productosSeleccionado = [];
        this.productos.forEach(function (element) {
            if (element.sublevel_id == producto) {
                _this.productosSeleccionado.push(element);
            }
        });
        this.productosEspejo = this.productosSeleccionado;
    };
    HomePage.prototype.filtrarPorDisponibilidad = function (estado) {
        var _this = this;
        this.productosSeleccionado = [];
        this.productosEspejo.forEach(function (element) {
            if (element.available == estado) {
                _this.productosSeleccionado.push(element);
            }
        });
    };
    HomePage.prototype.filtrarPorPrecio = function () {
        var _this = this;
        this.productosSeleccionado = [];
        this.productosEspejo.forEach(function (element) {
            if (element.price <= _this.precio) {
                _this.productosSeleccionado.push(element);
            }
        });
    };
    HomePage.prototype.filtrarPorCantidad = function () {
        var _this = this;
        this.productosSeleccionado = [];
        this.productosEspejo.forEach(function (element) {
            if (element.quantity <= _this.cantidad) {
                _this.productosSeleccionado.push(element);
            }
        });
    };
    HomePage.prototype.ordenarPorCantidad = function (int) {
        if (int == 3) {
            this.productosSeleccionado.sort(this.dynamicSort("quantity"));
        }
        else if (int == 2) {
            this.productosSeleccionado.sort(this.dynamicSort("available"));
        }
        else if (int == 1) {
            this.productosSeleccionado.sort(this.dynamicSort("price"));
        }
    };
    // metodo para realizar filtrado de un array por campos
    HomePage.prototype.dynamicSort = function (property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    };
    HomePage.prototype.buscarProducto1 = function (producto) {
        this.productosSeleccionado = this.productos.filter(function (location) {
            return location.sublevel_id.indexOf(producto);
        });
    };
    HomePage.prototype.agregarArticulo = function (producto) {
        producto.cantidad = 1;
        producto.imagen = this.imagen;
        this.productosCompra.push(producto);
        if (this.productosCompra.length > 0) {
            //this.valorAcumulado = 0;
            for (var index = 0; index < this.productosCompra.length; index++) {
                var element = this.productosCompra[index];
                if (element.id == producto.id) {
                    this.valorAcumulado = this.valorAcumulado + element.price;
                }
            }
        }
        localStorage.setItem('productos', JSON.stringify(this.productos));
        localStorage.setItem('compraActual', JSON.stringify(this.productosCompra));
    };
    HomePage.prototype.quitarCantidadArticulos = function (producto) {
        for (var index = 0; index < this.productosCompra.length; index++) {
            var element = this.productosCompra[index];
            if (element.id === producto.id) {
                var cont = this.productosCompra[index].cantidad;
                this.productosCompra[index].cantidad = cont - 1;
                this.valorAcumulado = this.valorAcumulado - element.price;
                if (this.productosCompra[index].cantidad == 0) {
                    this.productosCompra.splice(index, 1);
                }
            }
        }
        localStorage.setItem('productos', JSON.stringify(this.productos));
        localStorage.setItem('compraActual', JSON.stringify(this.productosCompra));
    };
    HomePage.prototype.agregarCantidadArticulos = function (producto) {
        for (var index = 0; index < this.productosCompra.length; index++) {
            var element = this.productosCompra[index];
            if (element.id === producto.id) {
                var cont = this.productosCompra[index].cantidad;
                this.productosCompra[index].cantidad = cont + 1;
                this.valorAcumulado = this.valorAcumulado + element.price;
            }
        }
        localStorage.setItem('productos', JSON.stringify(this.productos));
        localStorage.setItem('compraActual', JSON.stringify(this.productosCompra));
    };
    HomePage.prototype.pedidoActual = function () {
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__list_list__["a" /* ListPage */], { articulosCompra: this.productosCompra });
        profileModal.present();
    };
    HomePage.prototype.ordenarfiltrar = function (int) {
        if (int == 1) {
            this.mostrarfiltrar = true;
            this.mostrarordenar = false;
        }
        else if (int == 2) {
            this.mostrarfiltrar = false;
            this.mostrarordenar = true;
        }
    };
    HomePage.prototype.filtrar = function (int) {
        if (int == 1) {
            this.crearAlertaFiltrarDisponibilidad();
        }
        else if (int == 2) {
            this.crearAlertaFiltrar("precio");
        }
        else if (int == 3) {
            this.crearAlertaFiltrar("cantidad");
        }
    };
    HomePage.prototype.crearAlertaFiltrar = function (datos) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Filtrar por' + ' ' + datos,
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
                    handler: function () {
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function (data) {
                        if (datos === 'precio') {
                            _this.precio = data.dato;
                            _this.filtrarPorPrecio();
                        }
                        else if (datos === 'cantidad') {
                            _this.cantidad = data.dato;
                            _this.filtrarPorCantidad();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.crearAlertaFiltrarDisponibilidad = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Filtrar por disponibilidad',
            buttons: [
                {
                    text: 'Disponible',
                    role: 'cancel',
                    handler: function () {
                        _this.filtrarPorDisponibilidad(true);
                    }
                },
                {
                    text: 'Agotado',
                    handler: function (data) {
                        _this.filtrarPorDisponibilidad(false);
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\PaginasyApp\rappid\rappi\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>El Baratón</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n\n    <ion-row wrap>\n\n      <ion-col class="display" col-12 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-20>\n        <div style="height: 120px;width: 100px;margin-left: 33%;">\n          <img src="../assets/imgs/rappi.png">\n        </div>\n        <ion-row style="background-color:white;margin:2%;padding:2%;">\n          <p style="text-align: center;font-size:12pt;color:black">Filtros</p>\n        </ion-row>\n        <ion-row style="background-color:white;margin:2%;padding:2%;">\n\n          <ion-col col-6 col-xl-8 col-lg-12 col-md-6 col-sm-4 col-xs-3>\n            <div>\n              <p style="color:#FB5B5B;font-size:10pt;">\n                <ion-icon name="thumbs-up" item-star large></ion-icon> Por disponibilidad</p>\n            </div>\n          </ion-col>\n\n          <ion-col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-6 col-xs-3>\n            <div style="display: flex;justify-content: space-between;">\n              <button (click)="filtrarPorDisponibilidad(true)" ion-button style="background:#FB5B5B;text-align:center;">\n                disponible\n              </button>\n              <button (click)="filtrarPorDisponibilidad(false)" ion-button style="background:#FB5B5B;text-align:center;">\n                agotado\n              </button>\n            </div>\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row style="background-color:white;margin:2%;padding:2%;">\n\n          <ion-col col-6 col-xl-8 col-lg-12 col-md-6 col-sm-4 col-xs-3>\n            <div>\n              <p style="color:#FB5B5B;font-size:10pt;">\n                <ion-icon name="logo-usd" item-star large></ion-icon> Por precio</p>\n            </div>\n          </ion-col>\n\n          <ion-col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-6 col-xs-3>\n            <div style="display: flex;justify-content: space-between;">\n              <ion-input style="color:#000000;font-size:10pt;" type="text" [(ngModel)]="precio" placeholder="ingrese el precio"></ion-input>\n              <button (click)="filtrarPorPrecio()" ion-button style="background:#FB5B5B;text-align:center;">\n                Aceptar\n              </button>\n            </div>\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row style="background-color:white;margin:2%;padding:2%;">\n\n          <ion-col col-6 col-xl-8 col-lg-12 col-md-6 col-sm-4 col-xs-3>\n            <div>\n              <p style="color:#FB5B5B;font-size:10pt;">\n                <ion-icon name="stats" item-star large></ion-icon> Por cantidad</p>\n            </div>\n          </ion-col>\n\n          <ion-col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-6 col-xs-3>\n            <div style="display: flex;justify-content: space-between;">\n              <ion-input style="color:#000000;font-size:10pt;" type="text" [(ngModel)]="cantidad" placeholder="ingrese la cantidad"></ion-input>\n              <button (click)="filtrarPorCantidad()" ion-button style="background:#FB5B5B;text-align:center;">\n                Aceptar\n              </button>\n            </div>\n          </ion-col>\n\n        </ion-row>\n        <ion-row style="background-color:white;margin:2%;padding:2%;">\n          <p style="text-align: center;font-size:12pt;color:black">Ordenar por:</p>\n        </ion-row>\n        <ion-row style="background-color:white;margin:2%;padding:2%;">\n\n          <ion-col col-12 col-xl-12 col-lg-22 col-md-12 col-sm-10 col-xs-3>\n            <div style="display: flex;justify-content: space-between;">\n              <button (click)="ordenarPorCantidad(1)" ion-button style="background:#FB5B5B;text-align:center;font-size:8pt;">\n                precio\n              </button>\n              <button (click)="ordenarPorCantidad(2)" ion-button style="background:#FB5B5B;text-align:center;font-size:8pt;">\n                disponible\n              </button>\n              <button (click)="ordenarPorCantidad(3)" ion-button style="background:#FB5B5B;text-align:center;font-size:8pt;">\n                cantidad\n              </button>\n            </div>\n          </ion-col>\n\n        </ion-row>\n\n      </ion-col>\n      <ion-col class="display2" col-12 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-20>\n        <ion-row style="background-color:white;">\n\n          <ion-col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-6 col-xs-3>\n            <div style="display: flex;justify-content: space-between;">\n              <button (click)="ordenarfiltrar(1)" ion-button style="background:#FB5B5B;text-align:center;width:50%;">\n                filtrar\n              </button>\n              <button (click)="ordenarfiltrar(2)" ion-button style="background:#FB5B5B;text-align:center;width:50%;">\n                ordenar\n              </button>\n            </div>\n          </ion-col>\n\n        </ion-row>\n        <ion-row *ngIf="mostrarfiltrar" style="background-color:white;">\n\n          <ion-col col-12 col-xl-12 col-lg-22 col-md-12 col-sm-10 col-xs-3>\n            <div style="display: flex;justify-content: space-between;">\n              <button (click)="filtrar(1)" ion-button style="background:#FB5B5B;text-align:center;font-size:8pt;width:30%;">\n                disponibilidad\n              </button>\n              <button (click)="filtrar(2)" ion-button style="background:#FB5B5B;text-align:center;font-size:8pt;width:30%;">\n                por precio\n              </button>\n              <button (click)="filtrar(3)" ion-button style="background:#FB5B5B;text-align:center;font-size:8pt;width:30%;">\n                por cantidad\n              </button>\n            </div>\n          </ion-col>\n\n        </ion-row>\n        <ion-row *ngIf="mostrarordenar" style="background-color:white;">\n\n          <ion-col col-12 col-xl-12 col-lg-22 col-md-12 col-sm-10 col-xs-3>\n            <div style="display: flex;justify-content: space-between;">\n              <button (click)="ordenarPorCantidad(1)" ion-button style="background:#FB5B5B;text-align:center;font-size:8pt;width:30%;">\n                precio\n              </button>\n              <button (click)="ordenarPorCantidad(2)" ion-button style="background:#FB5B5B;text-align:center;font-size:8pt;width:30%;">\n                disponible\n              </button>\n              <button (click)="ordenarPorCantidad(3)" ion-button style="background:#FB5B5B;text-align:center;font-size:8pt;width:30%;">\n                cantidad\n              </button>\n            </div>\n          </ion-col>\n\n        </ion-row>\n\n\n      </ion-col>\n      <ion-col col-12 col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-20>\n        <div class="navbar">\n          <div class="dropdown" *ngFor="let categoria of categorias.categories">\n            <button class="dropbtn" (click)="desplegar(categoria.id)">{{categoria.name}}\n              <i class="fa fa-caret-down"></i>\n            </button>\n            <div class="dropdown-content" id="{{categoria.id}}">\n              <ion-col *ngFor="let sublevel of categoria.sublevels">\n                <a (click)="desplegar1(sublevel.id, sublevel)">{{sublevel.name}}</a>\n\n                <div class="dropdown-contenta" id="{{sublevel.id}}">\n                  <ion-col *ngFor="let sublevel2 of sublevel.sublevels">\n                    <a (click)="desplegar2(sublevel2.id, sublevel2)">{{sublevel2.name}}</a>\n\n                    <div class="dropdown-contentc" id="{{sublevel2.id}}">\n                      <ion-col *ngFor="let sublevel3 of sublevel2.sublevels">\n                        <a (click)="desplegar3(sublevel3)">{{sublevel3.name}}</a>\n                      </ion-col>\n                    </div>\n\n\n                  </ion-col>\n                </div>\n\n              </ion-col>\n            </div>\n          </div>\n        </div>\n        <ion-row>\n          <ion-col *ngFor="let producto of productosSeleccionado" col-6 col-xl-4 col-lg-6 col-md-6 col-sm-5 col-xs-3>\n\n\n            <div style="height: 120px;width: 100px;margin-left: 33%;">\n              <img src="{{imagen}}">\n            </div>\n            <h2 style="color:black;font-size:10pt;text-align:center;">Nombre: {{producto.name}}</h2>\n            <h2 style="color:black;font-size:10pt;text-align:center;">Cantidad: {{producto.quantity}}</h2>\n            <h2 style="color:black;font-size:10pt;text-align:center;">Precio:$ {{producto.price}}</h2>\n            <h2 style="color:black;font-size:10pt;text-align:center;">disponible: {{producto.available}}</h2>\n            <div *ngIf="producto.cantidad  == 0">\n              <button *ngIf="producto.available == true" ion-button style="background:#00ff00;text-align:center;margin-left: 35%;">\n                <div (click)="agregarArticulo(producto)" style="text-align:center;color:white;">Agregar</div>\n              </button>\n              <button *ngIf="producto.available == false" ion-button style="background:#FB5B5B;text-align:center;margin-left: 35%;">\n                <div style="text-align:center;color:white;">Agotado</div>\n              </button>\n            </div>\n            <div style="text-align: center;" *ngIf="producto.cantidad > 0">\n              <button ion-button style="background:white;text-align:center;width:60%;">\n                <ion-icon style="color:#FB5B5B;" name="USD"></ion-icon>\n                <div style="text-align:center;color:black;background-color:white;">\n                  <ion-icon (click)="quitarCantidadArticulos(producto)" style="font-size: 1.9em;margin-right: 20%;color:#FB5B5B" name="remove-circle"></ion-icon>\n                  {{producto.cantidad}}\n                  <ion-icon (click)="agregarCantidadArticulos(producto)" style="font-size: 1.9em;margin-left: 10%;color:#FB5B5B" name="add-circle"></ion-icon>\n                </div>\n              </button>\n            </div>\n\n          </ion-col>\n        </ion-row>\n\n      </ion-col>\n\n\n    </ion-row>\n\n\n\n  </ion-grid>\n</ion-content>\n<ion-footer (click)="pedidoActual()" class="footerTitle" no-border>\n  <div style="display:flex;">\n    <ion-row>\n      <ion-col style="background:#FB5B5B;">\n        <button ion-button icon-left clear small>\n\n          <div style="text-align:center;color:#000000;display: flex;justify-content: space-between;">\n\n            <p style="color:white;font-size:0.5 rem">Tu pédido: </p>\n            <p style="color:white;font-size:0.1 rem"> .............</p>\n            <p style="color:white;font-size:1.4 rem">$ {{valorAcumulado}}</p>\n\n          </div>\n          <ion-icon style="color:white;text-align:center;" name="cart" right></ion-icon>\n\n        </button>\n      </ion-col>\n    </ion-row>\n\n\n  </div>\n</ion-footer>'/*ion-inline-end:"D:\PaginasyApp\rappid\rappi\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]) === "function" && _e || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(219);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Inicio', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Compra', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\PaginasyApp\rappid\rappi\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n    <div style="height: 120px;width: 100px;margin-left: 33%;">\n      <img src="../assets/imgs/rappi.png">\n    </div>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"D:\PaginasyApp\rappid\rappi\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(params, navCtrl, navParams, alertCtrl, view, events) {
        this.params = params;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.view = view;
        this.events = events;
        this.data = {};
        this.data = this.params.data.articulosCompra;
        this.valorAcumulado = 0;
    }
    ListPage.prototype.ionViewDidLoad = function () {
        this.data = this.params.data.articulosCompra;
        for (var index = 0; index < this.data.length; index++) {
            var element = this.data[index];
            var valor = element.cantidad * element.price;
            this.valorAcumulado += valor;
        }
    };
    ListPage.prototype.quitarCantidadArticulos = function (articulo) {
        for (var index = 0; index < this.data.length; index++) {
            var element = this.data[index];
            if (element.id === articulo.id) {
                var cont = this.data[index].cantidad;
                this.data[index].cantidad = cont - 1;
                this.valorAcumulado = this.valorAcumulado - element.price;
                if (this.data[index].cantidad == 0) {
                    this.data.splice(index, 1);
                }
            }
        }
        localStorage.setItem('compraActual', JSON.stringify(this.data));
    };
    ListPage.prototype.agregarCantidadArticulos = function (articulo) {
        for (var index = 0; index < this.data.length; index++) {
            var element = this.data[index];
            if (element.id === articulo.id) {
                var cont = this.data[index].cantidad;
                this.data[index].cantidad = cont + 1;
                this.valorAcumulado = this.valorAcumulado + element.price;
            }
        }
        localStorage.setItem('compraActual', JSON.stringify(this.data));
    };
    ListPage.prototype.comprar = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Compra exitosa',
            subTitle: 'Gracias por escoger nuestro productos',
            buttons: [
                {
                    text: 'Aceptar',
                    role: 'cancel',
                    handler: function () {
                        _this.resetearDatos();
                    }
                },
            ]
        });
        alert.present();
    };
    ListPage.prototype.resetearDatos = function () {
        localStorage.setItem('productos', JSON.stringify(null));
        localStorage.setItem('categorias', JSON.stringify(null));
        this.events.publish('compra', "compra");
        this.data = [];
        this.valorAcumulado = 0;
        this.view.dismiss();
    };
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"D:\PaginasyApp\rappid\rappi\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Compra Actual</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-scroll style="height:100%;" scrollY="true">\n    <div>\n\n      <ion-list *ngFor="let articulo of data">\n        <ion-item>\n          <ion-avatar style="width: 90px;height: 90px;" item-start>\n            <p style="text-align: right;">Cantidad: {{articulo.cantidad}}</p>\n            <img style="width: 90px;height: 90px;" src="{{articulo.imagen}}">\n\n          </ion-avatar>\n          <div style="display: flex;justify-content: space-between;text-align:center;">\n            <div>\n              <h4 style="padding-top: 5%;color:#000000;text-align: left;">Nombre: {{articulo.name}}</h4>\n              <h5 style="padding-top: 30%;color:#999999;">${{articulo.price}}</h5>\n            </div>\n            <div style="padding-left: 5%;">\n\n              <ion-icon (click)="quitarCantidadArticulos(articulo)" style="font-size: 1.9em;color:#FB5B5B" name="remove-circle"></ion-icon>\n              <ion-icon (click)="agregarCantidadArticulos(articulo)" style="font-size: 1.9em;color:#FB5B5B"  name="add-circle"></ion-icon>\n\n\n             \n            </div>\n          </div>\n        </ion-item>\n      </ion-list>\n    </div>\n\n    <div style="display: flex;justify-content: space-between;">\n      <div>\n        \n        <h2 style="color:black;font-size: 1.8rem; ">Total</h2>\n      </div>\n      <div>\n        <h2 style="color:black;font-size: 1.5rem;text-align:left; ">$ {{valorAcumulado}}</h2>\n      </div>\n\n    </div>\n    <button ion-button (click)="comprar()"  item-end icon-left style="text-align:center;width:100%;background-color:#FB5B5B;color:white;"\n      >\n      Comprar\n    </button>\n\n\n\n  </ion-scroll>\n</ion-content>'/*ion-inline-end:"D:\PaginasyApp\rappid\rappi\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]) === "function" && _f || Object])
    ], ListPage);
    return ListPage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=list.js.map

/***/ })

},[196]);
//# sourceMappingURL=main.js.map