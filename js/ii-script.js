function checkGrantStatus(grantType) {
    let grantCode = grantType === 'dev' ? document.getElementById('dev-code').value : document.getElementById('com-code').value;
    if (grantCode.length >= 7) {
        fetchAirtableStatus(grantType, grantCode);
    } else {
        alert('Please enter a valid grant code');
    }
}

function fetchAirtableStatus(grantType, grantCode) {
    const baseId = '<YOUR_BASE_ID>';
    const apiKey = '<YOUR_API_KEY>';
    const tableName = grantType === 'dev' ? 'Dev Grant' : 'Community Grant';

    fetch(`https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula={Grant Code}='${grantCode}'`, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.records.length > 0) {
            const status = data.records[0].fields.Status;
            document.getElementById('grant-status').innerText = `Grant Status: ${status}`;
        } else {
            document.getElementById('grant-status').innerText = 'No grant found with this code';
        }
    })
    .catch(error => console.error('Error fetching grant status:', error));
}
