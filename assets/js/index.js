'use strict';

/*--------------------------------------------*/
/*User and Subscriber                         */
/*--------------------------------------------*/

class User {
    #id;
    #name;
    #userName;
    #email;

    constructor(id, name, userName, email) {
        this.#id = id;
        this.#name = name;
        this.#userName = userName;
        this.#email = email;
    }

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getUserName() {
        return this.#userName;
    }

    getEmail() {
        return this.#email;
    }

    getInfo() {
        return `ID: ${this.#id}\nName: ${this.#name}\nUsername: ${this.#userName}\nEmail: ${this.#email}`;
    }
}

class Subscriber extends User {
    #pages;
    #groups;
    #canMonetize;

    constructor(id, name, userName, email, pages, groups, canMonetize) {
        super(id, name, userName, email);
        this.#pages = pages;
        this.#groups = groups;
        this.#canMonetize = canMonetize;
    }

    getPages() {
        return this.#pages;
    }

    getGroups() {
        return this.#groups;
    }

    getCanMonetize() {
        return this.#canMonetize;
    }

    getInfo() {
        return `Subscriber: \n${super.getInfo()}\nPages: ${this.#pages.join(", ")}\nGroups: ${this.#groups.join(", ")}\nCan Monetize: ${this.#canMonetize}`;
    }
}

const subscriber = new Subscriber(
    222222,
    "John Smith",
    "JohnSmith888",
    "John@example.com",
    ["Page1", "Page2"],
    ["Group1", "Group2"],
    true
);

/*--------------------------------------------*/
/*Modal                                       */
/*--------------------------------------------*/

const profileImage = document.querySelector('.profile-image');
const modal = document.querySelector('.infoModal');
const modalContent = document.querySelector('.modalContent');

profileImage.addEventListener('click', () => {
    modalContent.textContent = subscriber.getInfo();
    modal.style.display = 'flex'; // Display modal
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

/*--------------------------------------------*/
/* File name display                          */
/*--------------------------------------------*/
const imageUpload = document.querySelector('.image-upload');
const fileName = document.querySelector('.file-name');

function fileNameDisplay(imageUpload) {
    const file = imageUpload.files[0];

    if (file) {
        fileName.innerText = file.name; 
    } else {
        fileName.innerText = 'No file chosen'; 
    }
}

imageUpload.addEventListener('change', function() {
    fileNameDisplay(imageUpload);
});

/*--------------------------------------------*/
/*Post                                        */
/*--------------------------------------------*/

const postBtn = document.querySelector('.post-button');
const postsSection = document.querySelector('.posts-section');
const errorMessage = document.querySelector('.error-message');
const textInput = document.querySelector('.message');

const user = {
    profilePic: 'assets/img/profile image.png', 
    fullName: 'Duan Wang'
};

function formatDate(date) {
    const options = { 
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options); 
}

function createPost(textInput, imageUpload) {
    const postText = textInput.value;
    const imageFile = imageUpload.files[0];
    
    if (!postText && !imageFile) {
        errorMessage.innerText = 'Please write something or upload an image!';
        return;
    } else {
        errorMessage.innerText = '';
    }

    const post = document.createElement('div');
    post.classList.add('post-display');

    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');
    postHeader.innerHTML = `
        <div class="image-div">
        <img class="profile-image" src="${user.profilePic}" alt="Profile Pic">
        <p class="name">${user.fullName}</p>
        </div>
        <div class="date-box">
        <p class="date">${formatDate(new Date())}</p>
        </div>
    `;
    post.appendChild(postHeader);

    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    if (postText) {
        postContent.textContent = postText;
    }
    if (imageFile) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(imageFile);
        postContent.appendChild(img);
    }
    post.appendChild(postContent);

    postsSection.prepend(post);
}

postBtn.addEventListener('click', function() {
    createPost(textInput, imageUpload);
    
    textInput.value = '';
    imageUpload.value = '';
    fileNameDisplay(imageUpload);
});