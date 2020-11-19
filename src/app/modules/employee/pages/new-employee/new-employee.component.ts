import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateEmployee } from 'src/app/store/actions/employee.action';
import { AppStateTypes } from 'src/app/store/types/root.types';
import { AddEmployeeTemp } from '../../employee.model';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private store$: Store<AppStateTypes>,
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
  }


  submit(_) {
    if (this.forms.valid) {
      this.isSubmitted = true;

      const employeeNewTemp = new AddEmployeeTemp();
      employeeNewTemp.nip = this.forms.get('nip').value ,
      employeeNewTemp.full_name = this.forms.get('full_name').value,
      employeeNewTemp.nick_name = this.forms.get('nick_name').value,
      employeeNewTemp.birth_date = this.forms.get('birth_date').value,
      employeeNewTemp.address = this.forms.get('address').value,
      employeeNewTemp.phone = this.forms.get('phone').value,
      employeeNewTemp.mobile = this.forms.get('mobile').value,
      employeeNewTemp.email = this.forms.get('email').value;

      console.log(employeeNewTemp);
      console.log(this.forms.value);

      this.store$.dispatch(new CreateEmployee({
        body: employeeNewTemp
      }));
    }
  }
}
