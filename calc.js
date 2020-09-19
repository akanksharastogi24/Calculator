class Model {
    constructor() {
        this.buttons=[];
    } 
    appendButton(button) {
        this.buttons.push(button);
    }
    allButtons(){
        return this.buttons;
    }
  }
  
  class View {
    constructor() {}

    addOutputEventListener(){
        // adding  keydown event in input
        var output = document.getElementById("output");
        output.addEventListener(onkeydown, (event) => {
            if(event.key == "="){
                this.placeholder=eval(this.value);
                this.value="";
            }
        });
    }

    createButton(text, val, type){
        var output = document.getElementById("output");    
        var button = document.createElement("button");

		button.setAttribute("value", val);
		button.textContent = text;
        button.className = "btn";
        
		if (type === "operator") {
            button.className += " operator";          
        }

        if (text === "="){
            button.onclick = function() {               
                output.onkeydown();
            }           
        }

        else if (text === "C"){
            button.onclick = function() {                       
                output.value = "";
            }
        }   
        
        else{		
		    button.onclick = function() {
			    document.getElementById("output").value += this.value;
            }
        }   	

		return button;
    }

    renderButtons(controller){
        var buttonsList = controller.getButtons();

		for (var i = 0; i < buttonsList.length; i++) {
			if (buttonsList[i].className == "btn operator") 
				document.getElementById("operators").append(buttonsList[i]);
			else
				document.getElementById("digits").append(buttonsList[i]);

		}
    }
    
  }
  
  class Controller {
    constructor(model, view) {
      this.model = model;
      this.view = view;
    
      this.view.addOutputEventListener();
      this.generateButtons();
    }

    generateButtons(){
        //Generating buttons
        for( var i = 0; i < 10; i++) {
			var button = this.view.createButton(i, i);
			this.model.appendButton(button);
		}
        button = this.view.createButton("C", "C" ,"operator");
		this.model.appendButton(button);
		button = this.view.createButton("+", "+", "operator");
		this.model.appendButton(button);
		button = this.view.createButton("-", "-", "operator");
		this.model.appendButton(button);
		button = this.view.createButton("*", "*", "operator");
		this.model.appendButton(button);
		button = this.view.createButton("/", "/", "operator");
		this.model.appendButton(button);

		button = this.view.createButton("=", "=", "operator");
		button.id = "evaluate";		
        this.model.appendButton(button);

        //render buttons
        this.view.renderButtons(this);
    }

    getButtons(){
        return this.model.allButtons();
    }
  }
  
  new Controller(new Model(), new View());