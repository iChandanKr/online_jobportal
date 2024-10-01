import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployerSignupService } from '../../services/employer-signup.service';


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
  maxStep = 3;

  constructor(private formBuilder: FormBuilder,private employerSignupService:EmployerSignupService) {
    this.employerSignup = this.formBuilder.group({
      employerDetails: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        contact: ['', Validators.required],
        dob: ['', Validators.required],
        city: ['', Validators.required],
        pinCode: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        department: ['', Validators.required],
        designation: ['', Validators.required]
      }),

      addressDetails: this.formBuilder.group({
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        companyCity: ['', Validators.required],
        companyState: ['', Validators.required],
        companyPincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        companyCountry: ['', Validators.required]
      }),

      companyDetails: this.formBuilder.group({
       
        companyName: ['', Validators.required],
        totalEmployees: ['', Validators.required],
        foundedDate: ['', Validators.required],
        companyIndustry: ['', Validators.required],
        companyEmail: ['', [Validators.required, Validators.email]],
        companyContact: ['', Validators.required],
        branchName:['',Validators.required]
      }),

      // branchDetails: this.formBuilder.group({
      //   branchName: ['', Validators.required]
      // })
    });
  }

  ngOnInit() {
    this.loadFormData();
  }



  loadFormData() {

    const storedEmployerDetails = localStorage.getItem('employerDetails');
    const storedAddressDetails = localStorage.getItem('addressDetails');
    const storedCompanyDetails = localStorage.getItem('companyDetails');
    

    if (storedEmployerDetails) {
      this.employerSignup.get('employerDetails')?.setValue(JSON.parse(storedEmployerDetails));
    }
    if (storedAddressDetails) {
      this.employerSignup.get('addressDetails')?.setValue(JSON.parse(storedAddressDetails));
    }
    if (storedCompanyDetails) {
      this.employerSignup.get('companyDetails')?.setValue(JSON.parse(storedCompanyDetails));
    }
    
  }



  onSubmit() {
    
    if (this.employerSignup.valid) {
      // console.log(this.employerSignup.value);
      const combinedDetails={
        ...this.employerSignup.get('employerDetails')?.value,
        ...this.employerSignup.get('addressDetails')?.value,
        ...this.employerSignup.get('companyDetails')?.value
        
      }
      // console.log(combinedDetails);
      this.employerSignupService.signupEmployer(combinedDetails).subscribe({
        next:(data)=>{
          console.log(data);
          
        },
        error:(er)=>{
          console.log(er);
          
        }
      })
      
      localStorage.removeItem('employerDetails');
      localStorage.removeItem('addressDetails');
      localStorage.removeItem('companyDetails');
      // this.employerSignup.reset()

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

    const employerDetails = this.employerSignup.get('employerDetails')?.value;
    const addressDetails = this.employerSignup.get('addressDetails')?.value;
    const companyDetails = this.employerSignup.get('companyDetails')?.value;
    

    localStorage.setItem('employerDetails', JSON.stringify(employerDetails));
    localStorage.setItem('addressDetails', JSON.stringify(addressDetails));
    localStorage.setItem('companyDetails', JSON.stringify(companyDetails));
  
  }
}

