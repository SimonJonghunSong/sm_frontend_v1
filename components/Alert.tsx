import Swal from "sweetalert2";
import "animate.css";

export default async function Alert({ title, text }:{title:string,text:string}) {
  return Swal.fire({
    title,
    text,
    allowOutsideClick: false,
    confirmButtonText: "OK",
    showClass: {
      popup: "animate__animated animate__fadeIn animate__faster",
    },
    hideClass: {
      popup: "animate__animated animate__zoomOut animate__faster",
    },
    // backdrop: false
  });
}
