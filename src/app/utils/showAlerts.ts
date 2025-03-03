import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";
interface Props {
  title: string;
  text: string;
  icon: SweetAlertIcon;
}
export function showAlert(cfg: Props, callback: any = null) {
  Swal.fire({
    ...cfg,
    confirmButtonColor: "#6c757d",
  }).then((response: SweetAlertResult) => {
    if (response.isConfirmed) {
      callback && callback();
    }
  });
}
