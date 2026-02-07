import axios from 'axios';

async function testRegister() {
    const randomId = Math.floor(Math.random() * 10000);
    const userData = {
        name: `Test User ${randomId}`,
        email: `test${randomId}@example.com`,
        password: 'password123',
        startingCity: 'Dubai'
    };

    console.log('Attempting to register:', userData);
    try {
        const res = await axios.post('https://manara.onrender.com/api/user/register', userData);
        console.log('✅ Registration Successful:', res.data);
    } catch (err) {
        if (err.response) {
            console.error('❌ Registration Failed:', err.response.data);
            console.error('Create Profile Status:', err.response.status);
        } else {
            console.error('❌ Network/Setup Error:', err.message);
        }
    }
}

testRegister();
