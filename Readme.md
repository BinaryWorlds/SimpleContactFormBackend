# Simple contact form backend with recaptcha v3 verification

1. Create the project in Firebase Console
   `https://console.firebase.google.com`

2. Install the Firebase CLI

   ```
   npm install -g firebase-tools
   ```

3. Sign in

   ```
   firebase login
   ```

4. Create functions:

   ```
   firebase init functions
   ```

   1. Are you ready to proceed? (Y/n) Y
   2. Use an existing project
   3. Select your project
   4. JavaScript
   5. Do you want to use ESLint to catch probable bugs and enforce style? (y/N) Y
   6. Do you want to install dependencies with npm now? (Y/n) Y

5. Copy from this repo 'functions' folder to your project folder.

6. Go to this location:

   ```
   cd .\functions\
   ```

7. Install depedencies:

   ```
   npm i
   ```

8. Edit whitelist origin in `functions/startup.config.js`
9. Edit in `routes/Send.js`:

- reCaptchaSecret,
- from,
- to,
- pass(to your gmail account)

10. Run locally:
    ```
    firebase serve
    ```
11. Copy from terminal your endpoint link (eq. http://localhost:3000/api/app)
12. Send payload with POST method(eq. via Postman) on http://localhost:3000/api/app/send

    Your payload must looks like this:

    ```
        {
            "name": "General Kenobi",
            "email": "test@example.com",
            "message": "Hello there!",
            "token": "response from recaptcha script"
        }
    ```

Headers: `Content-Type` : `application/json`
