import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { Servicio } from '@app/core/models/servicio.model';
import { ServicioComponent } from '../servicio/servicio.component';

@Component({
  selector: 'app-servicios',
  imports: [ServicioComponent],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiciosComponent implements OnInit {
  $servicios: WritableSignal<Servicio[]> = signal([]);

  constructor(private serviciosService: ServiciosService) {}

  ngOnInit(): void {
    this.getServicios();
  }

  getServicios(): void {
    this.$servicios = this.serviciosService.getServicios();
  }
}
