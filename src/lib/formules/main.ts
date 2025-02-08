import './style.css'
import Generator from './generator'
import DynamicNumber from './dynamic-number'
import Digit from './digit'
import { FormInfo } from './types'


function getFormInfo(): FormInfo {
    const form = document.querySelector('form')!;
    const formData = new FormData(form);
    const formObject: FormInfo = {
        formule: "simple-add-sub",
        digitCount: 3,
        numberCount: 10,
    };
    formData.forEach((value, key) => {
        formObject[key] = value.toString();
    });
    formObject.digitCount = +formObject.digitCount;
    formObject.numberCount = +formObject.numberCount;
    return formObject;
}


const form = document.querySelector('form')!;
form.addEventListener('submit', onSubmit);

function onSubmit(event: Event) {
    event.preventDefault();
    const reportElement = document.querySelector('.report')!
    reportElement.textContent = ''
    const formInfo = getFormInfo();
    const generator = new Generator()
    let result: (number | string)[] = []
    if (formInfo.formule === 'simple-add-sub') {
        result = generator.generateSimpleAdd({digitCount: formInfo.digitCount, numberCount: formInfo.numberCount, mixedCount: !!formInfo.digitCountMixed})
    } else if (formInfo.formule === '5-add') {
        result = generator.generate5BasedAdd({digitCount: formInfo.digitCount, numberCount: formInfo.numberCount, mixedCount: !!formInfo.digitCountMixed})
    } else if (formInfo.formule === '5-add-sub') {
        result = generator.generate5BasedAddSubtract({digitCount: formInfo.digitCount, numberCount: formInfo.numberCount, mixedCount: !!formInfo.digitCountMixed})
    } else if (formInfo.formule === '10-add') {
        result = generator.generate10BasedAdd({digitCount: formInfo.digitCount, numberCount: formInfo.numberCount, mixedCount: !!formInfo.digitCountMixed})
    } else if (formInfo.formule === '10-add-sub') {
        result = generator.generate10BasedAddSubtract({digitCount: formInfo.digitCount, numberCount: formInfo.numberCount, mixedCount: !!formInfo.digitCountMixed})
    } else if (formInfo.formule === '5k-add') {
        result = generator.generate5KBasedAdd({digitCount: formInfo.digitCount, numberCount: formInfo.numberCount, mixedCount: !!formInfo.digitCountMixed})
    } else if (formInfo.formule === '5k-add-sub') {
        result = generator.generate5KBasedAddSubtract({digitCount: formInfo.digitCount, numberCount: formInfo.numberCount, mixedCount: !!formInfo.digitCountMixed})
    } else if (formInfo.formule === 'mixed-add-sub') {
        result = generator.generateMixedBasedAddSubtract({digitCount: formInfo.digitCount, numberCount: formInfo.numberCount, mixedCount: !!formInfo.digitCountMixed})
    }
    const questionElement = document.querySelector('.question')!
    questionElement.textContent = result.join(' ') || '...'
}

