import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [MenubarModule, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Home {
  items: MenuItem[] = [];
  ngOnInit(): void {
    if (1) {
      this.items = [
        {
          label: 'Facturación',
          icon: 'pi pi-fw pi-dollar',
          styleClass: 'icon-color',
          items: [
            { label: 'Apertura de caja', icon: 'pi pi-fw pi-caret-right', routerLink: ['caja-apertura'] },
            { label: 'Cierre de caja', icon: 'pi pi-fw pi-caret-right', routerLink: ['cuadre-caja'] },
            { label: 'Realizar pagos', icon: 'pi pi-fw pi-caret-right', routerLink: ['pagos-consumos'] },
            { label: 'Consultar pagos', icon: 'pi pi-fw pi-caret-right', routerLink: ['pagos-detalles'] },
            { label: 'Consumo detalles', icon: 'pi pi-fw pi-caret-right', routerLink: ['detalle-consumo'] },
            { label: 'Facturación', icon: 'pi pi-fw pi-caret-right', routerLink: ['facturar'] }

          ]
        },
        {
          label: 'Compras',
          icon: 'pi pi-fw pi-folder-open',
          styleClass: 'icon-color',
          items: [
            { label: 'Entradas', icon: 'pi pi-fw pi-caret-right', routerLink: ['compras'] },
            { label: 'Facturas proveedor', icon: 'pi pi-fw pi-caret-right', routerLink: ['facturas'] },
            { label: 'Nuevo proveedor', icon: 'pi pi-fw pi-caret-right', routerLink: ['nuevo-proveedor'] }
          ]
        },
        {
          label: 'Maestros',
          icon: 'pi pi-desktop',
          styleClass: 'icon-color',
          items: [
            { label: 'Nuevo producto', icon: 'pi pi-fw pi-caret-right', routerLink: ['nuevo-producto'] },
            { label: 'Nuevo cliente', icon: 'pi pi-fw pi-caret-right', routerLink: ['nuevo-cliente'] },
            { label: 'Nuevo empleado', icon: 'pi pi-fw pi-caret-right', routerLink: ['nuevo-empleado'] },
            { label: 'Movimientos x mes', icon: 'pi pi-fw pi-caret-right', routerLink: ['movimientos'] },
            { label: 'Gastos operativos', icon: 'pi pi-fw pi-caret-right', routerLink: ['gastos'] },
            { label: 'Pago nómina', icon: 'pi pi-fw pi-caret-right', routerLink: ['nomina'] }
          ]
        },
        {
          label: 'Otros',
          icon: 'pi pi-book',
          styleClass: 'icon-color',
          items: [
            { label: 'Asociaciar producto', icon: 'pi pi-fw pi-caret-right', routerLink: ['vinculos'] },
            { label: 'Editar código.', icon: 'pi pi-fw pi-caret-right', routerLink: ['edita-codigos'] },
            { label: 'Ajuste de precio', icon: 'pi pi-fw pi-caret-right', routerLink: ['ajustar-precios'] },
            { label: 'Ajuste de inventario', icon: 'pi pi-fw pi-caret-right', routerLink: ['ajustar-inventario'] },
            { label: 'Consultar productos.', icon: 'pi pi-fw pi-caret-right', routerLink: ['productos'] },
            { label: 'Realizar inventario', icon: 'pi pi-fw pi-caret-right', routerLink: ['inventario-web'] }
          ]
        },
        {
          label: 'Seguridad',
          icon: 'pi pi-fw pi-lock',
          styleClass: 'icon-color',
          items: [
            { label: 'Cerrar sesion', icon: 'pi pi-fw pi-caret-right', routerLink: ['salir'] }
          ]
        }
      ];
    }

  }
}
