import SweetAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const sweetAlert = withReactContent(SweetAlert);

export default (id, deleteFunction) => {
  sweetAlert
    .fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#607d8b",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        deleteFunction(id);
      }
    });
};
