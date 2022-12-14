import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employeeDetails : Employee = {
    id: "",
    name: "",
    email: "",
    phone: "",
    salary:"",
    department:""
  }

  constructor(private route: ActivatedRoute, private employeesService: EmployeesService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next : (params) =>{
        const id =  params.get('id');

        //lets check if id is undefined
        if(id){
          //call api
          this.employeesService.getEmployee(id)
          .subscribe({
              next: (response) => {
                this.employeeDetails = response;
                //console.log(this.employeeDetails);
              }
            });
        }
        
      }
    })
   
  }

  updateEmployee (){
    console.log("trying");
    console.log(this.employeeDetails);
    this.employeesService.updateEmployee(this.employeeDetails.id, this.employeeDetails)
    .subscribe({
      next: (response) => {
        this.router.navigate(['employees']);
      }
    })
  }

  

}
