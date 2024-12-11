import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-servicios',
  imports: [FormsModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiciosComponent {
  // Servicios con precios iniciales y opciones adicionales
  servicios = [
    {
      id: 'eventos',
      nombre: 'Eventos',
      descripcion:
        'Un servicio profesional para cortar jamón en todo tipo de eventos. Personalizado para cada ocasión.',
      precio: 100,
      precioIncremento: 20, // Incremento por check de "Incrementar precio"
      precioFinal: 100,
      gasolina: false,
      platos: false,
      distancia: 30, // Distancia en km desde Aspe
    },
    {
      id: 'cortarJamon',
      nombre: 'Cortar Jamón',
      descripcion:
        'Corte profesional de jamón con 15 años de experiencia, perfecto para cualquier tipo de ocasión.',
      precio: 80,
      precioIncremento: 15, // Incremento por check de "Incrementar precio"
      precioFinal: 80,
      gasolina: false,
      platos: false,
      distancia: 30, // Distancia en km desde Aspe
    },
  ];

  // Función para actualizar el precio cuando se marca el check
  togglePrecio(serviceId: string, event: Event, opcion: string) {
    const target = event.target as HTMLInputElement; // Cast to HTMLInputElement
    const servicio = this.servicios.find((s) => s.id === serviceId);
    if (servicio) {
      // Actualizar el estado de la opción seleccionada
      if (opcion === 'incrementar') {
        servicio.precioFinal = target.checked
          ? servicio.precio + servicio.precioIncremento
          : servicio.precio;
      } else if (opcion === 'gasolina') {
        servicio.gasolina = target.checked;
        this.calcularPrecioFinal(servicio);
      } else if (opcion === 'platos') {
        servicio.platos = target.checked;
        this.calcularPrecioFinal(servicio);
      }
    }
  }

  // Función para calcular el precio final con las opciones
  calcularPrecioFinal(servicio: any) {
    servicio.precioFinal = servicio.precio; // Resetear el precio a base

    // Sumar 10€ si la distancia es mayor a 30 km (gasolina)
    if (servicio.distancia > 30 && servicio.gasolina) {
      servicio.precioFinal += 10;
    }

    // Sumar 10€ si se selecciona la opción de platos
    if (servicio.platos) {
      servicio.precioFinal += 10;
    }

    // Sumar incremento si se selecciona la opción de incrementar precio
    if (servicio.precioFinal > servicio.precio) {
      servicio.precioFinal += servicio.precioIncremento;
    }
  }
}
