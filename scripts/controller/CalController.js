class CalController{

    constructor(){

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
    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=> {
            
            this.addEventListenerAll(btn, "click drag", e=>{

                console.log(btn.className.baseVal.replace("btn-",""));
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