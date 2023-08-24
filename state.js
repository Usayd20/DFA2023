// //costume variable for canvas
// var canv = document.querySelector('canvas');
// //ctx holds a refernece to canvas element
// var ctx = canv.getContext('2d');

//@return the inputs from the user
function getInput(){
    let firstString, secondString;
    do{
        firstString = prompt('Please enter the first string');  
        secondString = prompt ('Please enter the second string');

        //show an error if not same length
        if(firstString.length != secondString.length){
            alert('Both inputs should have the same lentgh, please enter a valid set of strings');
        }
    } while (firstString.length != secondString.length);
    //need to connect these user inputs to state.js
    return [firstString, secondString];
}

//need to make const for the canvas class
class state 
{
    constructor(first, second) 
    {
        //transition on input 0
        this.first = first;
        //transition on input 1
        this.second = second;
    }
}

//Then we can use an array of state to represent DFA
class DFA
{
    constructor()
    {
        //How many states in the DFA
        this.size = 0;
        //Define where do we start
        this.initial_state = 0;
        //Transition table, every 2 elements represent transitions on input 0 and 1 respectively
        this.transition = [];
    }
    //Set the initial state 
    //not sure how necessary it is 
    set_initial(index)
    {
        this.initial_state = index;
    }   
    

    //Adding states to the DFA 
    add_state(state)
    {
        this.transition.push(state);
        //increment the size of the new DFA
        this.size++;
    }
    
    //Builds the DFA according to the string and transition function
    //@return the last state that the string ends at
    run_input(str)
    {
        let current = this.initial_state;

        for(var i = 0; i < str.length; i++)
        {
            if(str[i] == "0")
            {
                current = this.transition[current].first;
                //add transition and a 0 over it, call makeArrow
            }
            else
            {
                current = this.transition[current].second;
                //add transition and a 1 over it, call makeArrow

            }
        }

        return current;
    }
}

class num
{
    constructor(base)
    {
        //Base is the number of states in the DFA, (equals to size?)
        this.base = base;
        //number represents the transition table 
        this.number = [];
        //Initialize the DFA to go to 0 on every input 
        for(var i = 0; i < this.base * 2; i++)
        {
            this.number.push(0);
        }
    }

    
    next()
    {
        var carry = 1;
        var i = 0;
        while(carry != 0)
        {
            this.number[i] = this.number[i] + 1;
            if (this.number[i] >= this.base)
            {
                carry = 1;
                this.number[i] = 0;
            }
            else
            {
                carry = 0;
            }
            i++;
        }
    }
}

//Prompt the user for input

var inputs = getInput();
str1 = inputs[0];
str2 = inputs[1];
function brute_force(str1, str2)
{
    var base = 2;
    //checks if two strings are the same
    if(str1 == str2)
    {
        return -1;
    }
    while(true)
    {
        //x is a new array in the size of the base^(2*base)
        var x = new num(base);
        var size = Math.pow(base, base*2);
        size = size / base;
        //console.log(x.number);
        for(var i = 0; i < size; i++)
        {
            //y is an empty DFA 
            var y = new DFA();
            for(var j = 0; j < base * 2; j += 2)
            {
                //add states (z) to the DFA y accoring to transitions x
                var z = new state(x.number[j], x.number[j + 1]);
                y.add_state(z);
            }
            
            //console.log(y.run_input(str1));
            //console.log(y.run_input(str2));
            
            if(y.run_input(str1) != y.run_input(str2))
            {
                return x;
            }
            x.next();
            //console.log(x.number);
        }
        base++;
    }
}

var x = brute_force(str1, str2);

//convert to a 2d array
function convert(x){
    let k = 0;
    let transArr = [[],[]];
    for(let j = 0; j< x.length; j+=2){
        transArr[k][0] = x[j];
        transArr[k][1] = x[+1];
        k++;
    }
    return transArr;
}
var transArr = convert(x);


//transArr is a 2D array
function display(transArr){
    const radius = 100;
    //might need to change
    const centerX = 300; //divide width & height by the number of DFAs we have?
    const centerY = 300;
    let locX = [];
    let locY = [];
    //this for loop is for creating states, adjust their location?
    for(let i = 0; i < transArr.length; i++){

        const angle = (2 * Math.PI * i) / transArr.length;
        const stateX = centerX + radius * Math.cos(angle);
        const stateY = centerY + radius * Math.sin(angle);
            
        // Draw the state as a circle
        ctx.beginPath();
        ctx.arc(stateX, stateY, 20, 0, 2 * Math.PI);
        ctx.stroke();
            
        // Label the state
        ctx.fillText(`q${i}`, stateX - 10, stateY + 5);
        //keep track of states locations
        locX[i] = stateX;
        locY[i] = stateY;
    }

    for(let i = 0; i < transArr.length; i++){
        //save the locations of the states
        const angle = (2 * Math.PI * i) / numStates;
        const stateX = centerX + radius * Math.cos(angle);
        const stateY = centerY + radius * Math.sin(angle);
        for(let j = 0; j<2; j++){
            makeTransition(stateX, stateY, locX[transArr[i][j]], locY[transArr[i][j]],j);
        }
    }
}

display(transArr);