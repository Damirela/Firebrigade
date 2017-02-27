/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Firerun } from "../models/firerun.model";
import { Observable } from 'rxjs/Rx';
import 'rxjs';

declare var restdb: any
@Component({
    styleUrls: ['./fireruns.component.scss'],
    templateUrl: './fireruns.component.html'
})
@Injectable()
export class FirerunsComponent {
    public fireruns: Firerun[] = []
    public form: FormGroup;
    public showAdd: false;
    public db: any
    private _baseUrl = 'https://firebrigade-0d50.restdb.io/rest/fireruns?apikey=58aed4881336925a2571b19e'
    private _currentSortField = 'created'

    constructor(private _fb: FormBuilder, private http: Http) {
    }

    private _loadFireruns() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let baseUrl = 'https://firebrigade-0d50.restdb.io/rest/fireruns?apikey=58aed4881336925a2571b19e'

        return this.http.get(baseUrl, headers).map(res => <Firerun[]>res.json()).subscribe(values => this.fireruns = values).add(() => this.sort(this._currentSortField));
    }
    private _getScopeIdentity() {
        let currentMaxId = 0;
        this.fireruns.forEach(e => {
            if (e.id > currentMaxId) {
                currentMaxId = e.id
            }
        })
        return currentMaxId;
    }
    reset() {
        localStorage.clear();
        this.fireruns = [];
    }

    showFireruns() {
        return this.fireruns && this.fireruns.length > 0
    }

    sort(field: string) {
        if (field != this._currentSortField) {
            this.fireruns.sort((a, b) => a[field] > b[field] ? -1 : 1)
            this._currentSortField = field
        }

        if (this._currentSortField == field) {
            this.fireruns.reverse()
        }
    }

    ngOnInit() {
        this._loadFireruns()

        this.form = this._fb.group({
            description: new FormControl('', [<any>Validators.required, <any>Validators.minLength(20)]),
        });

        /* realtime connection doest not work :-(
        this.db = new restdb('58aed4881336925a2571b19e', { realtime: true });
        console.log(this.db.fireruns)

        console.log('Api Attached')


        this.db.fireruns.on("POST", (error, eventdata) => { console.log('POST') })
        this.db.fireruns.on("PUT", (error, eventdata) => { console.log('PUT') })


        this.db.fireruns.on('POST', function (err, mess) {
            console.log('event hit!')
        });
        */

    }

    add() {
        console.log('add Function!')

        let firerun = new Firerun(this._getScopeIdentity() + 1, this.form.value.description)

        return this.http
            .post(this._baseUrl, firerun)
            .map((res) => {
                this.form.reset();
                this.showAdd = false;
                return res.json()
            }).catch((error: any) => Observable.throw(error.json().error || 'Server error')).subscribe().add(() => this._loadFireruns())
    }

    save(firerun) {
        let baseUrl = 'https://firebrigade-0d50.restdb.io/rest/fireruns/' + firerun._id + '?apikey=58aed4881336925a2571b19e'
        this.form.reset();
        this.showAdd = false;

        return this.http
            .put(baseUrl, firerun)
            .map((res) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')).subscribe().add(() => this._loadFireruns())
    }

    addParticipant(id) {
        let firerun = this.fireruns.find(e => e.id == id)
        firerun.participators++;
        return this.save(firerun)
    }
    removeParticipant(id) {
        let firerun = this.fireruns.find(e => e.id == id)

        if (firerun.participators > 0)
            firerun.participators--;

        return this.save(firerun)
    }
}
