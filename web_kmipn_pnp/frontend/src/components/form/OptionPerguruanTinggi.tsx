import { list_pt } from "@/lib/others_required";
import { InputProps } from "@/lib/types";

export default function OptionListPerguruanTinggi({ className, value, onChange, name, id }: InputProps) {
  return (
    <select value={value} className={`input select ${className}`} onChange={onChange} name={name} id={id}>
      <option value="">-- pilih perguruan tinggi --</option>
      {
        list_pt.map((pt, index) => (
          <option key={"pt_list_" + index} value={pt}>{pt}</option>
        ))
      }
    </select>
  );
}