document.addEventListener('DOMContentLoaded', function () {
  
    const email = {
      email: '', 
      asunto: '', 
      mensaje: ''
    }

    const inputEmail = document.getElementById('email');
    const inputAsunto = document.getElementById('asunto');
    const inputMensaje = document.getElementById('mensaje');
    const formulario = document.getElementById('formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    inputEmail.addEventListener('input', validate);

    inputAsunto.addEventListener('input', validate);

    inputMensaje.addEventListener('input', validate);

    formulario.addEventListener('submit', sendEmail);

    btnReset.addEventListener('click', (e) => {
      e.preventDefault();

      resetEmailObject();
    })

    function sendEmail(e) {
      e.preventDefault();

      spinner.classList.add('flex');
      spinner.classList.remove('hidden');      
      
      setTimeout(() => {
        spinner.classList.remove('flex');
        spinner.classList.add('hidden');
        resetEmailObject();

        const successAlert = document.createElement('P');
        successAlert.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
        successAlert.textContent = 'Email enviado correctamente';
        formulario.appendChild(successAlert);
        setTimeout(() => {
          successAlert.remove();
        }, 3000)
      }, 3000)

    }
    
    function validate(e) {
      
      if (e.target.value.trim() === '') {
    
        showAlertContent(`The field ${e.target.name} is empty`, e.target.parentElement);
        email[e.target.name] = ''
        checkEmailCompleted();
        return;
      } 
      
      if (e.target.id === 'email') {

        if (!validateEmail(e.target.value)) {
          
          showAlertContent('the field email is wrong', e.target.parentElement)
          email[e.target.name] = ''
          checkEmailCompleted();
          return
        }
      }
   

      cleanAlert(e.target.parentElement);

      email[e.target.name] = e.target.value.trim().toLowerCase();

      checkEmailCompleted();

    };


    function showAlertContent(message, positionAlert) {

      cleanAlert(positionAlert);
      const error = document.createElement('P');
      error.textContent = message;
      error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

      positionAlert.appendChild(error)
      
      
    }

    function cleanAlert(positionAlert) {
      const alert = positionAlert.querySelector('.bg-red-600');
      if (alert) {
        alert.remove()
      }
    }

    function validateEmail(email) {
      const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
      const result = regex.test(email);
      return result
  

    }

    function checkEmailCompleted() {
      if (Object.values(email).includes('')) {
        btnSubmit.classList.add('opacity-50');
        btnSubmit.disabled = true;
        return
      } 

      btnSubmit.classList.remove('opacity-50');
      btnSubmit.disabled = false;
      
    }

    function resetEmailObject() {
      email.email = '';
      email.asunto = '';
      email.mensaje = '';

      formulario.reset();
      checkEmailCompleted();
    }

});