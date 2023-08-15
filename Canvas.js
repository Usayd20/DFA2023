//create a class? or is the file enough to implement in state.js?
//import DFA class
import {DFA} from './state.js';

const dfainst = new DFA();

//Determine where on the screen will the DFA be displayed

//have the user be able to input two strings
//once the two strings are inputted, the backend software will create the dfa's
//the purpose of this file is to illustare the DFAs 

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

//costume variable for canvas
const canvas = document.getElementById('canvas1');
//ctx holds a refernece to canvas element
const ctx = canvas.getContext('2d');

//create the canvas element and determine how the page is going to look like

//Create circles for every time addState is called
//perhaps need to call this method in the method in state.js
function drawCircle(xAxis, yAxis){
    ctx.beginPath();
    ctx.arc(xAxis, yAxis, 50, 0, Math.pi*2);
    //where on the screen do I want to put the circles?, make sure they are moving cause we don't want all of them in the same place
}
  
//tag each state accordingly
function tagCircle(xAxis, yAxis, tagSize){
    // Set font properties for the circle tag
    ctx.font = '14px Arial';  //change?
    ctx.fillStyle = 'black';

    const tag = `q${tagSize}`;

    // Draw the tag next to the circle
    context.fillText(tag, xAxis, yAxis);
}

//Create an arrow for every new transition 
//consider cases where 2 input lead to the same output
//or when there is multiple arrows coming in and out from a state and the line needs to be curved

function makeLine(xAxis, yAxis, toX, toY){
    fromX = xAxis +50;
    fromY = yAxis;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
}

function makeState(fromX, fromY, toX, toY) {
    drawCircle(xAxis, yAxis);
    makeLine(xAxis, yAxis, toX, toY);
    var headlen = 10; // length of head in pixels
    var dx = toX - fromX;
    var dy = toY - fromY;
    var angle = Math.atan2(dy, dx);
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    // make sure to set it from one circle to another
}

//arrows for self loops
function makeSelfLoop(fromX, fromY, toX, toY){
    ctx.quadraticCurveTo(fromX, fromY, toX, toY);
}

//Add transitions for each input (0&1), basically be able to tag each transition 
function transitionLabel(trans, fromX, fromY, toX, toY){
    //locate the label over the arrow
    const locationX = (toX - fromX)/2;
    const locationY = (toY - fromY)/2;
    
}

//adds an arrow next to the start state
function initial(fromX, fromY, toX, toY){
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
}

//transition are represented as a 2D array where: {[1,0],[0,1],[2,0]} represent: 
//from state q0 on input 0, will go to state q1, on input 1 it'll stay in q0.
//state q1 on input 0 will go to q0, on input 1 will stay in q1...
//location of the square brackets inthe list represent the q#
//the first item in the sqaure brackets represents input 0, the second is input 1