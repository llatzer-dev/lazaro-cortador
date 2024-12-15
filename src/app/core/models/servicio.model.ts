export interface Caracteristica {
  id: number;
  labelId: string;
  label: string;
  tipo: string;
  precio: number;
}

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  incluyePlatos: boolean;
  caracteristicas: Caracteristica[];
}
