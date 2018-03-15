import {Injectable} from '@angular/core';

@Injectable()
export class ErrorService {
    error = {
        'required': 'This field is required.',
        'emailUsed': 'Provided email already being used.',
        'emailMatch': 'Email addresses do not match.',
        'emailFormat': 'Email address isn\'t correct format.',
        'passwordMatch': 'Passwords do not match.',
        'invalidEmailOrPassword': 'You have entered invalid email or password.'
    };

    constructor() {
    }
}
