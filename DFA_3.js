//state class carries information on the transitions on inputs
//  transition_0 = state reached on input 0 
//  transition_1 = state reached on input 1
class state 
{
    constructor(transition_0, transition_1)
    {
        this.transition_0 = transition_0;
        this.transition_1 = transition_1;
    }
}




class DFA 
{
    constructor()
    {
        this.size = 0;
        this.initial_state = 0;
        this.transition_array = [];
    }

    // sets the initial state to the state number provided 
    set_initial(state_number)
    {
        this.initial_state = state_number;
    }

    add_state(state)
    {
        this.transition_array.push(state);
        this.size++;
    }

    run_input(str)
    {
        let current_state = this.initial_state;

        for (var i = 0; i < str.length; i++)
        {
            if (str[i] == '0') 
            {
                current_state = this.transition_array[current_state].transition_0;
            }
            else 
            {
                current_state = this.transition_array[current_state].transition_1;
            }
        }

        return current_state;
    }
}




class DFA_1D_Array
{
    constructor(state_count)
    {
        this.state_count = state_count;
        this.dfa_array = [];

        // fills the 1D solution array with 0s
        for (var i = 0; i < this.state_count * 2; i++)
        {
            this.dfa_array.push(0);         
        }
    }

    // increments the 1D dfa array by 1 to create the next DFA in the current 
    // state count that compare_2_strings will try with the current state count
    increment_dfa()
    {
        var carry = 1;
        var i = 0;

        while (carry != 0)
        {
            this.dfa_array[i] = this.dfa_array[i] + 1;
            if (this.dfa_array [i] >= this.state_count)
            {
                carry = 1;
                this.dfa_array[i] = 0;
            }
            else
            {
                carry = 0;
            }
            i++;
        }
    }
}




function compare_2_strings (str1, str2)
{
    // start with 2 states, the smallest possible solution
    var state_count = 2;

    if (str1 == str2)
    {
        return -1;
    }

    while (true)
    {
        // this dfa array will store the solution we will return
        var solution_dfa = new DFA_1D_Array(state_count);
        var size = Math.pow(state_count, (state_count * 2));
        //size = size / state_count;

        for (var i = 0; i < size; i++)
        {
            // create a dfa to test the 2 strings on
            var current_test_dfa = new DFA();

            //copy the current solution dfa to the test dfa
            for (var j = 0; j < state_count * 2; j += 2)
            {
                var state_Q = new state(solution_dfa.dfa_array[j], solution_dfa.dfa_array[j+1]);
                current_test_dfa.add_state(state_Q);
            }

            // if string 1 and string 2 end on different states, our solution dfa is correct
            if (current_test_dfa.run_input(str1) != current_test_dfa.run_input(str2))
            {
                return solution_dfa;
            }

            // if string1 and string2 end on the same state number,
            // increment the dfa and try again
            solution_dfa.increment_dfa();

        }

        // if we have tried all DFAs of the current sizeand found no solutions, 
        // increment state count and repeat the process
        state_count++;
    }
}



//convert to a 2d array
function convert_2D(x)
{
    let transArr = [];
    for(let i = 0; i < x.length/2; i++)
    {
        transArr[i] = [ x[2 * i] , x[2 * i + 1] ];
    }
    return transArr;
}














//start of frontend

//costume variable for canvas
const c = document.getElementById('canvas');
//ctx holds a refernece to canvas element
const ctx = c.getContext('2d');

//state positions
const Xcoord = [c.width / 3, 
                2 * c.width / 3,
                c.width / 5,
                4 * c.width / 5,
                c.width / 3,
                2 * c.width / 3    ]; 
const Ycoord = [c.width / 4,
                c.width / 4,
                c.width / 2,
                c.width / 2,
                3 * c.width / 4,
                3 * c.width / 4    ];



function get_input(){
    let firstString, secondString;
    do{
        firstString = prompt('Please enter the first string: ');  
        secondString = prompt ('Please enter the second string: ');

        //show an error if not same length
        if(firstString.length != secondString.length){
            alert('Both inputs should have the same length, please enter a valid set of strings');
        }
    } while (firstString.length != secondString.length);
    //need to connect these user inputs to state.js
    return [firstString, secondString];
}




function draw_states(a)
{
    ctx.font = "32px Arial";
    ctx.textAlign = "center";

    var state_num = 0;

    for ( state_num = 0; state_num < a; state_num++ )
    {
        ctx.beginPath();
        ctx.arc(Xcoord[state_num],  Ycoord[state_num] , 50, 0, 2*Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillText(`q${state_num}`, Xcoord[state_num], Ycoord[state_num] + 8 );
        ctx.fill();
    }
}


function drawArrowhead(locx, locy, angle, sizex, sizey) 
{
    var hx = sizex / 2;
    var hy = sizey / 2;
    ctx.translate((locx), (locy));
    ctx.rotate(angle);
    ctx.translate(-hx, -hy);
  
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 1 * sizey);
    ctx.lineTo(1 * sizex, 1 * hy);
    ctx.closePath();
    ctx.fill();
}
  
  
  // returns radians
function findAngle(sx, sy, ex, ey) 
{
    // make sx and sy at the zero point
    return Math.atan2((ey - sy), (ex - sx));
}
  

function draw_arrows(arr)
{
    var curr_state = 0;
    var dest_state = 0; 
    var curve_ref_x = 0;
    var curve_ref_y = 0;
    var start_x, start_y, end_x, end_y;

    for (curr_state = 0; curr_state < arr.length; curr_state++)
    {
        for (var i = 0; i <= 1; i++)
        {
            dest_state = arr[curr_state][i];

            if (curr_state == dest_state)
            {
                start_x = Xcoord[curr_state] - 15;
                start_y = Ycoord[curr_state] - 50;
                end_x   = Xcoord[curr_state] + 15;
                end_y   = Ycoord[curr_state] - 50;
                curve_ref_x = Xcoord[curr_state];
                curve_ref_y = Ycoord[curr_state] - 70;

                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.moveTo(start_x, start_y);
                ctx.quadraticCurveTo(curve_ref_x, curve_ref_y, end_x, end_y);
                ctx.stroke();
                ctx.closePath();

                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.fillText(`0`, Xcoord[curr_state], (start_y + end_y)/2 - 10);
                ctx.stroke();
                ctx.closePath();

                var ang = findAngle(curve_ref_x, curve_ref_y, end_x, end_y);
                ctx.fillRect(end_x, end_y, 2, 2);
                drawArrowhead(end_x, end_y, ang, 15, 15);
            }
            else
            {
                
            }
        }
    }

}


//transArr is a 2D array
function display(transArr)
{
    draw_states(transArr.length);

    //draw_arrows(transArr);

}



/*
console.log("1D solution");
console.log(to_display);
var to_display_2D = convert_2D(to_display);
console.log("\n\n2D solution");
console.log(to_display_2D);


******************************var elementin2d = to_display_2D[0][1];
******************************console.log(elementin2d);
*/




var input_strings = get_input();
var to_display = compare_2_strings(input_strings[0], input_strings[1]).dfa_array;

var to_display_2D = convert_2D(to_display);

display(to_display_2D);

