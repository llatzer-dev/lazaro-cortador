export interface Caracteristica {
  id: number;
  labelId: string;
  label: string;
  tipo: string;
  precioCoste: number;
}

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  precioBase: number;
  caracteristicas: Caracteristica[];
}
