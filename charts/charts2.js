

/////////////

// Initialize the chart variable
let stayedProbabilityChart;
// Get the canvas element
const canvas3 = document.getElementById('myChart3');
const ctx3 = canvas3.getContext('2d');
let myChart3;
// Retrieve data from the database
onValue(resultRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);

    // Count the number of stayed and switched
    const won = Object.values(data)
        .filter(item => !item.didSwitch)
        .filter(item => item.carBehind === item.playerChoice).length;
    const lost = Object.values(data)
        .filter(item => !item.didSwitch)
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
    if (myChart3) {
        myChart3.data = chartData;
        myChart3.update();
    } else {
        // Create the chart if it doesn't exist
        myChart3 = new Chart(ctx3, {
            type: 'pie',
            data: chartData
        });
    }
}, (error) => {
    console.error(error);
});

