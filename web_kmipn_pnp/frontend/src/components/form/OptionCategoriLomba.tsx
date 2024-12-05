import { fetcher } from "@/lib/api";
import { Category, InputProps } from "@/lib/types";
import useSWR from "swr";

export default function OptionCategoryLomba({ className, value, onChange, name, id }: InputProps) {
    const { data: data, error } = useSWR("/api/v1/categories-close", fetcher);

    if (error) {
        console.log('terjadi masalah'); return;
    }

    if (!data) {
        console.log("loading data");
        return
    }

    const categories: Category[] = data.data;
    return (
        <select className={`input select ${className}`} value={value} onChange={onChange} name={name} id={id}>
            <option value="">-- pilih kategori --</option>
            {
                categories.map((categori, index) => (
                    <option key={"option-categori-" + index} value={categori.id}>{categori.categoriName}</option>
                ))
            }
        </select>
    );
}