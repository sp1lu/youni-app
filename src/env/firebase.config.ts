// export const firebaseConfig = {
//     apiKey: "AIzaSyDDT4O_-kO4uJHU-1UXcK3qjx8w7hokdFg",
//     authDomain: "youni-e00ec.firebaseapp.com",
//     projectId: "youni-e00ec",
//     storageBucket: "youni-e00ec.firebasestorage.app",
//     messagingSenderId: "607827351417",
//     appId: "1:607827351417:web:87237d074c2df4422f81a8"
// };

export const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};