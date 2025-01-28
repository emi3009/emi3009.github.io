

// Initialize the chart variable
let switchedProbabilityChart;
// Get the canvas element
const canvas2 = document.getElementById('myChart2');
const ctx2 = canvas2.getContext('2d');
let myChart2;
// Retrieve data from the database
onValue(resultRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    
    // Count the number of stayed and switched
    const won = Object.values(data)
        .filter(item => item.didSwitch)
        .filter(item => item.carBehind === item.playerChoice).length;
    const lost = Object.values(data)
        .filter(item => item.didSwitch)
        .filter(item => item.carBehind !== item.playerChoice).length;

    // Chart configuration
    const chartData = {
        labels: ['Auto', 'Ziege'],
        datasets: [{
            data: [won, lost],
            backgroundColor: [
                '#4e73df',
                '#1cc88a'
            ],
            hoverBackgroundColor: [
                '#2e59d9',
                '#17a673'
            ],
            hoverBorderColor: 'rgba(234, 236, 244, 1)',
        }]
    };
    // If the chart already exists, update it
    if (myChart2) {
        myChart2.data = chartData;
        myChart2.update();
    } else {
        // Create the chart if it doesn't exist
        myChart2 = new Chart(ctx2, {
            type: 'pie',
            data: chartData
        });
    }
}, (error) => {
    console.error(error);
});


