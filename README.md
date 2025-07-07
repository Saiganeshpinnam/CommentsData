Write the objective of the assignment yourself

### Refer to the image below:

Add UI reference image yourself

<div style="text-align: center;">
    https://res.cloudinary.com/dccbkv07a/image/upload/v1746011254/Screenshot_2025-04-30_163710_dbqpek.png  - Success View
    https://res.cloudinary.com/dccbkv07a/image/upload/v1746011407/Screenshot_2025-04-30_163950_pbbezx.png - Failure View
</div>
<br/>

### Design Files

<details>
<summary>
src/components/Login/index.js
src/components/ImageItem/index.js
src/components/ImageItem/index.css
src/components/ImageItemDetails/index.js
src/components/ImageItemDetails/index.css
src/components/NotFound/index.js
src/components/NotFound/index.css
</summary>
<br/>
Add the design files according to the route (if any) and responsiveness

Extra Small (Size < 576px) and Small (Size >= 576px) - Success - https://res.cloudinary.com/dccbkv07a/image/upload/v1746011543/Screenshot_2025-04-30_164159_ngbx0n.png
Extra Small (Size < 576px) and Small (Size >= 576px) - Failure - https://res.cloudinary.com/dccbkv07a/image/upload/v1746011993/Screenshot_2025-04-30_164933_s9ctqo.png
Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Success - https://res.cloudinary.com/dccbkv07a/image/upload/v1746011254/Screenshot_2025-04-30_163710_dbqpek.png, https://res.cloudinary.com/dccbkv07a/image/upload/v1746011817/Screenshot_2025-04-30_164641_hm5arc.png
Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Failure - https://res.cloudinary.com/dccbkv07a/image/upload/v1746011407/Screenshot_2025-04-30_163950_pbbezx.png

</details>

### Set Up Instructions

<details>
<summary>Click to view</summary>

- Download dependencies by running `npm install`
- Start up the app using `npm start`

</details>

### Assignment Completion Instructions

<details>
<summary>Functionality to be added</summary>
<br/>

The app must have the following functionalities:

When an unauthenticated user, tries to access the Image Item Route, then the page should be navigated to Login Route
When an authenticated user clicks on a image in the Image Item Route, then the page should be navigated to Image Item Details route

- When the app is opened initially,
An HTTP GET request should be made to https://www.pexels.com/search/person/ with query parameter as categories mentioned in the prefilled code and its initial value as ALL
loader should be displayed while fetching the data.
After the data is fetched successfully, display the images list received from the response
-When an imgae item is clicked
An HTTP GET request should be made to the each individual item  with the id of the active image
loader should be displayed while fetching the data
After the data is fetched successfully, display the active image and related images list received from the response

If the HTTP GET request made is unsuccessful, then the Not Found view should be displayed

</details>

### Assignment Completion Checklist

<details>
<summary>Click to view</summary>

- **Along with the below points, add your checklist specific to the assignment**

- Read the instructions given in the assignment carefully and list down the **Assignment Completion Checklist** for the assignment and start working on it
- The completion Checklist includes the below-mentioned points
  - I have completed all the functionalities asked in the assignment
  - I have used only the resources (Frameworks, Design files, APIs, third-party packages) mentioned in the assignment
  - I have modified the README.md file based on my assignment instructions
  - I have completed the assignment **ON TIME**
- **Note:**
  - Ensure that you have marked all the checklist points in your completion checklist before submitting the assignment
  </details>

### Quick Tips

<details>
<summary>Click to view</summary>
<br>
To display the animated loader, we need to import the Loader component using the below statement.

- import Loader from 'react-loader-spinner'

In order to display the given animated loader, pass the type and color props to the Loader component with values as ThreeDots and #0284c7, respectively
<Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
</details>

### Important Note

<details>
<summary>Click to view</summary>
<br/>

Home Route should consist of /person in the URL path
Login Route should consist of /login in the URL path
Image Item Route should consist of /?category=id in the URL path
Image Item Details Route should consist of /image/:id in the URL path

-Login API

API: https://www.pexels.com/search/person/
Method: POST
Request:
{
  "username": "rahul",
  "password": "rahul@2021"
}

Sample Successful Response:
{
  "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9. nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y"
}

Sample Failure Response:
{
  "status_code": 404,
  "error_msg": "Username is not found"
}

</details>

### Resources

<details>
<summary>Data Fetch URLs</summary>
<br/>

- https://www.pexels.com/search/?category=person/


{
  "imageItem": [
    {
      "image_logo_url": "https://res.cloudinary.com/dccbkv07a/image/upload/v1746013631/pexels-bess-hamiti-83687-35537_ybo5na.jpg",
      "id": "d6019453-f864-4a2f-8230-6a9642a59466",
      "name": "Bess Hamiti", 
      "category" : "person"
    }
    ...
  ],
  "total":525,
}

</details>

<details>
<summary>Image URLs</summary>
<br/>

- https://res.cloudinary.com/dccbkv07a/image/upload/v1746012976/Screenshot_2025-04-30_170553_cdfsxc.png

</details>

<details>
<summary>Colors</summary>
<br/>

Hex: #0284c7
Hex: #ffffff
Hex: #0f172a
Hex: #f8f8ff
Hex: #e73959
Hex: #1e293b

<!-- <div style="background-color: #3b82f6; width: 150px; padding: 10px; color: white">Hex: #3b82f6</div> -->

</details>

<details>
<summary>Font-families</summary>

- Roboto
- Lobster
- Bree Serif

</details>
