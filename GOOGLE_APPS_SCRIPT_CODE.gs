// ===========================
// WVS & MTN — Google Apps Script
// Handles order submissions from checkout
// ===========================

const SHEET_NAME = 'Orders';  // Name of the sheet where orders will be stored
const OWNER_EMAIL = 'itcsclass2022@gmail.com';  // CHANGE THIS to the shop owner's email

function doPost(e) {
  try {
    // Parse the JSON data from the POST request
    const payload = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Status',
        'Customer Name',
        'Phone',
        'Email',
        'Address',
        'Payment Method',
        'Order Items',
        'Total Amount',
        'Notes'
      ]);
    }
    
    // Create timestamp
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Manila',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Prepare the order row data
    const orderRow = [
      timestamp,
      '🆕 New',
      payload.name || '',
      payload.phone || '',
      payload.email || '',
      payload.address || '',
      payload.paymentMethod || '',
      payload.orderItems || '',
      payload.total || '',
      payload.notes || ''
    ];
    
    // Append the order row to the sheet
    sheet.appendRow(orderRow);
    
    // Send email notification to shop owner
    sendOrderNotification(payload, timestamp);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'success', message: 'Order received!' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error for debugging
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendOrderNotification(orderData, timestamp) {
  try {
    Logger.log('📧 Attempting to send email...');
    Logger.log('📧 Recipient: ' + OWNER_EMAIL);
    
    // Prepare the email subject and body
    const subject = `🎉 New Order from WVS & MTN - ${orderData.name}`;
    
    const emailBody = `
New Order Received!

Timestamp: ${timestamp}
---

CUSTOMER DETAILS
Name: ${orderData.name}
Phone: ${orderData.phone}
Email: ${orderData.email}
Address: ${orderData.address}

ORDER DETAILS
Items:
${orderData.orderItems}

Total: ${orderData.total}
Payment Method: ${orderData.paymentMethod}

NOTES
${orderData.notes || 'None'}

---
View all orders: Open your Google Sheet to see complete details.
    `;
    
    // Send the email
    GmailApp.sendEmail(OWNER_EMAIL, subject, emailBody);
    
    Logger.log('✅ Email sent successfully to ' + OWNER_EMAIL);
  } catch (error) {
    Logger.log('❌ ERROR SENDING EMAIL: ' + error.message);
    Logger.log('❌ Full error: ' + error.toString());
  }
}

// Optional: Use this function to test the script locally
function simpleTest() {
  Logger.log('==== STARTING TEST ====');
  
  try {
    // Test 1: Check if sheet exists
    Logger.log('Test 1: Checking sheet...');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    Logger.log('✅ Sheet found: ' + sheet.getName());
    
    // Test 2: Add test headers
    Logger.log('Test 2: Adding headers...');
    sheet.appendRow(['Timestamp', 'Status', 'Customer Name', 'Phone', 'Email', 'Address', 'Payment Method', 'Order Items', 'Total Amount', 'Notes']);
    Logger.log('✅ Headers added');
    
    // Test 3: Add test row
    Logger.log('Test 3: Adding test row...');
    const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });
    sheet.appendRow([now, 'TEST', 'Test Customer', '09123456789', 'test@email.com', 'Test Address', 'GCash', 'Test Item x1', '₱100', 'Test note']);
    Logger.log('✅ Test row added at row ' + sheet.getLastRow());
    
    // Test 4: Send test email
    Logger.log('Test 4: Sending test email to ' + OWNER_EMAIL + '...');
    GmailApp.sendEmail(OWNER_EMAIL, 'Test Email from WVS & MTN', 'This is a test email from your Apps Script deployment. If you received this, everything is working!');
    Logger.log('✅ Test email sent');
    
    Logger.log('==== ✅✅✅ ALL TESTS PASSED! ✅✅✅ ====');
    Logger.log('Check: 1) Google Sheet for new row, 2) Gmail for test email');
    
  } catch (error) {
    Logger.log('==== ❌ TEST FAILED ====');
    Logger.log('Error message: ' + error.message);
    Logger.log('Full error: ' + error.toString());
  }
}
