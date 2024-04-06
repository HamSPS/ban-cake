import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormConfig, RxwebValidators } from '@rxweb/reactive-form-validators';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  providers: [MessageService]
})
export class SignInComponent implements OnInit {
  formGroup!: UntypedFormGroup;
  submitted: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private message: MessageService,
    private util: UtilsService
  ) {
    ReactiveFormConfig.set(util.validationMessage);
  }

  get controls() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    this.message.add({severity: 'danger', summary: 'Error', detail:''})
    const rxweb = RxwebValidators;
    this.formGroup = this.fb.group({
      username: ['', rxweb.required()],
      password: ['', [rxweb.required(), rxweb.minLength({ value: 6 })]],
    });
  }

  logIn() {
    this.submitted = true;

    if (this.formGroup.invalid) return;
    this.formGroup.disable();
    const formData = this.formGroup.value;
    this.authService.signIn(formData).subscribe({
      next: (value) => {
        this.tokenService.setToken(value.accessToken);
        this.authService.getProfile();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.formGroup.enable();
        const errMessage = err.error.message;
        this.message.clear()
        this.message.add({ severity: 'error', summary: errMessage, detail: '' });
      },
    });
  }
}
