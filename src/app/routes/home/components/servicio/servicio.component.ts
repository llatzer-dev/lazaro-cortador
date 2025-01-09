import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Servicio } from '@app/core/models/servicio.model';
import { ServiciosService } from '../../services/servicios.service';
import { AutoDestroyService } from '@app/core/services/utils/auto-destroy.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, pairwise, startWith, takeUntil } from 'rxjs';
import { EmailService } from '../../services/email.service';
import { EmailData } from '@app/core/models/email.model';

@Component({
  selector: 'app-servicio',
  imports: [ReactiveFormsModule],
  providers: [AutoDestroyService],
  templateUrl: './servicio.component.html',
  styleUrl: './servicio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicioComponent {
  public servicio = input.required<Servicio>();

  formularios: { [key: number]: FormGroup } = {};

  constructor(
    private serviciosService: ServiciosService,
    private emailService: EmailService,
    private readonly destroy$: AutoDestroyService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.subscribeToFormChanges();
  }

  initForms(): void {
    // Definir caracteristicasForm con tipo dinámico
    const caracteristicasForm: { [key: string]: any } = {};
    const servicioId = this.servicio().id;

    this.servicio().caracteristicas.forEach((caracteristica) => {
      const key = `${servicioId}-caracteristica-${caracteristica.labelId}`;

      switch (caracteristica.tipo) {
        case 'check':
          // Crear FormControl con valor inicial
          const control = this.fb.control(false); // valor inicial es false
          // Si el precio es 0, deshabilitar el control
          if (caracteristica.precioCoste === 0) {
            control.disable(); // Deshabilitar el control
          }
          caracteristicasForm[key] = control;
          break;
        case 'normal':
          caracteristicasForm[key] = this.fb.control(
            caracteristica.precioCoste || 0
          );
          break;
        case 'number':
          caracteristicasForm[key] = this.fb.control(0, [
            Validators.min(0),
            Validators.required,
          ]);
          break;
        default:
          break;
      }
    });

    // Añadir FormControls específicos para 1-email y 2-email
    caracteristicasForm[`${servicioId}-email`] = this.fb.control('', [
      Validators.required,
      Validators.email,
    ]);

    // console.log('FormGroups: ', caracteristicasForm);

    // Asignar las características al formulario de este servicio
    this.formularios[servicioId] = this.fb.group({
      ...caracteristicasForm, // Incluir todas las características dinámicamente
    });
  }

  subscribeToFormChanges(): void {
    Object.keys(this.formularios).forEach((id) => {
      const form = this.formularios[parseInt(id)];

      form.valueChanges
        .pipe(
          startWith(form.value), // Inicializa con el estado actual del formulario
          pairwise(), // Compara el estado inicial con el primer cambio
          takeUntil(this.destroy$)
        )
        .subscribe(([prevValues, newValues]) => {
          Object.keys(newValues).forEach((controlName) => {
            // Ignorar si el controlName es '1-email' o '2-email'
            if (controlName === '1-email' || controlName === '2-email') {
              return; // No hacer nada si es uno de esos casos
            }

            if (prevValues[controlName] !== newValues[controlName]) {
              const partes = controlName.split('-'); // Dividir para obtener IDs
              const caracteristicaLabelId = partes[2];

              // console.log(
              //   `El control ${controlName} cambió de ${prevValues[controlName]} a ${newValues[controlName]}`
              // );

              // Calculamos la diferencia y actualizamos el precio
              const difference =
                newValues[controlName] - prevValues[controlName];
              if (difference !== 0) {
                // console.log('Diferencia: ', difference);
                this.serviciosService.updateServiciosPrice(
                  difference,
                  caracteristicaLabelId
                );
              }
            }
          });
        });
    });
  }

  // Método que maneja el submit
  onSubmit(id: number): void {
    const form = this.formularios[id];
    // console.log('Formulario para el servicio ID:', id);
    // console.log('Valores del formulario:', form.value);

    this.sendEmail(id);

    window.open('https://forms.gle/BC9VZYZGhRZEoGxw7', '_blank');
  }

  sendEmail(id: number): void {
    const form = this.formularios[id];
    if (!form) {
      console.error(`Formulario con id ${id} no encontrado.`);
      return;
    }

    const emailData = this.transformarDatosEmail(form.value, id);

    // console.log('Datos transformados', emailData);

    this.emailService
      .sendEmail(emailData)
      .pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          // console.log('Email enviado con éxito:', response);
        },
        error: (error) => {
          console.error('Error al enviar el email:', error);
        },
      });
  }

  transformarDatosEmail(formData: any, id: number): EmailData {
    let email = '';
    const caracteristicas: string[] = [];

    // Extraer email y características
    Object.keys(formData).forEach((key) => {
      if (key === `${id}-email`) {
        email = formData[key];
      } else if (key.includes('caracteristica')) {
        const label = key.split('-').pop(); // Extraer el nombre de la característica
        const valor = formData[key];

        // Determinar si es un booleano, número, o 0 específico
        let valorLegible = '';
        if (typeof valor === 'boolean') {
          valorLegible = valor ? 'Sí' : 'No';
        } else if (typeof valor === 'number') {
          // Manejar casos especiales como "0" siendo "Sí" para ciertas características
          if (label?.toLowerCase() === 'decoracion' && valor === 0) {
            valorLegible = 'Sí';
          } else if (valor > 0) {
            valorLegible = `${valor} unidades`;
          } else {
            valorLegible = 'No';
          }
        }

        // Agregar al array de características en formato "Label: Valor"
        caracteristicas.push(`${this.formatLabel(label!)}: ${valorLegible}`);
      }
    });

    const nombreServicio = this.serviciosService.getServicioTituloPorId(id);

    const precioTotal = this.serviciosService.getServicioPrice(id);

    return {
      servicio: nombreServicio,
      email: email,
      precio: precioTotal,
      caracteristicas: caracteristicas.join(', '), // Convertir el array a un string legible
    };
  }

  // Función auxiliar para formatear nombres de características
  private formatLabel(label: string): string {
    return label
      .replace(/([A-Z])/g, ' $1') // Insertar espacio antes de mayúsculas
      .replace(/-/g, ' ') // Reemplazar guiones por espacios
      .trim()
      .replace(/^./, (str) => str.toUpperCase()); // Capitalizar la primera letra
  }
}
