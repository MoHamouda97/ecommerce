import { HttpHeaders } from "@angular/common/http";

export function setHeaders(lang) {
    const headers = new HttpHeaders({
        'lang': lang     
    });

    return headers
}