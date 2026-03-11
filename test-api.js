import https from 'https';

https.get('https://ghibliapi.vercel.app/people', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        if (res.statusCode === 200) {
            try {
                const parsed = JSON.parse(data);
                console.log('Data type:', Array.isArray(parsed) ? 'Array' : typeof parsed);
                console.log('Sample data length:', parsed.length);
                console.log('Sample item 0:', JSON.stringify(parsed[0], null, 2));
            } catch (e) {
                console.log('failed to parse json', e);
            }
        } else {
            console.log('Response:', data.substring(0, 500));
        }
    });
}).on('error', (err) => {
    console.log('Error:', err.message);
});
