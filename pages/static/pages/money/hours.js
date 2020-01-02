
export { getHours, totalHours, perDay };

var monday = [];
var tuesday = [];
var wednesday = [];
var thursday = [];
var friday = [];
var saturday = [];
var sunday = [];
const weeks = [];
const weeklyHours = [];
var days = {};
var hours = [];


async function getHours(hours_fp) {
    const response = await fetch(hours_fp);
    const data = await response.text();
    // const index = data.split('\n')[0];
    const rows = data.split('\n').splice(1);
 
    rows.forEach(line => {
        let row = line.split(',');
        if (monday.length < 16){
            
            weeks.push(row[0]);
            
            row[1] ? monday.push(row[1]): monday.push(0);
            row[2] ? tuesday.push(row[2]): tuesday.push(0);
            row[3] ? wednesday.push(row[3]) : wednesday.push(0);
            row[4] ? thursday.push(row[4]): thursday.push(0);
            row[5] ? friday.push(row[5]): friday.push(0);
            row[6] ? saturday.push(row[6]): saturday.push(0);
            row[7] ? sunday.push(row[7]): sunday.push(0);

            // row[8] ? hours.push(row[8]): hours.push(0);
            
            weeklyHours.push(row[8]);
            // weeklyMoney.push(parseFloat(row[10], 10));
        }
        
    });
    
    days = {
        'monday': monday,
        'tuesday' : tuesday,
        'wednesday' : wednesday,
        'thursday' : thursday,
        'friday' : friday,
        'saturday' : saturday,
        'sunday' : sunday
    };

}


async function totalHours(hours_fp) {
    await getHours(hours_fp);

    const ctx = document.getElementById('canvas').getContext('2d');

    var hourChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: weeks,
            datasets: [{
                label: "Weekly Hours",
                data: weeklyHours,
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
                            return value;
                        }
                    }
                }]
            }
        }
    });
    
}

async function perDay(hours_fp, day) {
    await getHours(hours_fp);
    const ctx = document.getElementById('canvas').getContext('2d');
    // ctx.clearRect(0,0, ctx.width, ctx.height);
    var hourChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weeks,
            datasets: [{
                label: "" + day + " Hours",
                data: days[day],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    type: 'time',
                    time: {
                        unit: 'hour',
                        displayFormats: {
                           hour: 'HH:mm'
                        }
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: function(value) {
                            return value;
                        }
                    }
                }]
            }
        }
    });
    for (let i = 0; i < days[day].length; i++){
        console.log(days[day][i]);
    }
}