let toastBox = document.getElementById("toastBox");
        let successMsg = '<i class="fa-solid fa-circle-check"></i> Successfully submitted'
        let errorMsg = '<i class="fa-solid fa-circle-xmark"></i> Unknown Error occurred'
        let invalidMsg = '<i class="fa-solid fa-circle-exclamation"></i> Invalid input, check again'
        let workingMsg = '<i class="fa-solid fa-screwdriver-wrench"></i> Working on this feature'

        function showTost(msg){
          let toast =  document.createElement('div');
          toast.classList.add('toast')
          toast.innerHTML = msg;
          toastBox.appendChild(toast);

          if(msg.includes('Error')){
            toast.classList.add('error')
          }
          if(msg.includes('Invalid')){
            toast.classList.add('invalid')
          }
          if(msg.includes('Working')){
            toast.classList.add('working')
          }

          setTimeout(() => {
            toast.remove();
          }, 6000);

        }