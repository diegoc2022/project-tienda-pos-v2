import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { authGuard } from './auth.guard';
import { Home } from './components/home/home';
import { AjusteInventario } from './components/ajuste-inventario/ajuste-inventario';
import { Productos } from './components/productos/productos';

export const routes: Routes = [
    { path: '', title: 'login', component: Login },
    {
        path: 'menu', component: Home, canActivate: [authGuard],
        children: [
            {
                path: 'ajustar-inventario', title: 'Ajustar inventario', component: AjusteInventario
            },
            {
                path: 'nuevo-producto', title: 'Crear producto', component: Productos
            },
        ]
    }
];
