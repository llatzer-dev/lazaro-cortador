import { Injectable, WritableSignal, signal } from '@angular/core';
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
        'Enseñanza teórica y práctica para convertirte en cortador profesional de jamón.',
      precio: 80,
      caracteristicas: [
        {
          id: 21,
          labelId: 'materiales',
          label: 'Materiales de estudio',
          tipo: 'check',
          precioCoste: 0,
        },
        {
          id: 22,
          labelId: 'practica',
          label: 'Prácticas en clase',
          tipo: 'check',
          precioCoste: 0,
        },
        {
          id: 23,
          labelId: 'platoss',
          label: 'Platos Incluidos',
          tipo: 'check',
          precioCoste: 10,
        },
        {
          id: 24,
          labelId: 'clases',
          label: 'Número de clases',
          tipo: 'number',
          precioCoste: 80,
        },
        {
          id: 25,
          labelId: 'horariomanana',
          label: 'Horario 10:00-13:00',
          tipo: 'check',
          precioCoste: -0.1,
        },
        {
          id: 26,
          labelId: 'horariotarde',
          label: 'Horario 15:00-18:00',
          tipo: 'check',
          precioCoste: -0.1,
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

      if (typeof value === 'boolean') {
        // Manejo para valores booleanos
        if (value) {
          updatedServicio.precio += parseInt(precioCaracteristica.toFixed(0)); // Sumar precio si es true
        } else {
          updatedServicio.precio -= parseInt(precioCaracteristica.toFixed(0)); // Restar precio si es false
        }
      } else if (typeof value === 'number') {
        // Manejo para valores numéricos (ej. cantidad)
        updatedServicio.precio +=
          value * parseInt(precioCaracteristica.toFixed(0));
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

  getServicioPrice(id: number): number {
    const servicio = this.$servicios().find((servicio) => servicio.id === id);

    if (!servicio) {
      console.error(`Servicio con id ${id} no encontrado.`);
      return 0;
    }

    return servicio.precio;
  }

  getServicioTituloPorId(id: number): string {
    const servicio = this.$servicios().find((servicio) => servicio.id === id);

    if (!servicio) {
      console.error(`Servicio con id ${id} no encontrado.`);
      return 'Servicio no encontrado';
    }

    return servicio.nombre;
  }
}
