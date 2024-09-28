import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employer-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employer-signup.component.html',
  styleUrls: ['./employer-signup.component.css']
})
export class EmployerSignupComponent implements OnInit {
  employerSignup: FormGroup;
  currentStep = 0;
  maxStep = 4;

  constructor(private formBuilder: FormBuilder) {
    this.employerSignup = this.formBuilder.group({
      employerDetails: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        contact: ['', Validators.required],
        department: ['', Validators.required],
        designation: ['', Validators.required]
      }),

      addressDetails: this.formBuilder.group({
        line1: ['', Validators.required],
        line2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        country: ['', Validators.required]
      }),

      companyDetails: this.formBuilder.group({
        companyName: ['', Validators.required],
        companyIndustry: ['', Validators.required],
        companyEmail: ['', [Validators.required, Validators.email]],
        companyContact: ['', Validators.required],
      }),

      branchDetails: this.formBuilder.group({
        branchName: ['', Validators.required]
      })
    });
  }

  ngOnInit() {
    this.loadFormData();
  }

  isBrowser() {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  loadFormData() {
    if (this.isBrowser()) {
      const storedEmployerDetails = localStorage.getItem('employerDetails');
      const storedAddressDetails = localStorage.getItem('addressDetails');
      const storedCompanyDetails = localStorage.getItem('companyDetails');
      const storedBranchDetails = localStorage.getItem('branchDetails');

      if (storedEmployerDetails) {
        this.employerSignup.get('employerDetails')?.setValue(JSON.parse(storedEmployerDetails));
      }
      if (storedAddressDetails) {
        this.employerSignup.get('addressDetails')?.setValue(JSON.parse(storedAddressDetails));
      }
      if (storedCompanyDetails) {
        this.employerSignup.get('companyDetails')?.setValue(JSON.parse(storedCompanyDetails));
      }
      if (storedBranchDetails) {
        this.employerSignup.get('branchDetails')?.setValue(JSON.parse(storedBranchDetails));
      }
    }
  }

  onSubmit() {
    if (this.employerSignup.valid) {
      console.log(this.employerSignup.value);
      if (this.isBrowser()) {
        // Clear all stored data upon successful submission
        localStorage.removeItem('employerDetails');
        localStorage.removeItem('addressDetails');
        localStorage.removeItem('companyDetails');
        localStorage.removeItem('branchDetails');
      }
    }
  }

  nextStep() {
    this.saveFormData();
    if (this.currentStep < this.maxStep - 1) {
      this.currentStep++;
    } else {
      this.onSubmit();
    }
  }

  previousStep() {
    this.saveFormData();
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  saveFormData() {
    if (this.isBrowser()) {
      const employerDetails = this.employerSignup.get('employerDetails')?.value;
      const addressDetails = this.employerSignup.get('addressDetails')?.value;
      const companyDetails = this.employerSignup.get('companyDetails')?.value;
      const branchDetails = this.employerSignup.get('branchDetails')?.value;

      localStorage.setItem('employerDetails', JSON.stringify(employerDetails));
      localStorage.setItem('addressDetails', JSON.stringify(addressDetails));
      localStorage.setItem('companyDetails', JSON.stringify(companyDetails));
      localStorage.setItem('branchDetails', JSON.stringify(branchDetails));

      console.log(this.employerSignup);
      
    }
  }
}
