import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule, TranslateModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  formData = {
    name: '', email: '', phone: '', website: '', message: ''
  };
  submitStatus: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  sendEmail() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      alert('Please fill in Name, Email and Message.');
      return;
    }
    this.submitStatus = 'sending';
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      from_name: this.formData.name,
      from_email: this.formData.email,
      phone: this.formData.phone,
      website: this.formData.website,
      message: this.formData.message,
      to_email: 'infomagaro@gmail.com'
    }, 'YOUR_PUBLIC_KEY')
    .then(() => {
      this.submitStatus = 'success';
      this.formData = { name: '', email: '', phone: '', website: '', message: '' };
    })
    .catch(() => { this.submitStatus = 'error'; });
  }
}