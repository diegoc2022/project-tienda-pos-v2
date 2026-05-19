import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ComprasService } from '../compras/services/compras.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { format } from 'date-fns';

@Component({
  selector: 'app-factura-proveedor',
  standalone: true,
  templateUrl: './factura-proveedor.html',
  styleUrl: './factura-proveedor.scss',
  imports: [
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    TableModule,
    CommonModule
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FacturaProveedor {
  data!: FormGroup;
  data_factura: any[] = [];
  selectedProduct2: any;
  sub_total_factura: number = 0;
  total_descuento: number = 0;
  total_iva: number = 0;
  total_icui: number = 0;
  total_factura: number = 0;
  num_factura: string = '';
  factura_detalle: any[] = [];
  fecha_actual?: string;
  date: Date = new Date();

  constructor(
    private comprasFacturas: ComprasService,
    private fb: FormBuilder,
    private message: MessageService,
  ) { }

  ngOnInit(): void {
    this.data = this.fb.group({
      factura: ['', Validators.required]
    })
    this.fecha_actual = format(this.date, 'yyyy-MM-dd HH:mm:ss');
  }

  funct_retorna_facturas_historico_c() {
    if (this.data.value.factura != '') {
      this.comprasFacturas.funct_retorna_facturas_compras_s(this.data.value.factura).subscribe({
        next: (data: any) => {
          const obj = JSON.stringify(data);
          const objs = JSON.parse(obj);
          if (objs.length > 0) {
            this.num_factura = '';
            this.sub_total_factura = 0;
            this.total_descuento = 0;
            this.total_iva = 0;
            this.total_icui = 0;
            this.total_factura = 0;
            this.factura_detalle = [];
            for (let index = 0; index < objs.length; index++) {
              this.num_factura = objs[index].num_factura;
              this.sub_total_factura += Math.round(objs[index].subtotal);
              this.total_descuento += Math.round(objs[index].total_descuento);
              this.total_iva += Math.round(objs[index].total_iva);
              this.total_icui += Math.round(objs[index].total_icui);
              this.total_factura += Math.round(objs[index].total_compras);
              this.factura_detalle.push({
                factura: objs[index].num_factura,
                cod_producto: objs[index].cod_producto,
                descripcion: objs[index].descripcion,
                precio_unitario: parseFloat(objs[index].precio_unitario).toFixed(2),
                cantidad: parseFloat(objs[index].cantidad),
                subtotal: parseFloat(objs[index].subtotal).toFixed(2),
                total_descuento: parseFloat(objs[index].total_descuento).toFixed(2),
                total_iva: parseFloat(objs[index].total_iva).toFixed(2),
                total_icui: parseFloat(objs[index].total_icui).toFixed(2),
                total_compras: Math.round(objs[index].total_compras),
                fecha_registro: objs[index].fecha_registro
              });
            }

          } else {
            this.message.add({ severity: 'warn', summary: 'Advertencia', detail: 'Factura no existe en base de datos' });
          }
        }
      })
    } else {
      this.message.add({ severity: 'warn', summary: 'Advertencia', detail: 'Para realizar una consulta, debe ingresar número de factura' });
    }
  }

  funct_elimina_factura_compras_c() {
    if (this.num_factura != '') {
      Swal.fire({
        title: 'Está seguro?',
        text: 'Que desea migrar las ventas del dia',
        icon: 'warning',
        width: '350',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      } as SweetAlertOptions).then((result) => {
        if (result.value) {
          this.comprasFacturas.funt_elimina_compras_factura_historico_s(this.data.value.factura).subscribe({
            next: (data: any) => {
              this.comprasFacturas.funct_elimina_compras_facturas_s(this.data.value.factura).subscribe({
                next: (data: any) => {
                  this.factura_detalle = [];
                  this.sub_total_factura = 0;
                  this.total_descuento = 0;
                  this.total_iva = 0;
                  this.total_icui = 0;
                  this.total_factura = 0;
                  this.data.get('factura')?.setValue('');
                  this.message.add({ severity: 'success', summary: 'Informativo', detail: 'Factura eliminada del sistema, debe registrarla nuevamente por el formulario de compras', life: 3000 });
                  const nextElement = (document.querySelector(`[formControlName="factura"]`) as HTMLElement);
                  nextElement.focus();
                }
              })
            }
          })
        }
      });
    } else {
      this.message.add({ severity: 'warn', summary: 'Advertencia', detail: 'Para eliminar, prinero debe realizar la consulta de la factura', life: 3000 });
    }

  }
}
