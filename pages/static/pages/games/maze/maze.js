
// The maze to display
var m;
// Starting location containing sparty to move from
var start = {};
var body = document.getElementsByTagName("body")[0]; 
// Default size of maze
var rows = 10;
var cols = 10;

$(document).ready (function () {

    $('body').height(innerHeight);

    //Create the form that will allow a user to create the maze size
    let form = document.createElement('form');
    
    let row_input = document.createElement('input'); row_input.type = "text"; row_input.placeholder = 10; row_input.id = "row";
    let col_input = document.createElement('input'); col_input.type = "text"; col_input.placeholder = 10; col_input.id = "col";
    
    let form_p = document.createElement('p');
    let row_label = document.createElement('label'); row_label.for = "row"; row_label.innerHTML = "Rows: "
    let col_label = document.createElement('label'); col_label.for = "col"; col_label.innerHTML = "Cols: "
    
    let button_p = document.createElement('p');
    let submit = document.createElement('input'); submit.type = 'submit'; submit.value = "Create"; submit.id = "create";

    button_p.appendChild(submit);
    
    form_p.appendChild(row_label); form_p.appendChild(row_input); form_p.appendChild(col_label); form_p.appendChild(col_input);
    
    let message = document.createElement('p'); message.innerHTML = "&nbsp"; message.id = "message";

    form.appendChild(form_p); form.appendChild(message); form.appendChild(button_p); 
    body.appendChild(form);

    newMaze(10, 10);
});

$(function () {
    // Gives user control of number of rows and cols
    $('#create').on("click", function(event) {
        event.preventDefault();

        let rows_input = document.getElementById('row').value;
        let cols_input = document.getElementById('col').value;

        if (rows_input != "" && cols_input != "") {
            if (!isNaN(rows_input) && !isNaN(cols_input)) {
                if (rows_input >= 5 && rows_input < 50 && cols_input >= 5 && cols_input < 50) {
                    // Reset default dimensions
                    rows = rows_input; cols = cols_input;
                    document.getElementById('message').innerHTML = "";
                    newMaze(rows_input, cols_input);
                } 
                else {
                    document.getElementById('message').innerHTML = "Input must be between 5 and 50.";
                }
            } 
            else {
                document.getElementById('message').innerHTML = "Input must be a number.";
            }
        }
    });
});

// Removes all html including and below board
function removeMaze() {
    body.removeChild(document.getElementsByClassName("board")[0]);
    body.removeChild(document.getElementsByClassName("parent")[0]);
    body.removeChild(document.getElementsByClassName('footer')[0]);
}

