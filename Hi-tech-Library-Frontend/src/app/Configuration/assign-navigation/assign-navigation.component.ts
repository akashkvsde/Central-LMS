
import { Component, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-assign-navigation',
  templateUrl: './assign-navigation.component.html',
  styleUrls: ['./assign-navigation.component.css']
})
export class AssignNavigationComponent implements OnInit {
  constructor(private allService: AllDataService) {}
  pa: number = 1;
  p: number = 1;
  enter_by:any 
  college_id:any 
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id');
    this.enter_by=sessionStorage.getItem('user_id');
    this.fetchUserrole();
    this.fetchnavPage();
  }
  checks:boolean = false

  bulk(e: any) {
    if (e.target.checked) {
      this.selectedRows = this.geNavPage.map((row: any) => ({
        id: row.nav_page_id,
        role: this.selectedRole,
        entry_by: this.enter_by
      }));
      console.log('Master checkbox checked. All rows selected:', this.selectedRows);
    } else {
      this.selectedRows = [];
      console.log('Master checkbox unchecked. All rows deselected.');
    }
  }
  
  
//session

//session ended


  selectedRole: number = 0;
  selectedRows: { id: number; role: number; entry_by:any }[] = [];

  fetchAssignrole:any;
  onRoleChange(roleId: number) {
    console.log(roleId);
    this.selectedRole = roleId;
    this.clearPreviousRoleSelections();
    this.allService.searchAssignNav(roleId).subscribe((result)=>{
      this.fetchAssignrole = result;
      console.log(this.fetchAssignrole);
    })
  }


 
  toggleRowSelection(rowId: number) {
    const index = this.selectedRows.findIndex(
      item => item.id === rowId && item.role === this.selectedRole
    );
  
    if (index > -1) {
      this.selectedRows.splice(index, 1); // Deselect
    } else {
      if (this.selectedRole !== 0) {
        this.selectedRows.push({ id: rowId, role: this.selectedRole, entry_by: this.enter_by }); // Include 'enter_by'
      } else {
        alert('Please select role!');
        location.reload();
      }
    }
  }
  

  isSelected(rowId: number): boolean {
    return this.selectedRows.some(
      item => item.id === rowId && item.role === this.selectedRole
    );
  }

  clearPreviousRoleSelections() {
    this.selectedRows = this.selectedRows.filter(
      item => item.role === this.selectedRole
    );
  }

  //fetch role
  getuserRole: any;
    fetchUserrole() {
    this.allService.AllUserRole(this.college_id).subscribe(data => {
      this.getuserRole = data;  
    });
  }

 //fetch role
 geNavPage_data: any;
 geNavPage:any
 fetchnavPage() {
   this.allService.navPage().subscribe(data => {
     this.geNavPage_data = data;
     this.geNavPage= this.geNavPage_data
    //  console.log(this.geNavPage_data);
   });
 }


  takeArray(role: number) {
    const selectedRowsWithCurrentRole = this.selectedRows.filter(
      item => item.role === role
    );
    // console.log(selectedRowsWithCurrentRole);
   if(role != 0){
    //insert section
    this.allService.assignNav(selectedRowsWithCurrentRole).subscribe((result:any)=>{
      // console.log(result);
      
      if(result[0].res == null){
        alert("Page already Exist!! Check again")
        location.reload()
      }else{
        alert (result[0].res)
        location.reload()
      }
      
    })
    //insert section ended

   }else{
    alert("please select Role!!")
    location.reload();
   }
  }

  // /=====delete=/
  deletRole(data:any){
   console.log(this.selectedRole);
   this.allService. deleteAssignNav(data).subscribe((result)=>{  //for delete
    alert(result)

    this.allService.searchAssignNav(this.selectedRole).subscribe((getres)=>{ //for dynamic reload
      this.fetchAssignrole = getres;
      console.log(this.fetchAssignrole);
    })

   })
  }


  //remove all role
  removeAll(selectedRole:any){
  if(selectedRole == 0){
    alert("Please select role first!!")
  }else{
    const result = window.confirm("Are you sure you want to delete?");
  if (result) {
    this.allService. deleteAll_nav(selectedRole).subscribe((result)=>{  //for delete
      alert(result)
  
      this.allService.searchAssignNav(this.selectedRole).subscribe((getres)=>{ //for dynamic reload
        this.fetchAssignrole = getres;
        console.log(this.fetchAssignrole);
      })
  
     })
  } else {
    // If canceled, do something else or don't delete
    console.log('Deletion canceled');
  }
  }
  }


  //hide and sick nav
  delnav:boolean = true
  alllnav:boolean = false

  delpages(){
    this.delnav = false
    this.alllnav = true
  }
  allPages(){
    this.delnav = true
    this.alllnav = false
  }
}
