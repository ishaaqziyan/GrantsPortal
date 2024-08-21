function checkGrantStatus(grantType) {
    let grantCode = grantType === 'dev' ? document.getElementById('dev-code').value : document.getElementById('com-code').value;
    if (grantCode.length >= 7) {
        fetchAirtableStatus(grantType, grantCode);
    } else {
        alert('Please enter a valid grant code');
    }
}

function fetchAirtableStatus(grantType, grantCode) {
    const baseId = 'appwmUMghaAYZpBp0'; // Your Base ID
    const apiKey = 'patyR0LGPWVrweMs5.ca614637b56fa889f328591f31da302657b7fb25d2b8f920524aee0812095935'; // Your API Key
    const tableName = grantType === 'dev' ? 'DEV GRANTS' : 'COM GRANTS';

    fetch(`https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula={Grant Code}='${grantCode}'`, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.records && data.records.length > 0) {
            const record = data.records[0].fields;
            const status = record.Status;
            const grantName = record['Grant Name']; // Assuming 'Grant Name' is the field name
            document.getElementById('grant-status').innerText = `Grant Name: ${grantName} \n Grant Status: ${status}`;
        } else {
            document.getElementById('grant-status').innerText = 'No grant found with this code';
        }
    })
    .catch(error => {
        document.getElementById('grant-status').innerText = 'Error fetching grant status';
        console.error('Error fetching grant status:', error);
    });
}
