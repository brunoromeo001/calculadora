class CalController{

    constructor(){
        
        this._operation = [];
        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }    

    addEventListenerAll(element, events, fn){

        events.split(" ").forEach(event =>{

            element.addEventListener(event, fn, false);
        });
    }

    initialize(){

        this.setDiplayDateTime();

        setInterval(()=>{

            this.setDiplayDateTime();
        }, 1000);     
        
        this.setLastNumberToDisplay();
    }

    setError(){
        
        this.displayCalc = "Error";
    }

    setLastOperetion(value){

        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value){

        return (["+", "-", "*", "%", "/"].indexOf(value) > -1);
    }

    clearAll(){

        this._operation = [];

        this.setLastNumberToDisplay();
    }

    clearEntry(){
        
        this._operation.pop();

        this.setLastNumberToDisplay();
    }

    getLastOperetion(){

        return this._operation[this._operation.length - 1];
    }

    pushOperation(value){

        this._operation.push(value);

        if (this._operation.length > 3){

            this.calc();
        }
    }

    calc(){

        let last= "";

        if(this._operation.length > 3){

            last = this._operation.pop();
        }
        
        let result = eval(this._operation.join(""));

        if (last == '%'){
            
            result /= 100;

            this._operation = [result];
        }else{

            this._operation = [result];

            if(last) this._operation.push(last);
        }

        this.setLastNumberToDisplay();    
    }

    setLastNumberToDisplay(){

        let lastNumber;

        for(let i = this._operation.length -1; i >= 0; i--){

            if(!this.isOperator(this._operation[i])){

                lastNumber = this._operation[i];
                break;
            }
        }

        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }

    addOperation(value){
       
        if (isNaN(this.getLastOperetion())){

            if(this.isOperator(value)){

                this.setLastOperetion(value);

            } else if(isNaN(value)){

                console.log('Outra Coisa', value);

            } else{

                this.pushOperation(value);

                this.setLastNumberToDisplay();
            }

        } else{

            if (this.isOperator(value)){
                
                this.pushOperation(value);

            } else{
                
                let newValue = this.getLastOperetion().toString() + value.toString();
                this.setLastOperetion(parseInt(newValue));

                this.setLastNumberToDisplay();
            }            
        }        
        
    }

    execBtn(value){

        switch (value){

            case 'ac':                
                this.clearAll();
            break;

            case 'ce':
                this.clearEntry();
            break;

            case 'soma':
                this.addOperation("+");
            break;

            case 'subtracao':
                this.addOperation("-");
            break;

            case 'divisao':
                this.addOperation("/");
            break;
            
            case 'multiplicacao':
                this.addOperation("*");
            break;
            
            case 'porcento':
                this.addOperation("%");
            break;
            
            case 'igual':
                this.calc();
            break;

            case 'ponto':
                this.addOperation(".");
            break;

            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(value));
            break;

            default:
                this.setError();
            break;
         
        }
    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=> {
            
            this.addEventListenerAll(btn, "click drag", e=>{

                let textBtn = btn.className.baseVal.replace("btn-","");

                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mosedown", e => {

                btn.style.cursor = "pointer";
            })
        });
    }

    setDiplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
            
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }


    get displayDate(){

        return this._dateEl.innerHTML;
    }

    set displayDate(value){

        return this._dateEl.innerHTML = value;
    }

    get displayTime(){

        return this._timeEl.innerHTML;
    }
       
    set displayTime(value){

        return this._timeEl.innerHTML = value;
    }

    get displayCalc(){

        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){

        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){

        return new Date();
    }

    set currentDate(value){

        this._currentDate = value;
    }

}