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
        this.fireruns = []
        if (Array.isArray(JSON.parse(localStorage.getItem('fireruns')))) {
            this.fireruns = JSON.parse(localStorage.getItem('fireruns'));
        }

        if (this.fireruns)
            this.fireruns = this.fireruns.sort((a ,b) => ( a.created >= b.created ) ?  -1 : 1)
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
    ngOnInit() {

        // the long way

        
        this.form = this._fb.group({
            description: new FormControl('', [<any>Validators.required, <any>Validators.minLength(20)]),
        });
    }

    add() {
        this.fireruns.push(new Firerun(this._getScopeIdentity(), this.form.value.description, 0));
        this.form.reset();
        this.save();
        this.showAdd = false;
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
