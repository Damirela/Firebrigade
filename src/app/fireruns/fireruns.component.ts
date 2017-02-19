/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';


export class Firerun {
    constructor(
        public id: number,
        public description: string,
        public participators: number = 0,
        public created: Date = undefined
    ) {
        if (created === undefined) {
            this.created = new Date();
        }
    }
}

@Component({
    styleUrls: ['./fireruns.component.scss'],
    templateUrl: './fireruns.component.html'
})
export class FirerunsComponent {
    public fireruns: Array<Firerun> = []
    public form: FormGroup;
    public showAdd: false;

    constructor(private _fb: FormBuilder) {
        if (localStorage.getItem('fireruns') !== undefined) {
            this.fireruns = JSON.parse(localStorage.getItem('fireruns'));
        }
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
    ngOnInit() {

        // the long way

        
        this.form = this._fb.group({
            description: new FormControl('', [<any>Validators.required, <any>Validators.minLength(20)]),
        });
    }
    addFirerun() {
        this.fireruns.push(new Firerun(this._getScopeIdentity(), this.form.value.description, 0));
        this.form.reset();
        this.showAdd = false;
        this.save();
    }

    save() {
        localStorage.setItem('fireruns', JSON.stringify(this.fireruns))
    }

    addParticipant(id) {
        this.fireruns.find(e => e.id = id).participators++;
        this.save();
    }
    removeParticipant(id) {
        this.fireruns.find(e => e.id = id).participators--;
        this.save();
    }
}
