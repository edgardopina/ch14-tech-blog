async function loginFormHandler(event) {
   event.preventDefault();

   const username = document.querySelector('#username-login').value.trim();
   const password = document.querySelector('#password-login').value.trim();

   if (username && password) {
      // POST request (more secure than GET) to /api/users/login tio send login credentials
      const response = await fetch('/api/users/login', {
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
         document.location.replace('/dashboard');
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
      // check the response status code
      if (response.ok) {
         document.location.replace('/dashboard/');
      } else {
         alert(response.statusText);
      }
   }
}


document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
