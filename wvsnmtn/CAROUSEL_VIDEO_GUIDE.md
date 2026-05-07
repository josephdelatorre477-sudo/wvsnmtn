# 🎬 CAROUSEL VIDEO/IMAGE SYSTEM - VISUAL GUIDE

## 🔄 HOW IT ALL CONNECTS

```
YOU (Admin) 
    ↓
Upload Video/Image to Admin Panel
    ↓
Admin Panel Saves to localStorage (wvs_carousel)
    ↓
Homepage Loads from localStorage
    ↓
Carousel Videos/Images Display on Homepage
    ↓
Customer Sees Your Content! 🎉
```

---

## 📱 ADMIN PANEL - CAROUSEL SECTION

### Upload Form

```
🎬 Homepage Carousel (BANNER)
📍 Where it appears: The rotating banner at top of your HOMEPAGE
💡 What this does: Upload videos OR images that rotate automatically

📸 Add Video or Image to Carousel
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📹 Upload Video or Image *
┌─────────────────────────────────────┐
│  🎬 Click to upload video or image  │
│  Video: MP4, WebM | Image: JPG, PNG │
└─────────────────────────────────────┘

Title for this slide (optional)
[Summer Collection]

Description (optional)
[Check out our latest summer gear]

[✓ Add to Carousel]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your Carousel Items
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[📹 Video — Summer Collection]
Added on 5/7/2026 10:30 AM     [Delete]

[📸 Image — New Arrivals]  
Added on 5/7/2026 9:15 AM      [Delete]
```

---

## 🏠 HOMEPAGE - CAROUSEL BANNER

```
┌──────────────────────────────────────────┐
│                 🎬 BANNER                │
│                                          │
│         [Rotating Video/Image]           │
│         with Title & Description         │
│                                          │
│  "Summer Collection"                    │
│  "Check out our latest summer gear"     │
│                                          │
│  [‹ Previous]              [Next ›]     │
│  [⏸] (Play/Pause button)                │
└──────────────────────────────────────────┘

⭐ FEATURED PRODUCTS
[Product 1] [Product 2] [Product 3] [Product 4]

🎒 CATEGORIES
[Surf] [Bags] [Apparel] [Outdoor]
```

---

## 🎯 ADMIN SIDEBAR - SIMPLIFIED

```
📊 Main Hub
  📈 Dashboard
  📦 Products
  ➕ Add Product

🎨 Customize Sections (Manage homepage sections)
  🎬 Carousel      ← 📹 NOW WITH VIDEO SUPPORT!
  ⭐ Featured
  🛍 Shop

🏪 Store Setup (Brand & visibility)
  ✨ Highlights
  🎯 Shop Profile

📋 Sales & Orders (Customer activity)
  📲 Orders
```

---

## 📝 SECTION DESCRIPTIONS

### 🎬 CAROUSEL
```
🟨 Gold Box (Carousel Section)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 WHERE: Top of homepage (banner)
📝 WHAT: Videos/images that rotate automatically
💡 HOW: Upload MP4, WebM videos or images
        Add titles and descriptions
        Videos autoplay with loop
```

### ⭐ FEATURED PRODUCTS
```
🟩 Green Box (Featured Section)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 WHERE: Below the carousel on homepage
📝 WHAT: Showcase your best 4-6 products
💡 HOW: Select products from dropdown
        Click "Add to Featured"
        Appears on homepage immediately
```

### 🛍 SHOP DISPLAY
```
🟪 Purple Box (Shop Page)
━━━━━━━━━━━━━━━━━━━━━━━━━
📍 WHERE: Shop/products page
📝 WHAT: Control which products show in shop
💡 HOW: Add products to shop list
        (Usually just add ALL products)
```

---

## 📊 DATA FLOW DIAGRAM

```
┌─────────────────────────────────┐
│   Admin Panel                   │
│  wvsmtn_admin_panel.html        │
│                                 │
│  Upload Functions:              │
│  • previewCarouselMedia()      │
│  • addCarouselItem()           │
│  • deleteCarouselItem()        │
│  • renderCarousel()            │
└──────────────┬──────────────────┘
               │ saves to
               ↓
        ┌──────────────┐
        │ localStorage │
        │ wvs_carousel │
        └──────────────┘
               │ reads from
               ↓
┌─────────────────────────────────┐
│   Homepage                      │
│   index.html                    │
│                                 │
│   loadCarousel()                │
│   → Displays videos/images      │
│   → Shows titles & descriptions │
│   → Autoplay videos             │
└─────────────────────────────────┘
```

---

## 🎬 VIDEO UPLOAD EXAMPLE

**Step 1: Select video**
```
📷 Click upload box
Select: "summer_promo.mp4" (2MB)
```

**Step 2: Preview**
```
Video preview shows: ✓
Placeholder hidden
Ready to upload
```

**Step 3: Add title & description**
```
Title: "Summer 2025 Collection"
Description: "New arrivals fresh from design team"
```

**Step 4: Save**
```
Click [✓ Add to Carousel]
Toast appears: "Added to carousel!"
Video stored in localStorage
```

**Step 5: Homepage updates**
```
Refresh homepage (or open new tab)
Banner shows: Video playing on loop
Title: "Summer 2025 Collection"
Description: "New arrivals fresh from design team"
```

---

## 🖼️ IMAGE UPLOAD EXAMPLE

**Same process, but:**
- Select JPG, PNG, or WEBP
- Recommended: 1200×600px
- Appears as image instead of video

---

## 🔧 TECHNICAL DETAILS

### New Data Structure
```javascript
{
  id: 1715000000000,           // Timestamp ID
  type: "video" or "image",    // Media type
  src: "data:video/mp4;...",   // Base64 encoded
  title: "Summer Collection",  // Optional
  desc: "New arrivals..."      // Optional
}
```

### JavaScript Functions

**In Admin Panel (wvsmtn_admin_panel.html):**
```javascript
previewCarouselMedia(input) {
  // Shows preview of video/image before upload
}

addCarouselItem() {
  // Uploads to localStorage with title & description
}

deleteCarouselItem(idx) {
  // Removes carousel item
}

renderCarousel() {
  // Displays list of all carousel items
}
```

**On Homepage (index.html):**
```javascript
loadCarousel() {
  // Loads carousel from localStorage
  // Creates video/image elements
  // Shows titles & descriptions
}
```

---

## ✅ TESTING CHECKLIST

- [ ] Log in to admin panel (admin / wvsmtn2025)
- [ ] Click Carousel in sidebar
- [ ] Upload a test video
- [ ] Add a title and description
- [ ] Click "✓ Add to Carousel"
- [ ] Go to homepage (index.html)
- [ ] See carousel video playing
- [ ] Verify title and description appear
- [ ] Try uploading an image
- [ ] Check homepage carousel shows both
- [ ] Test delete button in admin
- [ ] Verify it's removed from homepage

---

## 🎉 YOU'RE ALL SET!

Your admin panel now has:
✅ Video + Image carousel support
✅ Crystal clear descriptions
✅ Simplified, intuitive sidebar
✅ Direct homepage integration
✅ Easy-to-use forms

**Start uploading content now!**
