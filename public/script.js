const { execFile } = require('child_process');
const path = require('path');

module.exports = (req, res) => {
    const scraperPath = path.join(__dirname, 'scraper.py');
    execFile('python3', [scraperPath], (error, stdout, stderr) => {
        if (error) {
            res.status(500).json({ error: 'Error executing scraper' });
            return;
        }
        res.status(200).json(JSON.parse(stdout));
    });
};
