import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Servicio } from '@app/core/models/servicio.model';
import { catchError, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  public $servicios: WritableSignal<Servicio[]> = signal([]);

  constructor(private http: HttpClient) {}

  getServicios(): WritableSignal<Servicio[]> {
    // Realiza la llamada HTTP y toma solo un valor
    this.http
      .get<Servicio[]>('/json/servicios.json')
      .pipe(
        take(1), // Toma solo un valor y se desuscribe automáticamente
        tap((data) => {
          this.$servicios.set(data); // Actualiza el signal con los datos recibidos
        }),
        catchError((error) => {
          console.error('Error al cargar los servicios:', error);
          return of([]); // Devuelve un array vacío como fallback en caso de error
        })
      )
      .subscribe(); // Aquí se hace la suscripción que automáticamente se desuscribe después de tomar 1 valor

    return this.$servicios; // Devuelve el signal que ahora contiene los datos cargados
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
