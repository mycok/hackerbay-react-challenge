import Swal from 'sweetalert2';

const popper = (message, status, handler) => {
    return Swal.fire({
        text: message,
        type: status,
        confirmButtonColor: '#4c4c4c',
        onClose: () => {
            handler();
        },
    });
}

export default popper;
