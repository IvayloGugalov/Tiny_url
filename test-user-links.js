// Test user-specific links functionality
const API_BASE = 'http://localhost:3000'

async function testUserLinks() {
  console.log('🔗 Testing user-specific links functionality...')

  try {
    // 1. Test anonymous link creation
    console.log('\n1. Testing anonymous link creation...')
    const anonResponse = await fetch(`${API_BASE}/api/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: 'https://anonymous-link.com',
      }),
    })

    console.log('📡 Anonymous link status:', anonResponse.status)
    const anonData = await anonResponse.json()
    console.log('📡 Anonymous link response:', anonData)

    // 2. Test user registration
    console.log('\n2. Testing user registration...')
    const registerResponse = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'Test User',
      }),
    })

    console.log('📡 Register status:', registerResponse.status)
    const registerData = await registerResponse.json()
    console.log('📡 Register response:', registerData)

    // 3. Test user login
    console.log('\n3. Testing user login...')
    const loginResponse = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'any-password',
      }),
    })

    console.log('📡 Login status:', loginResponse.status)
    const loginData = await loginResponse.json()
    console.log('📡 Login response:', loginData)

    if (loginResponse.ok && loginData.token) {
      const token = loginData.token
      console.log('✅ User authenticated with token')

      // 4. Test authenticated link creation
      console.log('\n4. Testing authenticated link creation...')
      const authLinkResponse = await fetch(`${API_BASE}/api/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          target: 'https://authenticated-link.com',
        }),
      })

      console.log('📡 Auth link status:', authLinkResponse.status)
      const authLinkData = await authLinkResponse.json()
      console.log('📡 Auth link response:', authLinkData)

      // 5. Test analytics endpoint (should only show user's links)
      console.log('\n5. Testing analytics endpoint...')
      const analyticsResponse = await fetch(`${API_BASE}/api/links`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log('📡 Analytics status:', analyticsResponse.status)
      const analyticsData = await analyticsResponse.json()
      console.log('📡 Analytics response:', analyticsData)

      if (analyticsResponse.ok && analyticsData.data) {
        console.log('📊 Number of user links:', analyticsData.data.length)
        analyticsData.data.forEach((link, index) => {
          console.log(
            `   ${index + 1}. ${link.id} -> ${link.target} (${link.clicks} clicks)`,
          )
        })

        // Check if only authenticated user's links are returned
        const hasAuthenticatedLink = analyticsData.data.some(
          (link) => link.target === 'https://authenticated-link.com',
        )
        const hasAnonymousLink = analyticsData.data.some(
          (link) => link.target === 'https://anonymous-link.com',
        )

        if (hasAuthenticatedLink && !hasAnonymousLink) {
          console.log('✅ Analytics correctly shows only user-specific links!')
        } else if (hasAuthenticatedLink && hasAnonymousLink) {
          console.log(
            '❌ Analytics shows both user and anonymous links (should only show user links)',
          )
        } else {
          console.log('⚠️  Analytics results unclear')
        }
      }

      // 6. Test analytics without authentication (should fail)
      console.log('\n6. Testing analytics without authentication...')
      const noAuthResponse = await fetch(`${API_BASE}/api/links`, {
        method: 'GET',
      })

      console.log('📡 No auth status:', noAuthResponse.status)
      if (noAuthResponse.status === 401) {
        console.log('✅ Analytics correctly requires authentication!')
      } else {
        console.log('❌ Analytics should require authentication')
      }
    } else {
      console.log('❌ Failed to authenticate user')
    }
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

testUserLinks()
