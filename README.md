# 📝 NoteUp
A note taking website built with MERN.

## 📦 Technologies

- `Vite`
- `Tailwind CSS`
- `Firebase`
- `MERN`

## ✨ Features

Here's what you can do with NoteUp:

- **User Authentication**: Users can securely sign-in and access notes using Firebase Authentication integrated with JWT (JSON Web Tokens).

- **CRUD Operations**: Users can create new notes, view existing notes, update/edit notes, and delete notes. Each note could have fields such as title, content, date, and tags.

- **Search Functionality**: Allow users to search for notes by keywords, titles, or tags to quickly find the information they need.

- **Pin/Unpin Notes**: Enables users to pin important notes for quick access and unpin them when no longer needed, ensuring easy retrieval of crucial information.

## 💭 Future Scope
- **Integration of OpenAI API:** To transform notes web app into an intelligent assistant that augments user's productivity and enhances their overall note-taking experience.

- **Enhanced Markdown Support:** This enhancement will offer features such as a visual editor for Markdown syntax, customizable themes, and real-time content preview.

    Stay tuned for updates on this exciting addition to our project!

## 🚦Running the project:

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/): Make sure to install Node.js, which includes npm (Node Package Manager).
- [MongoDB](https://www.mongodb.com/try/download/community): Set up a MongoDB database and obtain the connection URL.

## Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/bmukesh23/NoteUp.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd NoteUp
    ```

3. **Install Dependencies:**
    ```bash
    cd frontend
    npm install
    ```

    ```bash
    cd ../backend
    npm install
    ```

4. **Set Environment Variables:**
    1. Create a `.env` file in the root of the backend folder of the project.
    2. Add the following environment variables and replace the values with your own:

    ```env
    VITE_FB_API_KEY=
    VITE_FB_AUTH=
    VITE_FB_PROJECT=
    VITE_FB_STORAGE=
    VITE_FB_MESSAGING=
    VITE_FB_APP=
    VITE_FB_MEASUREMENT=
    VITE_BACKEND_URL=
    ```

    1. Create a `.env` file in the root of the backend folder of the project.
    2. Add the following environment variables and replace the values with your own:

    ```env
    PORT=
    ACCESS_TOKEN_SECRET=
    MONGODB_URI=
    ```

5. **Run the application:**
    ```bash
    cd frontend
    npm run dev
    ```

    ```bash
    cd backend
    npm run dev
    ```

6. **Access the App:**
     Open your web browser and go to [http://localhost:5173](http://localhost:5173). You should see the NoteUp Website running locally.