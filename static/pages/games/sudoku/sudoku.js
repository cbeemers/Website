
// export {createBoard};

var board = [
    [0, 0, 4, 0, 0, 0, 0, 6, 7],
    [3, 0, 0, 4, 7, 0, 0, 0, 5],
    [1, 5, 0, 8, 2, 0, 0, 0, 3],
    [0, 0, 6, 0, 0, 0, 0, 3, 1],
    [8, 0, 2, 1, 0, 5, 6, 0, 4],
    [4, 1, 0, 0, 0, 0, 9, 0, 0], 
    [7, 0, 0, 0, 8, 0, 0, 4, 6],
    [6, 0, 0, 0, 1, 2, 0, 0, 0],
    [9, 3, 0, 0, 0, 0, 7, 1, 0]];

var copy_solution = JSON.parse(JSON.stringify(board));

$(document).ready(function() {
    // Create the board that contains all the cells
    let table = document.createElement('div'); table.classList = ["board"];
    let body = document.getElementsByTagName("body")[0]; 
    
    // Creates a div that center aligns its children
    let d = document.createElement('div'); d.className = "parent"; d.appendChild(table);
    body.append(d);

    for (let row=0; row<9; row++) {
        // Create the row
        var tr = document.createElement('div');

        for (let col=0; col<9; col++) {
            // Creates a cell
            let button = document.createElement('button'); button.value = row * 9 + col; button.name = (row*9+col).toString()
            
            // Set an initial value to a cell and disable so the value cant be changed
            if (board[row][col] != 0) {
                button.innerHTML= board[row][col].toString(); button.disabled = true;
            }

            // Quad cell has a border on the right
            if (col%3 != 2 || col == 8) {
                button.className = "cell";
            } else {
                button.className = "quad_cell";
            }
            
            // Adds a column to the row
            tr.appendChild(button);
        }
        
        // Quad row has a border on the bottom
        if (row%3 != 2 || row == 8) {
            tr.className = "row";
        } else { 
            tr.className = "quad_row"; 
        }
        
        // Adds a row to the board
        table.appendChild(tr);
    }

    let numbers = document.createElement('div'); numbers.className = "numbers";
    
    // Create the number setting controls
    for (let i=1; i<=9; i++) {
        let button = document.createElement('button'); button.className = "option"; button.innerHTML = i; button.value = i;
        numbers.appendChild(button);
    }

    // Center align the numbers div
    let di = document.createElement('div'); di.className = "parent"; di.appendChild(numbers);
    body.append(di);

    // Creates a button to solve the puzzle and center aligns
    let solveButton = document.createElement('button'); solveButton.className = "solve"; solveButton.innerHTML = "Solve"; 
    let resetButton = document.createElement('button'); resetButton.className = "reset"; resetButton.innerHTML = "Reset"; 
    let buttons = document.createElement('div'); buttons.className = "buttons"; buttons.appendChild(solveButton); buttons.appendChild(resetButton); 
    let dd = document.createElement('div'); dd.className = "parent";  dd.appendChild(buttons);
    
    body.append(dd);

    // The solved puzzle
    solve(copy_solution, 0, 0);

    // Current cell clicked on
    index = -1;

});

// Solve the board
$(function () {
    $('.solve').on("click", function() {
        // solve(board, 0, 0);
        let children = document.getElementsByClassName("board")[0].children;
        
        // Set all cells to the correct value
        for (let i=0; i < children.length; i++) {
            let rows = children[i].children;
            for (let j=0; j < rows.length; j++) {
                rows[j].innerHTML = copy_solution[i][j];
                resetCell(rows[j], j);
            }
        }
    });
});

function updateIndex() {
    let value = $(this).attr("value")

    if (index == -1) {
        index = value;
    } else if($(this).attr("value") != index) {
        if (document.getElementsByClassName("board")[0].children[Math.floor(index/ 9)].children[index%9].className != "wrong_cell") {
            resetCell(document.getElementsByClassName("board")[0].children[Math.floor(index/ 9)].children[index%9], index%9)
        }
        index = value;
    } else {
        index = -1;
    }
}

// Clicked on a cell
$(function() {
    $(".cell").on("click", updateIndex);
    $(".quad_cell").on("click", updateIndex);
});

// Click on numbers to put in cell
$(function () {
    $('.option').on("click", function() {
        // The value of the option clicked
        let value = $(this).attr("value");

        if (index != -1) {
            // Get the row and column of the cell in question using its index
            let row = Math.floor(index/ 9);
            let col = index % 9;

            // Gets the cell that was clicked on
            let cell = document.getElementsByClassName("board")[0].children[row].children[col];
            if (cell.innerHTML != value) {
                cell.innerHTML = value;
            }
            else {
                cell.innerHTML = "";
                resetCell(cell, col);
            }

            if (cell.innerHTML != "") {
                if (copy_solution[row][col] != parseInt(value)) {
                    // If the move was not valid, the background of the cell turns red
                    cell.className = "wrong_cell";
                } else if (cell.className == "wrong_cell") {
                    resetCell(cell, col)
                } else {
                    cell.className = "selected_cell";
                }
            }
        }
    });
});

$(function() {
    $(".reset").on("click", resetBoard);
});

function resetCell(cell, col) {
    if (col %3 == 2) {
        cell.className = "quad_cell";
    } else {
        cell.className = "cell";
    }
}

function resetBoard() {
    let rows = document.getElementsByClassName("board")[0].children
    for (let row=0; row < rows.length; row++) {
        for (let col=0; col < rows[row].children.length; col++) {
            let cell = board[row][col];
            if (cell == 0) {
                rows[row].children[col].innerHTML = "";
                resetCell(rows[row].children[col], col);
            }
        }
    }
}

function solve(board, row, col) {    

    // If the last column of a row reached, increment row and reset column
    if (col > board[row].length-1) {
        row += 1;
        col = 0;
    }

    // If the last row was finished, the puzzle has been solved
    if (row > board.length - 1) {
        return true;
    }

    for (let val=1; val < 10; val++) {
        if (board[row][col] == 0){ 
            if (is_valid(board, row, col, val)) {
                board[row][col] = val;
                // If board solved return true back through call stack
                if (solve(board, row, col+1)) {
                    return true;
                }
                else {
                    // If false, backtrack
                    board[row][col] = 0;
                }
            }
        }
        // Increments column of cells with initial value
        else if (solve(board, row, col+1)) {
            return true;
        }
        else {
            return false;
        }
    }
    // For loop exited without replacing a cell, triggers backtracking
    return false;
}

function is_valid(board, row, col, val){

    let quadrant = calc_quad(board, row, col);

    column = []
    for (let c=0; c<9; c++){
        column.push(board[c][col]);
    }

    // If valid move, return True else return False
    if (quadrant.includes(val) || column.includes(val) || board[row].includes(val)) {
        return false;
    }

    return true;
}

function calc_quad(board, row, col) {

    let quadrant = [];

    // Calculates the starting indices of the current quadrant
    let quad_row = row - row % 3;
    let quad_col = col - col % 3;

    for (let i=quad_row; i < quad_row+3; i++){
        for (let j=quad_col; j < quad_col+3; j++) {
            quadrant.push(board[i][j]);
        }
    }    
    return quadrant;
}

function print_board(board) {

    for (let row=0; row < board[0].length; row++) {
        let column = "";
        for (let col=0; col < board[0].length; col++){
            column += (board[row][col]).toString() + " ";
        }
        console.log(column);
    }       
}

