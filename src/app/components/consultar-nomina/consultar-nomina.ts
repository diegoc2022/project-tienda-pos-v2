import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DatePickerModule } from 'primeng/datepicker';
import { format } from 'date-fns';
import { ConsultarNominaService } from './services/consultar-nomina.service';
import { EmpleadosService } from '../empleados/services/empleados.service';

@Component({
  selector: 'app-consultar-nomina',
  standalone: true,
  templateUrl: './consultar-nomina.html',
  styleUrl: './consultar-nomina.scss',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    SelectModule,
    InputNumberModule,
    TableModule,
    DatePickerModule
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultarNomina {
  @ViewChild('gastos') inputNumberRef?: any;
  data2!: FormGroup;
  tipo_concepto: any[] = [];
  pago_nomina: any[] = [];
  data_empleados: any[] = [];
  num_mes: any;
  num_year: any;
  nombre: any;
  date: Date = new Date();
  fecha_actual?: string;
  hora_actual?: string;
  total_nomina: number = 0;
  seleccionado: any = null;
  seleccionado2: any = null;
  seleccionado3: any = null;
  seleccionado4: any = null;
  seleccionado5: any = null;

  constructor(
    private fb: FormBuilder,
    private nomina: ConsultarNominaService,
    private empleado: EmpleadosService,
    private message: MessageService,

  ) { }

  ngOnInit(): void {
    this.data2 = this.fb.group({
      cedula: ['', Validators.required],
      fecha_d: ['', Validators.required],
      fecha_h: ['', Validators.required]
    });

    this.tipo_concepto = [
      { name: 'Pago nómina', code: '1 - PAGO NOMINA' },
      { name: 'Pago horas extras', code: '2 - PAGO HORAS EXTRAS' },
      { name: 'Pago dia dominical', code: '3 - PAGO DIA DOMINICAL' },
      { name: 'Pago dia festivo', code: '4 - PAGO DIA FESTIVO' }
    ];

    this.fecha_actual = format(this.date, 'd-M-yyyy');
    this.num_mes = format(this.date, 'M');
    this.num_year = format(this.date, 'yyyy');
    this.hora_actual = format(this.date, 'HH:mm');
    this.funct_retorna_empleados_c();

  }

  funct_retorna_empleados_c() {
    this.empleado.funct_retorna_empleados_s().subscribe({
      next: (data: any) => {
        const objData = JSON.stringify(data);
        const obj = JSON.parse(objData);
        this.data_empleados = [];
        for (let index = 0; index < obj.length; index++) {
          this.data_empleados.push(obj[index]);
        }
      }
    })
  }


  funct_retorna_pago_nomina_c() {
    if (this.data2.invalid) {
      this.data2.markAllAsTouched();
      for (const key in this.data2.controls) {
        this.data2.controls[key].markAsDirty();
      }
      this.message.add({ severity: 'error', summary: 'Error:', detail: 'Para consultar nómina debe llenar todos los campos' });
      return;
    }

    this.nomina.funt_retorna_pagos_nomina_s(this.data2.value.cedula, this.data2.value.fecha_d, this.data2.value.fecha_h).subscribe({
      next: (data: any) => {
        const objData = JSON.stringify(data);
        const obj = JSON.parse(objData);
        this.pago_nomina = [];
        this.total_nomina = 0;
        console.log("data:: ", obj);
        if (obj.length > 0) {
          for (let index = 0; index < obj.length; index++) {
            this.total_nomina += obj[index].valor_pago;
            this.pago_nomina.push({
              cedula: obj[index].cedula,
              fecha_desde: obj[index].fecha_desde,
              fecha_hasta: obj[index].fecha_hasta,
              concepto: obj[index].concepto,
              valor_pago: obj[index].valor_pago
            });
          }
        } else {
          this.message.add({ severity: 'warn', summary: 'Advertencia:', detail: 'No hay pagos registrados para este empleado en las fecha seleccionadas', life: 5000 });
        }
      }
    })
  }



  funct_onchange(data: any) {
    this.empleado.funct_retorna_one_empleados_s(this.data2.value.cedula).subscribe({
      next: (data: any) => {
        const objData = JSON.stringify(data);
        const obj = JSON.parse(objData);
        this.pago_nomina = [];
        this.total_nomina = 0;
        this.nombre = obj[0].nombre


      }
    })
  }
}
