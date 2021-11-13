async function signupFormHandler(event) {
   event.preventDefault();

   const username = document.querySelector('#username-signup').value.trim();
   const password = document.querySelector('#password-signup').value.trim();
   
   if (username && password) {
      // POST request to /api/users to CREATE AN USER
      const response = await fetch('/api/users', {
         method: 'post',
         body: JSON.stringify({
            username,
            password,
         }),
         headers: {
            'Content-Type': 'application/json',
         },
      });
      // check the response status code
      if (response.ok) {
         document.location.replace('/dashboard/');
      } else {
         alert(response.statusText);
      }
   }
}

async function signupInstead(event) {
   event.preventDefault();

   const username = document.querySelector('#username-signup').value.trim();
   const password = document.querySelector('#password-signup').value.trim();
   
   if (username && password) {
      // POST request to /api/users to CREATE AN USER
      const response = await fetch('/api/users', {
         method: 'post',
         body: JSON.stringify({
            username,
            password,
         }),
         headers: {
            'Content-Type': 'application/json',
         },
      });
      if (response.ok) {
         document.location.replace('/dashboard/');
      } else {
         alert(response.statusText);
      }
   }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
