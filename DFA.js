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
        //call initial function
    }   

    //Adding states to the DFA 
    add_state(state)
    {
        this.transition.push(state);
        //increment the size of the new DFA
        this.size++;
        var loc = 0;
        //every time we call drawCircle and tagCircle, make sure to change their location
        //call drawCircle + tag circle(middleX, middleY, size)
        //incremet loc
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
        //number represents the states that the DFA will go to on both inputs 0&1
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
            var y = new DFA();
            for(var j = 0; j < base * 2; j += 2)
            {
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

/*
var test = new DFA();
var q0 = new state(2,0);
var q1 = new state(3,0);
var q2 = new state(1,0);
var q3 = new state(0,0);

test.add_state(q0);
test.add_state(q1);
test.add_state(q2);
test.add_state(q3);
test.set_initial(0);

console.log(test.run_input("1100000000"));
console.log(test.run_input("1111111100"));

var x = new num(3);
x.next();
x.next();
x.next();
console.log(x.number);
*/
console.log(brute_force("1100000000","1111111100"));
