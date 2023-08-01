const showInterview = document.getElementById("showInterviews");
// const addStudent = document.getElementById("addStudent");

async function fetchInterviews(){
    try {
        const response = await fetch('http://localhost:3000/login/placementCell/company/addInterview');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('Error fetching interviews:', error);
        return [];
    }
}


// Function to render the student data on the page
async function renderStudents() {
    const studentList = document.getElementById('showInterviews');
    studentList.innerHTML = '';

    const interviewData = await fetchInterviews();
    interviewData.forEach(interview => {
      const list = document.createElement('ul');
      const listItem = document.createElement('li');
      listItem.textContent = `Company: ${interview.interviews.Company} - Title: ${interview.interviews.Title} - Date: ${interview.interviews.Date} - id: ${interview.interviews._id}`;


      
        // // Create add button
//         const addButton = document.createElement('button');
//         addButton.textContent = 'Allot student';
//         addButton.id = "allotStudent"
//         const addStudentDiv = document.getElementById('addStudentForm');
//         addButton.addEventListener('click', async (event) => {
            
//             if(addStudentDiv!==null){
//                 addStudentDiv.style.display = "block";
//             }
//         })
//         const alotStudentForm = document.getElementById("allotStudentForm");
//         alotStudentForm.addEventListener('submit', async (event) => {
//         event.preventDefault();
// //         // const interviewIdd = 'interview._id';

// //         //     // Set the interview ID in the hidden input field
// //         //    document.getElementById('interviewId').value = interviewIdd;
// //          // Create a new FormData object from the form
//         //   const form = event.target;
//         const formData = new FormData(alotStudentForm);
// //         // Send the form data in a fetch POST request to the backend
//   try {
//     const response = await fetch(`http://localhost:3000/login/placementCell/company/allotStudent/${interview._id}`, {
//       method: 'POST',
//       headers:{'Content-Type': 'application/x-www-form-urlencoded'},
//       body: formData
//     });

//     if (response.ok) {
//       // Handle the successful response
//       console.log('Student allotted successfully!');
//     } else {
//       // Handle error response
//       console.error('Error allotting student:', response.status, response.statusText);
//     }
//   } catch (error) {
//     console.error('Error allotting student:', error);
//   }
//        })
//         listItem.appendChild(addButton);
     

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async () => {
          // Delete student from the list
          listItem.remove();

        //   // Make a request to the backend to delete the student from the database
          try {
            const response = await fetch(`http://localhost:3000/login/placementCell/company/deleteinterview/${interview._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            console.log(data); // Log the response from the backend
          } catch (error) {
            console.log('Error deleting student:', error);
          }
        });

         // Add buttons to the list item
        //  listItem.appendChild(viewButton);
         listItem.appendChild(deleteButton);
         list.appendChild(listItem);
 
         // Add the list item to the student list
        studentList.appendChild(list);
    });
  }

  // Call the renderStudents function to fetch and display data on page load
  renderStudents();