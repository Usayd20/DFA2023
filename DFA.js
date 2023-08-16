// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
class state 
{
	constructor(first, second) 
    {
        this.first = first;
        this.second = second;
    }
}

//Then we can use an array of state to represent DFA
class DFA
{
	constructor()
    {
        this.size = 0;
        this.initial_state = 0;
        this.transition = [];
    }

    set_initial(index)
    {
      	this.initial_state = index;
    }	

    add_state(state)
    {
        this.transition.push(state);
        this.size++;
   	}
    
    run_input(str)
    {
        let current = this.initial_state;

        for(var i = 0; i < str.length; i++)
        {
            if(str[i] == "0")
            {
              	current = this.transition[current].first;
            }
            else
            {
              	current = this.transition[current].second;
            }
        }

        return current;
    }
}

class num
{
	constructor(base)
    {
        this.base = base;
        this.number = [];
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
    if(str1 == str2)
    {
        return -1;
    }
    while(true)
    {
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




/*var test = new DFA();
var q0 = new state(2, 0);
var q1 = new state(3, 0);
var q2 = new state(1, 0);
var q3 = new state(0, 0);
test.add_state(q0);
test.add_state(q1);
test.add_state(q2);
test.add_state(q3);
test.set_initial(0)

console.log(test.run_input("1100000000"));
console.log(test.run_input("1111111100"));*/

/*var x = new num(3);
x.next();
x.next();
x.next();
console.log(x.number);*/
console.log(brute_force("1100000000", "1111111100").number);
//console.log("Welcome to Programiz!");
