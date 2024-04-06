import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilsService {
    validationMessage!: any;
    constructor() {
        this.validationMessage = {
            internationalization: {
                dateFormat: 'dmy',
                seperator: '/',
            },
            validationMessage: {
                alpha: 'ອະນຸຍາດສະເພາະຕົວອັກສອນອັງກິດເທົ່ານັ້ນ',
                alphaNumeric:
                    'ອະນຸຍາດສະເພາະຕົວເລກ ແລະ ຕົວອັກສອນອັງກິດເທົ່ານັ້ນ',
                numeric: 'ຕົວເລກເທົ່ານັ້ນ',
                compare: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຕົງກັນ',
                contains: 'value is not contains in the input',
                creditcard: 'creditcard number is not correct',
                digit: 'ຕົວເລກເທົ່ານັ້ນ',
                email: 'This field should be email.',
                greaterThanEqualTo: 'ບໍ່ສາມາດໜ້ອຍກວ່າ',
                greaterThan: 'please enter greater than to the joining age',
                hexColor: 'please enter hex code',
                json: 'please enter valid json',
                lessThanEqualTo: 'ບໍ່ສາມາດຫຼາຍກວ່າ',
                lessThan:
                    'please enter less than or equal to the current experience',
                lowerCase: 'Only lowercase is allowed',
                minLength: 'ກະລຸນາປ້ອຍຢ່າງໜ້ອຍ {{1}} ຕົວອັກສອນ.',
                maxLength: 'ຄວາມຍາວຕ້ອງບໍ່ເກີນ {{1}} ຕົວອັກສອນ',
                maxNumber: 'enter value less than equal to 3',
                minNumber: 'enter value greater than equal to 1',
                password: 'please enter valid password',
                pattern: 'please enter valid zipcode',
                range: 'please enter age between 18 to 60',
                required: 'ບໍ່ສາມາດຫວ່າງໄດ້.',
                time: 'Only time format is allowed',
                upperCase: 'ຕົວອັກສອນອັງກິດຕ້ອງເປັນຕົວພິມໃຫຍ່',
                url: 'Only url format is allowed',
                zipCode: 'enter valid zip code',
            },
        };
    }
}
