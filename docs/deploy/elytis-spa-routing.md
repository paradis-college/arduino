# Elytis SPA Routing Configuration

This document describes how to configure Apache for proper Single Page Application (SPA) routing on Elytis production and other Apache-based hosting environments.

## Problem Overview

When deploying a React SPA with client-side routing (React Router), direct access to routes or page refreshes can fail with 404 or 500 errors. This happens because:

1. The browser requests `/en` or `/ro` or deep routes like `/en/paths/arduino-basics`
2. Apache tries to find these as actual files/directories on the server
3. Since they don't exist, Apache returns an error
4. The React Router never gets a chance to handle the route

## Solution: Apache .htaccess Rewrite Rules

The `.htaccess` file included in this project configures Apache to:
- Serve actual files and directories normally (CSS, JS, images, etc.)
- Rewrite all other requests to `index.html`
- Let React Router handle the client-side routing

## Installation

### Where to Place .htaccess

The `.htaccess` file is located at:
```
apps/web/public/.htaccess
```

When you build the application with `npm run build` (from the `apps/web` directory), Vite will copy all files from the `public/` directory to the build output directory (`dist/`), including the `.htaccess` file.

**Deployment steps:**

1. Build the application:
   ```bash
   cd apps/web
   npm run build
   ```

2. Upload the contents of `apps/web/dist/` to your Apache web server's document root (e.g., `/var/www/html/` or `/home/yourdomain/public_html/`)

3. Verify that `.htaccess` is in the root directory alongside `index.html`

### Subdirectory Deployment

If you're deploying the application to a subdirectory (e.g., `https://example.com/arduino/` instead of `https://example.com/`), you need to adjust the configuration:

1. **Update .htaccess:**
   
   In `apps/web/public/.htaccess`, uncomment and modify the `RewriteBase` line:
   
   ```apache
   # Change from:
   # RewriteBase /
   
   # To (example for /arduino/ subdirectory):
   RewriteBase /arduino/
   ```

2. **Update Vite configuration:**
   
   In `apps/web/vite.config.ts`, set the `base` option:
   
   ```typescript
   export default defineConfig({
     base: '/arduino/',  // Add this line
     // ... other config
   });
   ```

3. **Update BrowserRouter:**
   
   In `apps/web/src/App.tsx`, add the `basename` prop to `BrowserRouter`:
   
   ```tsx
   <BrowserRouter basename="/arduino">
     {/* routes */}
   </BrowserRouter>
   ```

## Testing

After deployment, verify that SPA routing works correctly:

### Test 1: Language Routes
Open these URLs directly in a fresh browser tab (not by clicking links):

- `https://yourdomain.com/en` - Should load the English home page
- `https://yourdomain.com/ro` - Should load the Romanian home page

**Expected:** The SPA loads correctly with the appropriate language.

**If it fails:** Check if `.htaccess` is in the correct location and Apache has `mod_rewrite` enabled.

### Test 2: Deep Links - Paths
Navigate to or directly open:

- `https://yourdomain.com/en/paths`
- `https://yourdomain.com/ro/paths`
- `https://yourdomain.com/en/paths/arduino-basics` (or any valid path slug)

**Expected:** The pages load correctly.

### Test 3: Deep Links - Lessons
Navigate to a lesson page, then refresh the browser:

1. Go to the home page
2. Navigate through the UI to a lesson (e.g., `/en/lessons/p1-c1-l1`)
3. Press F5 or Ctrl+R to refresh the page

**Expected:** The lesson page reloads successfully without errors.

### Test 4: Page Refresh
On any page:
1. Navigate to different pages using the UI
2. Refresh the browser on each page
3. Use the back/forward buttons

**Expected:** All pages load correctly without 404 or 500 errors.

## Troubleshooting

### 500 Internal Server Error

**Cause:** Apache may not have the required modules enabled.

**Solution:** Ensure these Apache modules are enabled:
```bash
sudo a2enmod rewrite
sudo a2enmod deflate
sudo a2enmod expires
sudo a2enmod mime
sudo systemctl restart apache2
```

**Note:** The deflate, expires, and mime modules are optional for performance optimization. Only `mod_rewrite` is strictly required for routing.

### Still Getting 404 Errors

**Cause 1:** `.htaccess` files may be disabled in Apache configuration.

**Solution:** Check that `AllowOverride` is set to `All` (or at least includes `FileInfo`) in your Apache virtual host configuration:

```apache
<Directory /var/www/html>
    AllowOverride All
</Directory>
```

**Cause 2:** `.htaccess` file is not present in the deployment.

**Solution:** Verify the file exists in the document root alongside `index.html`.

### Routes Work Locally but Not on Server

**Cause:** Local development uses Vite's dev server which handles SPA routing automatically. The production server (Apache) needs explicit configuration.

**Solution:** Ensure `.htaccess` is deployed and `mod_rewrite` is enabled on the server.

### Assets (CSS/JS) Not Loading

**Cause:** If deployed to a subdirectory, asset paths may be incorrect.

**Solution:** Follow the "Subdirectory Deployment" instructions above to configure the base path correctly.

## How It Works

The `.htaccess` file uses Apache's mod_rewrite module with these rules:

1. **Check for real files:** `RewriteCond %{REQUEST_FILENAME} -f`
   - If the request is for an actual file (CSS, JS, image), serve it normally

2. **Check for real directories:** `RewriteCond %{REQUEST_FILENAME} -d`
   - If the request is for an actual directory, serve it normally

3. **Rewrite everything else:** `RewriteRule ^ index.html [L]`
   - All other requests get rewritten to `index.html`
   - React Router then handles the routing on the client side

This approach ensures:
- Static assets are served correctly
- All SPA routes load the main application
- No infinite redirect loops
- Clean URLs without hash fragments

## Additional Optimizations

The `.htaccess` file also includes optional configurations for:

- **MIME Types:** Ensures correct content types for modern file formats
- **Compression:** Enables gzip compression for better performance
- **Caching:** Sets appropriate cache headers for static assets

These are safe to keep enabled and will improve performance, but can be removed if they cause issues with your specific Apache configuration.

## Support

If you encounter issues not covered in this guide:

1. Check Apache error logs: `tail -f /var/log/apache2/error.log`
2. Verify mod_rewrite is enabled: `apache2ctl -M | grep rewrite`
3. Test .htaccess syntax: `apachectl configtest`

## References

- [Apache mod_rewrite documentation](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)
- [React Router documentation](https://reactrouter.com/)
- [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)
