import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadEmployeeByIdSuccess } from 'src/app/store/actions/employee.action';
import { AppStateTypes } from 'src/app/store/types/root.types';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private store$: Store<AppStateTypes>,
    private activeRoute: ActivatedRoute,
  ) { 
    this.forms = this.formBuilder.group({
      nip: '',
      full_name: '',
      nick_name: '',
      birth_date: '',
      address: '',
      phone: '',
      mobile: '',
      email: ''
    });
  }

  forms: FormGroup;
  isSubmitted = false;

  ngOnInit(): void {
    if (this.activeRoute.data && this.activeRoute.data !== undefined) {
      this.activeRoute.data.subscribe(data => {
        const formData = data.detailEmployee;
        this.forms.setValue({
          nip: formData.nip,
          full_name: formData.full_name,
          nick_name: formData.nick_name,
          birth_date: formData.birth_date, // Need to parse
          address: formData.address,
          phone: formData.phone,
          mobile: formData.mobile,
          email: formData.email
        });
      });

    }

    this.activeRoute.params.subscribe((value) => {
      this.store$.dispatch(new LoadEmployeeByIdSuccess({
        data: null,
        payloadId: value.id
      }));
    });
  }

  submit(_) {
  }
}
