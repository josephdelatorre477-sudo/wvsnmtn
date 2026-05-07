# WVS & MTN Admin Panel Guide

## 🎯 QUICK START

**Login Info:**
- Username: `admin`
- Password: `wvsmtn2025`

---

## 📍 WHAT EACH SECTION DOES

### 1️⃣ **🎬 CAROUSEL** (Homepage Banner)
**Where it appears:** Top of your homepage - rotating video/image banner

**What it does:** 
- Upload videos (MP4, WebM) OR images (JPG, PNG) that customers see first
- Add titles and descriptions to each slide
- Videos autoplay and loop automatically

**How to use:**
1. Click "Carousel" in the admin sidebar
2. Click the upload box and choose a VIDEO or IMAGE file
3. (Optional) Add a title like "Summer Collection"
4. (Optional) Add a description
5. Click "✓ Add to Carousel"
6. Videos/images appear on your homepage banner!

**Best practices:**
- Recommended size: 1200×600px
- Mix videos and images for engagement
- Keep descriptions short (1-2 sentences)
- Videos should be under 50MB

---

### 2️⃣ **⭐ FEATURED PRODUCTS** (Homepage Featured Section)
**Where it appears:** Below the carousel banner on your homepage

**What it does:**
- Choose your best 4-6 products to highlight
- These products appear in a special section on the homepage
- Customers can click "Add to Cart" directly

**How to use:**
1. Click "Featured" in the admin sidebar
2. Choose a product from the dropdown
3. Click "Add to Featured"
4. The product appears below
5. To remove: Click "Remove"

**Best practices:**
- Add 4-6 of your best sellers
- Include new products to promote
- Mix different categories

---

### 3️⃣ **🛍 SHOP PAGE** (Products Page)
**Where it appears:** The shop/products page (products.html)

**What it does:**
- Control which products show in your shop
- Usually you want ALL products to show
- Only use this if you have products not ready for sale yet

**How to use:**
1. Click "Shop" in the admin sidebar
2. Select a product from the dropdown
3. Click "Add to Shop"
4. Products appear on your shop page

**Note:** Most of the time, you don't need this. Just add products and they'll appear in the shop automatically.

---

### 4️⃣ **📦 PRODUCTS MANAGEMENT**
**Where it appears:** Everywhere products are listed (homepage featured, shop page, etc.)

**What it does:**
- Add new products to your store
- Edit product details (name, price, description)
- Upload product images
- Delete products

**How to add a product:**
1. Click "Add Product" in sidebar
2. Upload a product photo (800×800px recommended)
3. Fill in:
   - Product Name (required)
   - Price in ₱ (required)
   - Category (required): Surf, Bags, Apparel, or Outdoor
   - Stock Status: Available or Sold Out
   - Description (optional)
4. Click "✓ Save & Add Product"

**How to edit a product:**
1. Click "Products" in sidebar
2. Find your product and click "Edit"
3. Change the image or details
4. Click "✓ Save Changes"

---

### 5️⃣ **✨ HIGHLIGHTS**
**Where it appears:** Lifestyle photos section on your website

**What it does:**
- Upload lifestyle/brand photos
- Show off your brand personality

**How to use:**
1. Click "Highlights" in sidebar
2. Click the "+" box to add photos
3. Upload multiple photos at once
4. They appear in your brand highlights section

---

### 6️⃣ **🎯 SHOP PROFILE**
**Where it appears:** Your store information section

**What it does:**
- Update your brand cover image
- Set your shop name and avatar
- Add address and contact info

**How to use:**
1. Click "Shop Profile" in sidebar
2. Upload a cover photo (banner image)
3. Upload an avatar (profile picture)
4. Fill in shop name, address, phone
5. Click "💾 Save Profile"

---

### 7️⃣ **📲 ORDERS**
**Where it appears:** Admin dashboard

**What it does:**
- View orders/checkout forms submitted by customers
- See what customers added to their cart

---

## 🎨 COLOR-CODED SECTIONS

When you scroll through the admin panels, you'll see colored boxes:
- 🟨 **Gold** = Carousel (banner/hero section)
- 🟩 **Green** = Featured Products (featured section)
- 🟪 **Purple** = Shop Display (shop page products)

These colors help you quickly understand WHERE each section appears on your website.

---

## 💾 HOW DATA IS SAVED

All data is saved to your browser's localStorage:
- **Carousel videos/images:** `wvs_carousel`
- **Featured products:** `wvs_featured`
- **Shop products:** `wvs_shop`
- **All products:** `wvs_products`
- **Highlights:** `wvs_highlights`

This means:
✅ Data persists even after closing your browser
✅ All devices that visit your site share the same data
❌ If you clear browser data, everything is deleted

---

## ⚠️ IMPORTANT NOTES

### File Sizes
- **Videos:** Max 50MB (browser localStorage limit)
- **Images:** No strict limit, but keep under 5MB each
- **Total storage:** ~5-10MB for everything combined

### Browser Compatibility
- Works in Chrome, Firefox, Safari, Edge
- Mobile browsers supported too!

### Backup Your Data
- Export your product data regularly (write it down)
- localStorage can be cleared by accident

---

## 🆘 TROUBLESHOOTING

**Q: Videos aren't playing on homepage?**
- Make sure you uploaded an MP4 or WebM file
- Check file size (max 50MB)
- Try a smaller/shorter video

**Q: Images aren't showing?**
- Supported formats: JPG, PNG, WEBP
- Recommended: 800×800px for products, 1200×600px for carousel
- Check file size

**Q: Product won't save?**
- Fill in: Name, Price, and Category (all required)
- Upload an image
- Check browser console for errors

**Q: Changes aren't showing on homepage?**
- Refresh the homepage (F5 or Ctrl+R)
- Clear browser cache
- Try a different browser

---

## 📞 DASHBOARD STATS

The dashboard shows:
- 📦 Total Products added
- ✨ Highlight photos uploaded
- 📂 4 Categories (Surf, Bags, Apparel, Outdoor)

Plus quick buttons to:
- ➕ Add new product
- ✨ Upload highlight photo

---

**Happy selling! 🚀**
