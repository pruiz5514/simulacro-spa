import Swal from 'sweetalert2';

export function alertError(text: string) {
    Swal.fire({
        title: 'Error!',
        text: text,
        icon: 'error',
        confirmButtonText: 'Cool'
    })
}

export function alertSuccess(text: string) {
    Swal.fire({
        text: text,
        icon: 'success',
        confirmButtonText: 'Cool'
    })
}