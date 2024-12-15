import { Component, input } from '@angular/core';
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

@Component({
  selector: 'app-servicio',
  imports: [ReactiveFormsModule],
  providers: [AutoDestroyService],
  templateUrl: './servicio.component.html',
  styleUrl: './servicio.component.css',
})
export class ServicioComponent {
  public servicio = input.required<Servicio>();

  formularios: { [key: number]: FormGroup } = {};

  constructor(
    private serviciosService: ServiciosService,
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

    this.servicio().caracteristicas.forEach((caracteristica) => {
      const key = `${this.servicio().id}-caracteristica-${
        caracteristica.labelId
      }`;

      switch (caracteristica.tipo) {
        case 'check':
          // Crear FormControl con valor inicial
          const control = this.fb.control(false); // valor inicial es false
          // Si el precio es 0, deshabilitar el control
          if (caracteristica.precio === 0) {
            control.disable(); // Deshabilitar el control
          }
          caracteristicasForm[key] = control;
          break;
        case 'normal':
          caracteristicasForm[key] = this.fb.control(
            caracteristica.precio || 0
          );
          break;
        case 'number':
          caracteristicasForm[key] = this.fb.control(0, [Validators.required]);
          break;
        default:
          break;
      }
    });

    console.log('FormGroups: ', caracteristicasForm);

    // Asignar las características al formulario de este servicio
    this.formularios[this.servicio().id] = this.fb.group({
      ...caracteristicasForm, // Incluir todas las características dinámicamente
    });
  }

  subscribeToFormChanges(): void {
    Object.keys(this.formularios).forEach((id) => {
      const form = this.formularios[parseInt(id)];

      form.valueChanges
        .pipe(startWith(form.value), pairwise(), takeUntil(this.destroy$))
        .subscribe(([prevValues, newValues]) => {
          Object.keys(newValues).forEach((controlName) => {
            if (prevValues[controlName] !== newValues[controlName]) {
              const caracteristicaLabelId = controlName.split('-')[2];

              const value = this.calculateValue(
                prevValues[controlName],
                newValues[controlName]
              );
              console.log(
                `Control ${controlName} cambió de ${prevValues[controlName]} a ${newValues[controlName]}. Enviado: ${value}`
              );
              this.serviciosService.updateServiciosPrice(
                value,
                caracteristicaLabelId
              );
            }
          });
        });
    });
  }

  // Función para calcular el valor a pasar al servicio
  private calculateValue(previousValue: any, currentValue: any): number {
    let value = currentValue;
    if (value > 1) {
      value -= previousValue;
    }
    return previousValue > value ? -1 : value;
  }

  // Método que maneja el submit
  onSubmit(id: number): void {
    const form = this.formularios[id];
    console.log('Formulario para el servicio ID:', id);
    console.log('Valores del formulario:', form.value);
  }
}
