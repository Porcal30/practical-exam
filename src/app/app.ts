import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
})
export class AppComponent implements AfterViewInit {

  signupForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    course: new FormControl('', [Validators.required]),
    agree: new FormControl(false, [Validators.requiredTrue]),
  });

  submittedData: any = null;

  successMessage: string = '';
  errorMessage: string = '';

  @ViewChild('myCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.font = '16px sans-serif';
    ctx.fillText('Canvas: drawn by Angular (AfterViewInit)', 12, 28);
    ctx.strokeRect(10, 10, 520, 60);

    ctx.beginPath();
    ctx.arc(460, 130, 28, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillText('Circle', 442, 170);
  }

  // Getters
  get fullName() { return this.signupForm.controls.fullName; }
  get email() { return this.signupForm.controls.email; }
  get course() { return this.signupForm.controls.course; }
  get agree() { return this.signupForm.controls.agree; }

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.signupForm.markAllAsTouched();

    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    this.submittedData = this.signupForm.value;
    this.successMessage = 'Form submitted successfully!';

    // Optional: reset form after submit
    this.signupForm.reset({
      fullName: '',
      email: '',
      course: '',
      agree: false
    });
  }
}