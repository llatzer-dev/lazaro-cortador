import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Servicio } from '@app/core/models/servicio.model';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  public $servicios: WritableSignal<Servicio[]> = signal([
    {
      id: 1,
      nombre: 'Corte profesional',
      descripcion:
        'Servicio integral para cortar jamón en todo tipo de eventos. Personalizado para cada ocasión.',
      precio: 100,
      precioBase: 100,
      caracteristicas: [
        {
          id: 11,
          labelId: 'platos',
          label: 'Platos Incluidos',
          tipo: 'check',
          precioCoste: 10,
        },
        {
          id: 12,
          labelId: 'decoracion',
          label: 'Decoración y montaje propio',
          tipo: 'normal',
          precioCoste: 0,
        },
        {
          id: 13,
          labelId: 'patas',
          label: 'Número de patas de jamón',
          tipo: 'number',
          precioCoste: 30,
        },
      ],
    },
    {
      id: 2,
      nombre: 'Formación Masterclass',
      descripcion:
        'Enseñanza teórica y práctica para convertirte en cortador profesional de jamón, aprendiendo técnicas y conocimientos esenciales.',
      precio: 80,
      precioBase: 80,
      incluyePlatos: false,
      caracteristicas: [
        {
          id: 21,
          labelId: 'cosa',
          label: 'Alguna cosa',
          tipo: 'check',
          precioCoste: 0,
        },
        {
          id: 22,
          labelId: 'platoss',
          label: 'Platos Incluidos',
          tipo: 'check',
          precioCoste: 10,
        },
        {
          id: 23,
          labelId: 'patass',
          label: 'Número de patas de jamón',
          tipo: 'number',
          precioCoste: 30,
        },
      ],
    },
  ]);

  constructor() {}

  getServicios(): WritableSignal<Servicio[]> {
    return this.$servicios;
  }

  updateServiciosPrice(value: any, caracteristicaLabelId: string): void {
    const updatedServicios = this.$servicios().flatMap((servicio) => {
      // Buscar si el servicio tiene la característica con el ID proporcionado
      const caracteristica = servicio.caracteristicas.find(
        (car) => car.labelId === caracteristicaLabelId
      );

      if (!caracteristica) {
        return servicio; // Si no hay característica, regresar el servicio sin cambios
      }

      const precioCaracteristica = caracteristica.precioCoste || 0;

      // Clonar el servicio para no modificar directamente el original
      const updatedServicio = { ...servicio };

      // Usar el precio base dinámico
      const { precioBase } = updatedServicio;

      if (typeof value === 'boolean') {
        // Manejo para valores booleanos
        if (value) {
          updatedServicio.precio += precioCaracteristica; // Sumar precio si es true
        } else {
          updatedServicio.precio -= precioCaracteristica; // Restar precio si es false
        }
      } else if (typeof value === 'number') {
        // Manejo para valores numéricos (ej. cantidad)
        updatedServicio.precio = precioBase + value * precioCaracteristica;
      }

      // Asegurarnos de no permitir precios negativos
      if (updatedServicio.precio < 0) {
        updatedServicio.precio = 0;
      }

      return updatedServicio;
    });

    // Actualizar el signal con los valores modificados
    this.$servicios.set([...updatedServicios]);
  }
}
