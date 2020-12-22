import { HttpHeaders } from "@angular/common/http";

const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + `${localStorage.getItem('token')}`      
});

export const options = {headers: headers};