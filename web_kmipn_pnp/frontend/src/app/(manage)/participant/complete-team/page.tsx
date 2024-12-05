import AlertWarning from "@/components/alert/AlertWarning";
import CompleteTeamForm from "@/components/form/CompleteTeamForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Lengkapi Data Tim',
};

export default function CompleteTeam() {
  return (
    <div>
      <AlertWarning title="Perlu diperhatikan!" message={
        "Pastikan data tim dan anggota sudah benar sebelum disubmit. Setelah pengiriman, data tidak bisa diubah lagi."
      } />
      <CompleteTeamForm />
    </div>
  );
}