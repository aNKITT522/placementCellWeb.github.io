const showFormButton = document.getElementById('showFormButton'); //add student button
const formContainer = document.getElementById('formContainer'); // display student form container
const showStudent = document.getElementById('showStudent'); // a blank div having only id 

// showFormButton.addEventListener('click', () => {
  
//     formContainer.style.display = 'block'; // form will display
  
// });
showFormButton.addEventListener('click', toggleFormDisplay);
function toggleFormDisplay() {
  const formContainer = document.getElementById('formContainer');
  formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
}



// taking student data from student db which fill through path given 
async function fetchStudents(){
    try {
        const response = await fetch('http://localhost:3000/login/placementCell/student/addStudent'); // student data form path 
        const data = await response.json(); // taking all student data from db
        return data;
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
}

// Function to render the student data on the page
async function renderStudents() {
    const studentList = document.getElementById('showStudent');
    studentList.innerHTML = '';

    const students = await fetchStudents();
    students.forEach(student => {
      const list = document.createElement('ul');
      const listItem = document.createElement('li');
      // listItem.setAttribute('class', 'student-item');
      listItem.setAttribute("class","student-item");
      if(`${student.Placed}`){
        var placed="Yes";
      }else{
        var placed="No" ;
      }
      listItem.textContent = `Name: ${student.Name} - Batch: ${student.Batch} - Placed: ${placed}`;

      
        // Create view button
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.setAttribute("id","viewButton");
        viewButton.addEventListener('click', () => {


            const detailsDiv = listItem.querySelector('.details-div');

          // If the details div is already present, remove it (toggle visibility)
          if (detailsDiv) {
            detailsDiv.remove();
          } else {
            // If details div is not present, create it and show additional student details
            const newDetailsDiv = document.createElement('div');
            newDetailsDiv.classList.add('details-div');
            newDetailsDiv.innerHTML = `
               <p>Name: ${student.Name}</p>
               <p>ID: ${student._id}</p>
                <p>Batch: ${student.Batch}</p>
                <p>Email: ${student.Email}</p>
                <p>Placed: ${student.Placed}</p>
                <p>Scores: 
                <ul style="list-style: none;">
                <li>${student.Scores[0].course} : ${student.Scores[0].score}</li>
                <li>${student.Scores[1].course} : ${student.Scores[1].score}</li>
                <li>${student.Scores[2].course} : ${student.Scores[2].score}</li>
                </ul>
                </p>
                <p>Interviews: 
                <ul style="list-style: none;">
                <li>Comapny : ${student.Interviews[0].company} </li>
                <li>Date : ${student.Interviews[0].date} </li>
                <li>Result/Status : ${student.ResultStatus} </li>
                </ul>
                </p>
                
            `;

            // Add the div to the list item
            listItem.appendChild(newDetailsDiv);
          }

             // Create a div to show additional student details

        //   const detailsDiv = document.createElement('div');
        //   detailsDiv.innerHTML = `
        //     <p>Name: ${student.Name}</p>
        //     <p>Batch: ${student.Batch}</p>
        //     <p>Email: ${student.Email}</p>
        //     <p>ID: ${student._id}</p>
        //   `;

        //   // Add the div to the list item
        //   listItem.appendChild(detailsDiv);
        });

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute("id","delButton")
        deleteButton.addEventListener('click', async () => {
          // Delete student from the list
          listItem.remove();

          // Make a request to the backend to delete the student from the database
          try {
            const response = await fetch(`http://localhost:3000/login/placementCell/student/delete/${student._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            console.log(data); // Log the response from the backend
          } catch (error) {
            console.error('Error deleting student:', error);
          }
        });

         // Add buttons to the list item
         listItem.appendChild(viewButton);
         listItem.appendChild(deleteButton);
         list.appendChild(listItem);
 
         // Add the list item to the student list
        studentList.appendChild(list);
    });
  }

  // Call the renderStudents function to fetch and display data on page load
  renderStudents();




  //download the csv file
  // Add event listener to the "Download" link
const downloadLink = document.getElementById('downloadLink');
downloadLink.addEventListener('click', downloadCSV);

// Function to download the CSV file
async function downloadCSV(event) {
  event.preventDefault(); // Prevent the default link behavior (navigating to the URL)
  
  try {
    const response = await fetch('/login/placementCell/student/download');
    const csvData = await response.text();

    // Create a Blob from the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.download = 'students.csv';

    // Simulate a click on the link to trigger the download
    tempLink.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading CSV:', error);
  }
}

