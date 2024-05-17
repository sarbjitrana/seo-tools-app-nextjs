// pages/api/lighthouse.js
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ success: false, message: 'URL is required' });
        }

        try {

            const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
            const options = { logLevel: 'info', output: 'json', onlyCategories: ['performance'], port: chrome.port };
            const runnerResult = await lighthouse(url, options);

            // `.report` is the HTML report as a string
            const report = runnerResult.report;
            console.log('report', report);
            console.log('runnerResult', runnerResult);
            const stop = await chrome.kill();
            return res.status(200).json({ success: true, report });
        } catch (error) {
            console.error('Error running Lighthouse:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
}
