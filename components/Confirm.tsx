import Swal from "sweetalert2";
import "animate.css";

export default async function Confirm({ title, text, cancelButton }:{title: string; text:string; cancelButton?: boolean}) {
  return Swal.fire({
      title,
      text,
      allowOutsideClick: false,
      showDenyButton: true,
      showCancelButton: cancelButton || false,
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes",
      denyButtonText: "Cancel",
      reverseButtons: true,
      showClass: {
          popup: "animate__animated animate__fadeIn animate__faster",
      },
      hideClass: {
          popup: "animate__animated animate__zoomOut animate__faster",
      },
      // backdrop: false
  });
}