// Creates the maze and appends it to the html
function newMaze(rows, cols) {
    if (document.getElementsByClassName("board")[0] != undefined) {
        removeMaze();
    }

    m = new maze(500, 500, rows, cols);

    m.startMaze();
    let table = document.createElement('div'); table.className = "board";

    $('.board').width(m.width + "px");
    $('.board').height(m.height + "px");

    body.append(table);

    for (let row=0; row<m.rows; row++) {
        // Create the row
        var tr = document.createElement('div');
        tr.className = "row";

        for (let col=0; col<m.cols; col++) {
            // Creates a cell
            let button = document.createElement('div'); 
            button.className = "cell";
            let cell = m.cells[row][col];
            if (cell.image != null) {
                if (cell.image == sparty) {
                    // Set the location sparty is starting at
                    start = {
                        "row" : row,
                        "col" : col
                    };
                    // Mark the start with a color so you know where the end path started
                    button.style.backgroundColor = "green";
                }
                else {
                    img = document.createElement('img'); img.src = cell.image; img.width=m.cellWidth; img.height=m.cellHeight;
                    button.appendChild(img);
                }
            }

            // Determine the borders of each cell
            if (!cell.border[0]) { button.style.borderTop = "none"; }
            else if (button.style.borderTop != "none") {button.style.borderTop="1px solid black";}
            if (!cell.border[1]) { button.style.borderBottom = "none"; }
            // else if (button.style.borderBottom != "none") {button.style.borderBottom="1px solid black";}
            if (!cell.border[2]) { button.style.borderLeft = "none"; }
            else if (button.style.borderLeft != "none") {button.style.borderLeft="1px solid black";}
            if (!cell.border[3]) { button.style.borderRight = "none"; }
            // else if (button.style.borderRight != "none") {button.style.borderRight="1px solid black";}
            
            tr.appendChild(button);
        }
        // Adds a row to the board
        table.appendChild(tr);
    }

    // Make the button to solve the maze
    let b = document.createElement('button'); b.innerHTML = "Solve"; b.id = "solve"; //b.id = "solve";
    let b2 = document.createElement('button'); b2.innerHTML = "New";  b2.id = "new"//b2.className = "new";
    let buttons = document.createElement('div'); buttons.className = 'buttons'; buttons.appendChild(b); buttons.appendChild(b2);
    let parent = document.createElement('div'); parent.className = 'parent'; parent.appendChild(buttons); 
    body.appendChild(parent);

    // Set the dimensions of each cell and row
    $('.cell').width(m.cellWidth + "px");
    $('.cell').height(m.cellHeight + "px");
    $('.row').width(m.width + "px");
    $('.row').height(m.cellHeight + "px");

    // Create the onclick listeners every time a maze is initialized
    $('#solve').on("click", function() {
        m.unVisit();
        solve(m, [], start['row'], start['col'], function(solve=false){ return solve; });

    });

    $('#new').on("click", function () {
        newMaze(rows, cols);
    });

    // Unvisit all cells so the maze can be solved
    m.unVisit();

    // Creates the footer for the page
    let footer = document.createElement('footer'); footer.style.height = "100px"; footer.className = 'footer';
    let h1 = document.createElement('h1');
    let a = document.createElement('a'); a.href="https://github.com/cbeemers/Website/blob/master/static/pages/games/maze/maze.js"; a.innerHTML = "Source Code"; a.target = "_blank";
    // h1.appendChild(a);
    footer.appendChild(a);
    body.appendChild(footer);
}

// Sets the image to a cell div
function setImage(m, row, col) {

    let board = document.getElementsByClassName('board')[0];
    let c = board.children[row].children[col];

    let img = document.createElement('img'); img.src = sparty; img.width = m.cellWidth; img.height=m.cellHeight;
    
    c.style.backgroundColor = "red";
    // c.appendChild(img);
} 

// Remove an image from a cell div
function removeImage(row, col) {
    let board = document.getElementsByClassName('board')[0];
    let c = board.children[row].children[col];
    if (c.firstChild != null) {
        c.removeChild(c.firstChild);
        c.style.backgroundColor = "blue";
        return;
    }
    c.style.backgroundColor = "grey";
}

function solve(m, path, row, col, callback) {
    
    let cell = m.cells[row][col];

    // Array of the nodes that have been visited
    path.push(cell);
    cell.visited = true;

    if (cell.image == finish) {
        removeImage(row,col);
        setImage(row, col)
        return callback(true);
    }
    let i = 0;

    // Goes through each adjacent node that hasnt been visited and breaks down a border
    (function next() {
        if (i < cell.adjacents.length) {
            let c = cell.adjacents[i];
            if (!c.visited) {

                // setTimeout(setImage, 1000, m, c.row, c.col);
                setImage(m, c.row, c.col);
                // removeImage(row, col);
                
                // Callback function triggers timeout for animation
                solve(m, path, c.row, c.col, function(solved) {
                    if (solved) {
                        return true;
                    } else {
                        i++;
                        setTimeout(next, 100);
                    }
                })
            } else {
                i++;
                setTimeout(next, 100);
            }
        } else {
            // All adjacent nodes have been visited, backtrack to find more unvisited nodes
            let popped = path.pop();
            removeImage(popped.row, popped.col)
            callback(false);
        }
    })();
}


