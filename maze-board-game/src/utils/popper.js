import Swal from 'sweetalert2';

const popper = (message, status, handler) => {
    return Swal.fire({
        text: message,
        type: status,
        confirmButtonColor: '#4c4c4c',
        confirmButtonText: 'Restart',
        showCancelButton: true,
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.value) {
          handler();
        }
      })
};

export default popper;
