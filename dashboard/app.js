// Replace with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoNRfPQBhNgL30DwYjdAG9P74tnvltnCA",
    authDomain: "hacthon-app-9d59d.firebaseapp.com",
    projectId: "hacthon-app-9d59d",
    storageBucket: "hacthon-app-9d59d.appspot.com",
    messagingSenderId: "429728631655",
    appId: "1:429728631655:web:6dc7e588a3405f8a4c3dc2",
    measurementId: "G-FWK5RP3JTP"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const postsList = document.getElementById('posts-list');
const addPostBtn = document.getElementById('add-post-btn');

// Function to render blog posts
function renderPosts(posts) {
    postsList.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
        `;
        postsList.appendChild(postDiv);
    });
}

// Fetch and display posts from Firestore
function fetchPosts() {
    db.collection('posts').get()
        .then(snapshot => {
            const posts = snapshot.docs.map(doc => doc.data());
            renderPosts(posts);
        })
        .catch(error => console.error('Error fetching posts:', error));
}

// Fetch posts on page load
fetchPosts();

// Add event listener to "Add New Post" button
addPostBtn.addEventListener('click', () => {
    const title = prompt('Enter post title:');
    const content = prompt('Enter post content:');

    if (title && content) {
        db.collection('posts').add({
            title: title,
            content: content
        })
        .then(() => {
            console.log('Post added successfully');
            fetchPosts(); // Refresh posts after adding a new one
        })
        .catch(error => console.error('Error adding post:', error));
    } else {
        alert('Both title and content are required.');
    }
});
