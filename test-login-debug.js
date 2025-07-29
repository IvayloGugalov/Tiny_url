// Debug login to check userId in token
const API_BASE = 'http://localhost:3000';

async function testLoginDebug() {
  console.log('🔍 Debugging login userId...');
  
  try {
    // 1. Register a new user
    const uniqueEmail = `debug${Date.now()}@example.com`;
    console.log(`\n1. Registering user: ${uniqueEmail}...`);
    
    const registerResponse = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: uniqueEmail,
        name: 'Debug User'
      })
    });

    console.log('📡 Register status:', registerResponse.status);
    const registerData = await registerResponse.json();
    console.log('📡 Register response:', JSON.stringify(registerData, null, 2));

    if (registerResponse.ok && registerData.data && registerData.data.user) {
      const expectedUserId = registerData.data.user.id;
      console.log(`✅ User registered with ID: ${expectedUserId}`);

      // 2. Login with the same user
      console.log(`\n2. Logging in with: ${uniqueEmail}...`);
      
      const loginResponse = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: uniqueEmail,
          password: 'any-password'
        })
      });

      console.log('📡 Login status:', loginResponse.status);
      const loginData = await loginResponse.json();
      console.log('📡 Login response:', JSON.stringify(loginData, null, 2));

      if (loginResponse.ok && loginData.token) {
        // Decode the JWT token to check the userId
        const tokenParts = loginData.token.split('.');
        if (tokenParts.length === 3) {
          try {
            const payload = JSON.parse(atob(tokenParts[1]));
            console.log('🔍 Token payload:', JSON.stringify(payload, null, 2));
            
            if (payload.userId === expectedUserId) {
              console.log('✅ Token contains correct userId!');
            } else {
              console.log(`❌ Token userId mismatch! Expected: ${expectedUserId}, Got: ${payload.userId}`);
            }
          } catch (e) {
            console.log('❌ Failed to decode token:', e.message);
          }
        }
      } else {
        console.log('❌ Login failed');
      }
    } else {
      console.log('❌ Registration failed');
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testLoginDebug();
