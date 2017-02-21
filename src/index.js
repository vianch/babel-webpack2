class Validations {

    constructor() {
        console.log("Validations ready");
    }

    isDecimal(number) {
        return !(/\D/.test(number));
    }

    isFloat(number) {
        return (isFinite(number) && number !== '' && /^-?[0-9]*[.][0-9]+$/.test(number));
    }

    onDecimalInput(event) {
        let key = String.fromCharCode( event.keyCode || event.which );
        if( !this.isDecimal(key) ) {
            event.returnValue = false;
            if(event.preventDefault) {
                event.preventDefault();
            }
        }
    }

    onFloatInput(event) {
        let key = String.fromCharCode( event.keyCode || event.which );
        if( !/[\d\.]/g.test(key) ) {
            event.returnValue = false;
            if(event.preventDefault) {
                event.preventDefault();
            }
        }
    }

}
const validation = new Validations();

document.addEventListener("DOMContentLoaded", (event) =>{
    let decimalElement = document.getElementById("decimal");
    let floatElement = document.getElementById("float");

    decimalElement.addEventListener("keypress", ((event) => {
        return validation.onDecimalInput(event);
    }));

    floatElement.addEventListener("keypress", ((event) => {
        return validation.onFloatInput(event);
    }));
});

