// Test redirect functionality
const API_BASE = 'http://localhost:3000';

async function testRedirect() {
  console.log('🔗 Testing redirect functionality...');
  
  try {
    // First, create a short link
    console.log('\n1. Creating a short link...');
    const createResponse = await fetch(`${API_BASE}/api/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        target: 'https://www.google.com'
      })
    });

    console.log('📡 Create link status:', createResponse.status);
    const createData = await createResponse.json();
    console.log('📡 Create link response:', createData);

    if (createResponse.ok && createData.data && createData.data.id) {
      const linkId = createData.data.id;
      console.log('✅ Link created with ID:', linkId);

      // Test the redirect
      console.log('\n2. Testing redirect...');
      const redirectResponse = await fetch(`${API_BASE}/${linkId}`, {
        method: 'GET',
        redirect: 'manual' // Don't follow redirects automatically
      });

      console.log('📡 Redirect status:', redirectResponse.status);
      console.log('📡 Redirect headers:', Object.fromEntries(redirectResponse.headers.entries()));

      if (redirectResponse.status === 302) {
        const location = redirectResponse.headers.get('location');
        console.log('✅ Redirect working! Location:', location);
        
        if (location === 'https://www.google.com') {
          console.log('✅ Redirect target is correct!');
        } else {
          console.log('❌ Redirect target is incorrect');
        }
      } else {
        console.log('❌ Expected 302 redirect, got:', redirectResponse.status);
        
        // Check if it's returning JSON instead
        try {
          const text = await redirectResponse.text();
          console.log('📡 Response body:', text);
        } catch (e) {
          console.log('Could not read response body');
        }
      }
    } else {
      console.log('❌ Failed to create link');
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testRedirect();
