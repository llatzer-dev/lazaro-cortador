import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailData } from '@app/core/models/email.model';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmail(emailData: EmailData): Observable<any> {
    console.log('Contenido email', emailData);

    // Construir el payload para la petición
    const payload = {
      service_id: environment.SERVICE_ID,
      template_id: environment.TEMPLATE_ID,
      template_params: emailData,
      user_id: environment.PUBLIC_KEY,
    };

    // Realizar la petición POST
    // TODO tipar la respuesta
    return this.http.post(environment.EMAILJS_API, payload, {
      responseType: 'text',
    });
  }
}
