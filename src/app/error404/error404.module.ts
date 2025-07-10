import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404RoutingModule } from './error404-routing.module';
import { Error404Component } from './error404.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [
    CommonModule,
    Error404RoutingModule,
    SharedModule
  ]
})
export class Error404Module { }