function maze (width, height, rows, cols) {
    
    // Dimensions of the maze
    this.width = width;
    this.height = height;

    // Number of rows and columns
    this.rows = rows; 
    this.cols = cols;

    // Dimensions of each cell in the maze
    this.cellWidth = this.width/rows;
    this.cellHeight = this.height/cols;

    // All cells in the
    this.cells = [];

    // Initialize the cells in the maze
    for (let row =0; row<this.rows; row++) {
        let c = [];
        for (let col=0; col<this.cols; col++) {
            c.push(new cell(row, col));
        } 
        this.cells.push(c);
    }

    // Let all cells know of their adjacent cells
    for (let row=0; row<this.rows; row++) {
        for (let col=0; col<this.cols; col++) {
            let cell = this.cells[row][col];
            let adjacents = cell.getAdjacents(this.rows, this.cols);
            for (let a=0; a<adjacents.length; a++) {
                cell.adjacents.push(this.cells[adjacents[a][0]][adjacents[a][1]]);
            }
            cell.shuffleAdjacents();
        }
    }
    
    // Create a maze
    this.initializeMaze = function(path, row, col) {
        let cell = this.cells[row][col];

        // Array of the nodes that have been visited
        path.push(cell);
        cell.visited = true;

        // Goes through each adjacent node that hasnt been visited and breaks down a border
        for (let i=0; i<cell.adjacents.length; i++) {
            let c = cell.adjacents[i];
            if (!cell.adjacents[i].visited) {
                this.breakWall(cell, c);
                this.initializeMaze(path, c.row, c.col);
            }
        }
        // All adjacent nodes have been visited, backtrack to find more unvisited nodes
        path.pop();
        return;
    }

    // Get rid of a border
    this.breakWall = function(currNode, nextNode) {
        if (currNode.row - nextNode.row < 0) {
            // Move down
            currNode.border[1] = false;
            nextNode.border[0] = false;
        } 
        else if (currNode.row - nextNode.row > 0) {
            // Move up
            currNode.border[0] = false;
            nextNode.border[1] = false;

        } 
        else if (currNode.col - nextNode.col < 0) {
            // Move right
            currNode.border[3] = false;
            nextNode.border[2] = false;

        } 
        else if (currNode.col - nextNode.col > 0) {
            // Move left
            currNode.border[2] = false;
            nextNode.border[3] = false;
        }
    }

    // Initialize maze and add starting and ending nodes
    this.startMaze = function() {
        let row = Math.floor(Math.random() *this.rows);
        let col = Math.floor(Math.random() *this.cols);
        this.initializeMaze([], row, col);

        let goalRow = Math.floor(Math.random() *this.rows);
        let goalCol = Math.floor(Math.random() *this.cols);

        // Ensure the start and goal are not placed at the same cells
        while (goalRow == row && goalCol == col) {
            goalRow = Math.floor(Math.random() *this.rows);
            goalCol = Math.floor(Math.random() *this.cols);
        }

        // Initialize random locations for start and goal nodes
        this.cells[row][col].image = sparty;
        this.cells[goalRow][goalCol].image = finish;

    }

    this.unVisit = function() {
        for (let row=0; row<this.rows; row++) {
            for (let col=0; col<this.cols; col++) {
                this.cells[row][col].visited = false;
            }
        }
    }
}


function cell(row, col) {
    // Row, col index in the board
    this.row = row;
    this.col = col;

    this.image = null;

    this.visited = false;
    // top, bottom, left, right
    this.border = [true, true, true, true];
    
    // Adjacent cells
    this.adjacents = [];

    // Get the adjacent row, col indices 
    this.getAdjacents = function(rows, cols) {
        let indices = [];

        if (this.row != 0) {
            indices.push([this.row-1, this.col]);
        }
        if (this.row != rows-1) {
            indices.push([this.row+1, this.col]);
        }
        if (this.col != 0) {
            indices.push([this.row, this.col-1]);
        }
        if (this.col != cols-1) {
            indices.push([this.row, this.col+1]);
        }
        
        return indices;
    }

    // Shuffle the adjacents list to randomize border removal
    this.shuffleAdjacents = function() {
        let shuffled = [];

        while (this.adjacents.length > 0) {
            let index = Math.floor(Math.random() * this.adjacents.length);
            shuffled.push(this.adjacents[index]);
            this.adjacents.splice(index, 1);
        }

        this.adjacents = shuffled;
    } 
}
