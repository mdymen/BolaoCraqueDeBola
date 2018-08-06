import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Global } from "../config/global.service";


@Injectable()
export class RodadaService {

    url;

    constructor(private _http:HttpClient) {
        this.url = Global.BACKEND;
    }

    /**
     * Salva la rodada
     * 
     * @param champ
     * @param rodada
     * @param suma
     */
    public post(champ, rodada, suma) {
        return this._http.post(`${this.url}/rodada/post`, {champ:champ, rodada:rodada, suma:suma});
    }

}