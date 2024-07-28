# Image Uploader Boilerplate

A template of a file uploader providing the solid foundations for any application that requires the use of a fullstack application with uploading files

## Built With

<div align='center'>
  
  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  
</div>

## Installation 
Ensure that you have node installed and have downloaded the git repository on your local system, once accomplished, run the following commands in your terminal:

```sh
cd <respository_name>
```

Followed by this ensure you switch into both the client & server ```cd <client or server>``` then run the following command:

```sh
npm install
```

This installs the necessary dependencies for the application to work.

You would also want to ensure that you set up a .env file within the client and server directory that holds the port for your server. 
Using Vite you would want the name of your environment variable to start with VITE for Vite to be able to recognize it. Ensure that this also in your .gitignore.

## Usage

Once you have gone through the installation process you can then run both the client and the server by doing:

```sh
npm run dev
```

Ensure that you do this in one terminal where the client is in the scope and another terminal where the server is in scope. This runs both environments being able to have a rendered and operating server and client. You can check the functionality of the server by using postman or a browser and typing ```http://localhost:3000``` and a json containing hello world should appear. 

### Features
- Drag and Drop File

The file uploads are stored in a local folder called uploads within the server however, general practice is to upload it to a cloud database like AWS S3 but that hasn't been integrated in this template. 
