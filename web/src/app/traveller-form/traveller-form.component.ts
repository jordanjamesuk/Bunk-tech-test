import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

/**
 * TravellerFormComponent.
 */
@Component({
    selector: 'traveller-form',
    templateUrl: './traveller-form.component.html',
    styleUrls: ['./traveller-form.component.css'],
})
export class TravellerFormComponent {
    @Output() eTravellerForm = new EventEmitter<any>();

    /**
     * formSubmit - On form submit, emmit form data and reset form.
     *
     * @param {NgForm} form
     */
    formSubmit(form: NgForm) {
        if (!form.valid) return;
        this.eTravellerForm.emit(form.value);
        form.resetForm();
    }
}
