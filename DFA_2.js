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
            if (this.dfa_array[i] >= this.state_count)
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
        var found = false;
        // this dfa array will store the solutions we will add to solutions_arr
        var solution_dfa = new DFA_1D_Array(state_count);
        var size = Math.pow(state_count, (state_count * 2));
        var solution_integers = [];
        solution_integers.push(state_count);
        var count = 0;

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
                found = true;
                solution_integers.push(count);
            }

            count++;
            solution_dfa.increment_dfa();
        }

        if (found)
        {
            return solution_integers;
        }
        else
        {
            state_count++;
        }
    }
}


// convert int solutions to dfa array form
function convert_int_to_dfa(state_count, dfa_number)
{
    var result = [];
    var transition;

    for(var i = 0; i < state_count * 2; i++)
    {
        transition = dfa_number % state_count;
        dfa_number = Math.floor(dfa_number / state_count);
        result.push(transition);
    }
    return result;
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
var Xcoord = [];
var Ycoord = [];



function get_input()
{
    var firstString, secondString;

    firstString =  document.getElementById("string1").value;  
    secondString = document.getElementById("string2").value;

    //show an error if not same length
    if(firstString.length != secondString.length)
    {
        alert('Both inputs should have the same length, please enter a valid set of strings');
        return [-1,-1];
    }

    
    return [firstString, secondString];
}



function place_states(total_states, Xshift, Yshift)
{
    const setup_radius = 300;
    var setup_center_X = canvas.width/4 + Xshift;
    var setup_center_Y = canvas.width/4 + Yshift;
    //might need to change
    
    var state_angle = 0;
    
    console.log(total_states);

    //this for loop is for creating states, adjust their location?
    for(let i = 0; i < total_states; i++)
    {    
        state_angle = (2 * Math.PI * i) / total_states;
        Xcoord[i] = setup_center_X + setup_radius * Math.cos(state_angle + Math.PI);
        Ycoord[i] = setup_center_Y + setup_radius * Math.sin(state_angle + Math.PI);
        
    }
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
    drawArrowhead(Xcoord[0]-70, Ycoord[0], 0, 40, 40);
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
    ctx.translate(hx, hy);
    ctx.rotate(0 - angle);
    ctx.translate((-locx), (-locy));
}



// returns radians
function findAngle(sx, sy, ex, ey) 
{
    // make sx and sy at the zero point
    return Math.atan2((ey - sy), (ex - sx));
}




function draw_arrows(arr)
{
    ctx.font = "16px Arial";

    var state_radius = 50;

    var curr_state  = 0;
    var end_state   = 0; 
    var curve_ref_x = 0;
    var curve_ref_y = 0;
    var start_x, start_y, end_x, end_y;

    for (curr_state = 0; curr_state < arr.length; curr_state++)
    {
        console.log("CURR STATE: " + curr_state);

        for (var i = 0; i <= 1; i++)
        {
            
            end_state = arr[curr_state][i];
            
            if (curr_state == end_state)
            {
                start_x = Xcoord[curr_state] - 15;
                start_y = Ycoord[curr_state] - state_radius;
                end_x   = Xcoord[curr_state] + 15;
                end_y   = Ycoord[curr_state] - state_radius;
                curve_ref_x = Xcoord[curr_state];
                curve_ref_y = Ycoord[curr_state] - 150;

                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.moveTo(start_x, start_y);
                ctx.quadraticCurveTo(curve_ref_x, curve_ref_y, end_x, end_y);
                ctx.stroke();
                ctx.closePath();

                ctx.beginPath();
                ctx.fillStyle = "black";
                (i == 0) ? ctx.fillText(`${i}`, (curve_ref_x) , (curve_ref_y + 30) ) : ctx.fillText(`${i}`, (curve_ref_x) , (curve_ref_y + 45) );
                ctx.stroke();
                ctx.closePath();

                var arrow_angle = findAngle(curve_ref_x, curve_ref_y, end_x, end_y);
                ctx.fillRect(end_x, end_y, 2, 2);
                drawArrowhead(end_x, end_y, arrow_angle, 12, 12);
                ctx.closePath();
                                
            }
            else
            {
                var midpoint = [ (Xcoord[curr_state] + Xcoord[end_state]) / 2 , (Ycoord[curr_state] + Ycoord[end_state]) / 2 ];
                
                var line_angle = findAngle(Xcoord[curr_state], Ycoord[curr_state], Xcoord[end_state], Ycoord[end_state]);
                
                curve_ref_x = Math.floor(midpoint[0] +  state_radius * Math.sin(line_angle));
                curve_ref_y = Math.floor(midpoint[1] + -state_radius * Math.cos(line_angle));
                
                start_x = Math.floor(Xcoord[curr_state] + state_radius * Math.cos(line_angle + 6));
                end_x   = Math.floor(Xcoord[end_state]  + state_radius * Math.cos(line_angle + 3.42));
                start_y = Math.floor(Ycoord[curr_state] + state_radius * Math.sin(line_angle + 6));
                end_y   = Math.floor(Ycoord[end_state]  + state_radius * Math.sin(line_angle + 3.42));
                
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.moveTo(start_x, start_y);
                ctx.quadraticCurveTo(curve_ref_x, curve_ref_y, end_x, end_y);
                ctx.stroke();
                ctx.closePath();

                ctx.beginPath();
                ctx.fillStyle = "black";
                (i == 0) ? ctx.fillText(`${i}`, (curve_ref_x) , (curve_ref_y) ) : ctx.fillText(`${i}`, (midpoint[0] + curve_ref_x) / 2 , (midpoint[1] + curve_ref_y) / 2 );
                ctx.stroke();
                ctx.closePath();

                var arrow_angle = findAngle(curve_ref_x, curve_ref_y, end_x, end_y);
                ctx.fillRect(end_x, end_y, 2, 2);
                drawArrowhead(end_x, end_y, arrow_angle, 12, 12);
                ctx.closePath();

            }

        }
    }

}




//transArr is a 2D array
function display(transArr, Xshift, Yshift)
{
    place_states(transArr.length, Xshift, Yshift);

    draw_states(transArr.length);

    draw_arrows(transArr);

}





function button_clicked()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var input_strings = get_input();

    if (input_strings[0] != -1)
    {
        var solution_ints = compare_2_strings(input_strings[0], input_strings[1]);
        console.log(solution_ints.length - 1);
        var arr_size = solution_ints[0] * 2;

        for (var i = 0; i < arr_size; i++)
        {
            var dfa_to_display = convert_int_to_dfa(solution_ints[0], solution_ints[i+1]);
            
            var to_display_2D = convert_2D(dfa_to_display);
            console.log(to_display_2D);

            display(to_display_2D, ( (canvas.width/2) * (i % 2) ), ( (canvas.width/2) * Math.floor(i/2) ) );
        }
    }
    
}