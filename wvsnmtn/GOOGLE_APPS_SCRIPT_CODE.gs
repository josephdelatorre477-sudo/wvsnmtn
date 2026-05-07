// WVS & MTN - Google Apps Script for Order Tracking
// This script integrates with your website to track orders in Google Sheets
// Deploy as a web app and use the URL to send order data from your site

// SETUP: 
// 1. Create a new Google Sheet
// 2. Open Apps Script (Extensions > Apps Script)
// 3. Copy this code into the script editor
// 4. Deploy as web app (Deploy > New Deployment > Web app)
// 5. Get the deployment URL and add it to your site

const SHEET_NAME = "Orders";
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE"; // Replace with your Google Sheet ID

// Initialize spreadsheet
function initializeSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Order ID",
      "Date",
      "Customer Name",
      "Email",
      "Phone",
      "Items",
      "Total Price",
      "Status",
      "Timestamp"
    ]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#e8a020");
  }
}

// Handle POST requests from your website
function doPost(e) {
  try {
    initializeSheet();
    
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    // Extract order data
    const orderId = data.orderId || "ORD-" + Date.now();
    const date = new Date().toLocaleDateString("en-PH");
    const customerName = data.customerName || "Unknown";
    const email = data.email || "";
    const phone = data.phone || "";
    const items = data.items || [];
    const totalPrice = data.totalPrice || 0;
    const status = data.status || "Pending";
    const timestamp = new Date().toLocaleString("en-PH");
    
    // Format items list
    const itemsList = items.map(item => 
      `${item.name} (Qty: ${item.qty}) - ₱${item.price}`
    ).join(", ");
    
    // Append to sheet
    sheet.appendRow([
      orderId,
      date,
      customerName,
      email,
      phone,
      itemsList,
      `₱${totalPrice.toLocaleString()}`,
      status,
      timestamp
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      orderId: orderId,
      message: "Order recorded successfully"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  initializeSheet();
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "Google Apps Script is running. Use POST to submit orders."
  })).setMimeType(ContentService.MimeType.JSON);
}

// Function to log orders from localStorage (call this from your checkout page)
// Usage: logOrderToSheets({ customerName, email, phone, items, totalPrice })
function logOrderToSheets(orderData) {
  const scriptUrl = "YOUR_SCRIPT_DEPLOYMENT_URL"; // Replace with your deployment URL
  
  if (!scriptUrl.includes("YOUR_SCRIPT")) {
    const payload = JSON.stringify({
      orderId: "ORD-" + Date.now(),
      customerName: orderData.customerName || "",
      email: orderData.email || "",
      phone: orderData.phone || "",
      items: orderData.items || [],
      totalPrice: orderData.totalPrice || 0,
      status: "Pending"
    });
    
    const options = {
      method: 'post',
      payload: payload,
      muteHttpExceptions: true
    };
    
    UrlFetchApp.fetch(scriptUrl, options);
  }
}

// Function to check order status
function checkOrderStatus(orderId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === orderId) {
      return {
        found: true,
        status: data[i][7],
        date: data[i][1],
        totalPrice: data[i][6]
      };
    }
  }
  
  return { found: false };
}

// Function to update order status
function updateOrderStatus(orderId, newStatus) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === orderId) {
      sheet.getRange(i + 1, 8).setValue(newStatus);
      return { success: true, message: `Order ${orderId} status updated to ${newStatus}` };
    }
  }
  
  return { success: false, message: `Order ${orderId} not found` };
}

// Function to get all pending orders
function getPendingOrders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  const pending = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][7] === "Pending") {
      pending.push({
        orderId: data[i][0],
        date: data[i][1],
        customerName: data[i][2],
        totalPrice: data[i][6]
      });
    }
  }
  
  return pending;
}

// Function to export orders as CSV
function exportOrdersAsCSV() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  let csv = "";
  for (let i = 0; i < data.length; i++) {
    csv += data[i].map(cell => `"${cell}"`).join(",") + "\n";
  }
  
  return csv;
}

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Google Sheet Setup:
 *    - Go to sheets.google.com
 *    - Create a new spreadsheet
 *    - Get your SPREADSHEET_ID from the URL
 *    - Replace "YOUR_SPREADSHEET_ID_HERE" with your actual ID
 * 
 * 2. Deploy as Web App:
 *    - In Apps Script, click "Deploy" > "New Deployment"
 *    - Select "Web app" as deployment type
 *    - Set "Execute as" to your account
 *    - Set "Who has access" to "Anyone"
 *    - Click "Deploy"
 *    - Copy the deployment URL
 * 
 * 3. Add to Your Website:
 *    - In checkout.html or cart.html, add the deployment URL
 *    - Call the function when order is submitted:
 * 
 *    fetch('YOUR_SCRIPT_DEPLOYMENT_URL', {
 *      method: 'POST',
 *      body: JSON.stringify({
 *        customerName: "John Doe",
 *        email: "john@example.com",
 *        phone: "09XX XXX XXXX",
 *        items: cartItems,
 *        totalPrice: total,
 *        status: "Pending"
 *      })
 *    });
 * 
 * 4. Check Orders:
 *    - Your Google Sheet will automatically update with each order
 *    - View orders in real-time at your Google Sheet
 */
