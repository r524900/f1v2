document.addEventListener('DOMContentLoaded', () => {
    fetch('./standings.json')  // Correct path since it's in the same directory
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.querySelector('#standings-table tbody');
            data.forEach(driver => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${driver.rank}</td>
                    <td>${driver.driver}</td>
                    <td>${driver.team}</td>
                    <td>${driver.wins}</td>
                    <td>${driver.points}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Fetching error:', error));
});