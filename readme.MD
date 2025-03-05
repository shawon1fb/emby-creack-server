### **Setup Nginx to Forward HTTPS (Port 443) to localhost:8080 on macOS**

Since `socat` is causing issues, **Nginx** is a better alternative for handling HTTPS. Follow these steps to set up Nginx as a **reverse proxy** for `https://mb3admin.com` → `http://localhost:8080`.

---

## **Step 1: Install Nginx**
If you haven't installed Nginx, install it using Homebrew:
```sh
brew install nginx
```

After installation, check if it works:
```sh
nginx -v
```
You should see something like `nginx version: 1.x.x`.

---

## **Step 2: Create a Self-Signed SSL Certificate**
Nginx requires an SSL certificate to serve HTTPS traffic.

Run the following commands:
```sh
sudo mkdir -p /etc/nginx/ssl
sudo openssl req -x509 -newkey rsa:2048 -keyout /etc/nginx/ssl/mb3admin.key \
    -out /etc/nginx/ssl/mb3admin.crt -days 365 -nodes \
    -subj "/C=US/ST=Local/L=Local/O=Local/CN=mb3admin.com"
```
- This generates a **self-signed certificate** (`mb3admin.crt`) and a **private key** (`mb3admin.key`).
- The `-days 365` flag makes it valid for 1 year.

---

## **Step 3: Configure Nginx to Proxy HTTPS to localhost:8080**
Edit the Nginx configuration file:
```sh
sudo nano /opt/homebrew/etc/nginx/nginx.conf
```

🔹 **Replace the contents of the file with the following:**
```nginx
events {
    worker_connections 1024;
}

http {
    server {
        listen 443 ssl;
        server_name mb3admin.com;

        ssl_certificate /etc/nginx/ssl/mb3admin.crt;
        ssl_certificate_key /etc/nginx/ssl/mb3admin.key;

        location / {
            proxy_pass http://127.0.0.1:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }

    server {
        listen 80;
        server_name mb3admin.com;
        return 301 https://$host$request_uri;
    }
}
```
🚀 **What this does:**
- Listens on **port 443** for `mb3admin.com` and serves HTTPS.
- Redirects **port 80 (HTTP) to HTTPS** automatically.
- Forwards HTTPS requests to **localhost:8080**.

💾 **Save and exit** (`CTRL + X`, then `Y`, then `Enter`).

---

## **Step 4: Restart Nginx**
To apply the changes, restart Nginx:
```sh
sudo nginx -s stop
sudo nginx
```

---

## **Step 5: Trust the SSL Certificate (macOS Security Fix)**
Since this is a **self-signed certificate**, macOS will treat it as **untrusted**. To fix this:

1. Open **Keychain Access** (`Cmd + Space`, search "Keychain Access").
2. Go to **System** → **Certificates**.
3. Drag & drop `/etc/nginx/ssl/mb3admin.crt` into the **Certificates** list.
4. Double-click the certificate and **set trust to "Always Trust"**.
5. Restart your browser.

---

## **Step 6: Test It! 🚀**
Now, open:
```
https://mb3admin.com
```
It should route traffic securely to **localhost:8080**. 🎉

---

## **Troubleshooting**
### **1. "mb3admin.com not found"**
Check if `/etc/hosts` is set up correctly:
```sh
sudo nano /etc/hosts
```
Make sure this line exists:
```
127.0.0.1 mb3admin.com
```
Save & flush DNS cache:
```sh
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

### **2. "Nginx: Port 443 is already in use"**
Check if another process is using port 443:
```sh
sudo lsof -i :443
```
If Nginx is already running, restart it:
```sh
sudo nginx -s reload
```

---

✅ **Now, your macOS machine serves `https://mb3admin.com` securely, forwarding requests to `localhost:8080`.** 🎉  
Let me know if you have any issues! 🚀