import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ToastController } from '@ionic/angular';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  constructor(private route:ActivatedRoute,private location:Geolocation,public toastControl:ToastController,private sms:SMS) { }

  //DECLARACION DE VARIABLES
  id!:any;
  longitud:string="";
  latitud:string="";
  nombre:string="";
  telefono:string="";
  titulo!:string;
  precio!:number;

  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id');
    this.productos.map((producto)=>{
      if(producto.id==this.id){
        this.titulo=producto.titulo;
        this.precio=producto.precio;
      }
    })
  }

  productos=[
    {
      id:"1",
      img:"../../assets/img/producto1.png",
      titulo:"Pintura para automoviles",
      descripcion:"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T.",
      precio:20,
    },
    {
      id:"2",
      img:"../../assets/img/producto2.jpeg",
      titulo:"Acesorios",
      descripcion:"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T.",
      precio:10
    },
    {
      id:"3",
      img:"../../assets/img/producto3.jpeg",
      titulo:"Rodillos Gama Alta",
      descripcion:"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T.",
      precio:16
    },
  ]

  getLocation(){
    this.location.getCurrentPosition()
    .then((resp)=>{
      this.latitud=(resp.coords.latitude).toString();
      this.longitud=(resp.coords.longitude).toString();
      this.showToast("Tu Ubicacion fue dada con exito");
    })
    .catch((error)=>this.showToast("Ocurrio un error al dar tu ubicacion"+error))
  }

  async showToast(mensaje:string){
    const toast = await this.toastControl.create({
      message:mensaje,
      position:"middle",
      duration: 2000,
      color:"success"
    });
    await toast.present();
  }

  enviarMensaje(){
    let mensaje="Producto: "+this.titulo.toUpperCase()+", precio: "+this.precio+"$, Cliente: "+this.nombre.toUpperCase()+", Nro. Teléfono: "+this.telefono+", Latitud: "+this.latitud+", Longitud: "+this.longitud;
    this.sms.send('04145598216',mensaje);
    this.showToast("¡Mensaje Enviado!");
  }
}
