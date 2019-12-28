
// getMoney();
// total();
export { getMoney, total, perDay, weekly };
// window.addEventListener('mousedown', (event) => {

// }, false);

var monday = [];
var tuesday = [];
var wednesday = [];
var thursday = [];
var friday = [];
var saturday = [];
var sunday = [];
const weeks = [];
const weeklyTips = [];
const weeklyMoney = [];
var days = [];
var tips = [];

let week = ['monday', 'tuesday', 'wednesday','thursday','friday', 'saturday','sunday'];
var map = new Map();
for (let i=0; i < week.length; i++){
    map[week[i]] = i;
}


async function getMoney() {
    const response = await fetch("2018/money.csv");
    const data = await response.text();

    const rows = data.split('\n').splice(1);
    rows.forEach(line => {
        let row = line.split(',');
        if (monday.length < 16){
            
            weeks.push(row[0]);
            
            row[1] ? monday.push(parseInt(row[1].replace("$", ""))): monday.push(0);
            row[2] ? tuesday.push(parseInt(row[2].replace("$", ""))): tuesday.push(0);
            row[3] ? wednesday.push(parseInt(row[3].replace("$", ""))): wednesday.push(0);
            row[4] ? thursday.push(parseInt(row[4].replace("$", ""))): thursday.push(0);
            row[5] ? friday.push(parseInt(row[5].replace("$", ""))): friday.push(0);
            row[6] ? saturday.push(parseInt(row[6].replace("$", ""))): saturday.push(0);
            row[7] ? sunday.push(parseInt(row[7].replace("$", ""))): sunday.push(0);

            row[8] ? tips.push(parseInt(row[8].replace("$", ""))): tips.push(0);
            
            weeklyTips.push(parseInt(row[8].replace("$", ""), 10));
            weeklyMoney.push(parseFloat(row[10].replace("$", ""), 10));
        }
    });
    
    days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
    let averages = [];
    
    for (let i = 0; i < days.length; i++) {
        let sum = 0;
        let count = 0;
        for (let j = 0; j < days[i].length; j++) {
            if (days[i][j]){
                var currency = days[i][j];
                sum += currency;
                count++;
            }
        }
        
        averages.push(Math.round(sum/count*100)/100);

    }

}

async function perDay(day) {

    await getMoney();
    const ctx = document.getElementById('canvas').getContext('2d');
    var moneyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: weeks,
            datasets: [{
                label: ""+ day +" Tips",
                data: days[map[day]],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',

                
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value) {
                            return "$" + value;
                        }
                    }
                }]
            }
        }
    });


}

async function total() {

    await getMoney();

    const ctx = document.getElementById('canvas').getContext('2d');

    var moneyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: weeks,
            datasets: [{
                label: "tips/week",
                data: tips,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',

                
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value) {
                            return "$" + value;
                        }
                    }
                }]
            }
        }
    });
}


async function weekly() {
    await getMoney();
    const ctx = document.getElementById('canvas').getContext('2d');
    // ctx.height = 400;
    // ctx.width = 400;
    var moneyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: weeks,
            datasets: [{
                label: "Money/week",
                data: weeklyMoney,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',

                
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value) {
                            return "$" + value;
                        }
                    }
                }]
            }
        }
    });
}


