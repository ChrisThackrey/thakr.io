// Test script for contact form API
const testContactForm = async () => {
  const testData = {
    name: "Test User",
    senderEmail: "test@example.com",
    subject: "Test Contact Form",
    message: "This is a test message to check if the contact form is working correctly.",
    inquiryType: "General Question",
    website: "" // honeypot field should be empty
  };

  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', result);
    
    if (response.ok && result.success) {
      console.log('✅ Contact form test passed!');
    } else {
      console.log('❌ Contact form test failed!');
    }
  } catch (error) {
    console.error('Error testing contact form:', error);
  }
};

console.log('Make sure the development server is running on http://localhost:3000');
console.log('Run: pnpm run dev');
console.log('Then run this test with: node test-contact-form.js');
