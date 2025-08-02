// Test user-specific links functionality (with fix)
const API_BASE = 'http://localhost:3000'

async function testUserLinksFixed() {
  console.log('🔗 Testing user-specific links functionality (fixed)...')

  try {
    // 1. Test anonymous link creation
    console.log('\n1. Testing anonymous link creation...')
    const anonResponse = await fetch(`${API_BASE}/api/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: 'https://anonymous-test.com',
      }),
    })

    console.log('📡 Anonymous link status:', anonResponse.status)
    const anonData = await anonResponse.json()
    console.log('📡 Anonymous link response:', anonData)

    // 2. Test user registration with unique email
    const uniqueEmail = `testuser${Date.now()}@example.com`
    console.log(`\n2. Testing user registration with email: ${uniqueEmail}...`)
    const registerResponse = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: uniqueEmail,
        name: 'Test User Fixed',
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
        email: uniqueEmail,
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
          target: 'https://user-specific-link.com',
        }),
      })

      console.log('📡 Auth link status:', authLinkResponse.status)
      const authLinkData = await authLinkResponse.json()
      console.log('📡 Auth link response:', authLinkData)

      // 5. Create another authenticated link
      console.log('\n5. Creating second authenticated link...')
      const authLink2Response = await fetch(`${API_BASE}/api/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          target: 'https://another-user-link.com',
        }),
      })

      console.log('📡 Auth link 2 status:', authLink2Response.status)
      const authLink2Data = await authLink2Response.json()
      console.log('📡 Auth link 2 response:', authLink2Data)

      // 6. Test analytics endpoint (should only show user's links)
      console.log('\n6. Testing analytics endpoint...')
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
        const hasUserLink1 = analyticsData.data.some(
          (link) => link.target === 'https://user-specific-link.com',
        )
        const hasUserLink2 = analyticsData.data.some(
          (link) => link.target === 'https://another-user-link.com',
        )
        const hasAnonymousLink = analyticsData.data.some(
          (link) => link.target === 'https://anonymous-test.com',
        )

        console.log('\n📋 Link analysis:')
        console.log(`   User link 1 found: ${hasUserLink1}`)
        console.log(`   User link 2 found: ${hasUserLink2}`)
        console.log(`   Anonymous link found: ${hasAnonymousLink}`)

        if (hasUserLink1 && hasUserLink2 && !hasAnonymousLink) {
          console.log('✅ Analytics correctly shows only user-specific links!')
        } else if (hasAnonymousLink) {
          console.log(
            '❌ Analytics shows anonymous links (should only show user links)',
          )
        } else {
          console.log('⚠️  Some user links missing from analytics')
        }
      }
    } else {
      console.log('❌ Failed to authenticate user')
    }
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

testUserLinksFixed()
