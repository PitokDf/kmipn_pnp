export const list_pt = [
    "Politeknik Negeri Bandung (Polban)",
    "Politeknik Negeri Malang (Polinema)",
    "Politeknik Negeri Jakarta (PNJ)",
    'Politeknik Negeri Semarang (Polnes)',
    "Politeknik Negeri Medan (Polimed)",
    "Politeknik Negeri Sriwijaya (Polsri)",
    "Politeknik Negeri Samarinda (Polnes)",
    "Politeknik Negeri Bali (PNB)",
    "Politeknik Negeri Padang (PNP)",
    "Politeknik Negeri Ujung Pandang (PNUP)",
    "Politeknik Manufaktur Negeri Bandung (Polman Bandung)",
    "Politeknik Negeri Manado (Polimdo)",
    "Politeknik Negeri Ambon (Polnam)",
    "Politeknik Elektronika Negeri Surabaya (PENS)",
    "Politeknik Negeri Lampung(Polinela)",
    "Politeknik Negeri Pontianak(Polnep)",
    "Politeknik Negeri Jember(Polije)",
    "Politeknik Negeri Banjarmasin(Poliban)",
    "Politeknik Perkapalan Negeri Surabaya(PPNS)",
    "Politeknik Negeri Lhokseumawe(PNL)",
    "Politeknik Pertanian Negeri Samarinda(Politani Samarinda)",
    "Politeknik Pertanian Negeri Pangkajene Kepulauan(Politani Pangkep)",
    "Politeknik Negeri Kupang(Poltek Kupang)",
    "Politeknik Pertanian Negeri Kupang(Politani Kupang)",
    "Politeknik Pertanian Negeri Payakumbuh(Politani Payakumbuh)",
    "Politeknik Negeri Tual(Polikant)",
    "Politeknik Media Kreatif Negeri Jakarta(Polimedia)",
    "Politeknik Manufaktur Negeri Bangka Belitung(Polman Babel)",
    "Politeknik Negeri Batam(Poltek Batam)",
    "Politeknik Negeri Nusa Utara(Polnustar)",
    "Politeknik Negeri Bengkalis(Poltek Bengkalis)",
    "Politeknik Negeri Balikpapan(Poltekba)",
    "Politeknik Negeri Madiun(PNM)",
    "Politeknik Negeri Madura(Poltera)",
    "Politeknik Negeri Fakfak(Polinef)",
    "Politeknik Negeri Banyuwangi(Poliwangi)",
    "Politeknik Negeri Sambas(Poltesa)",
    "Politeknik Maritim Negeri Indonesia(Polimarin)",
    "Politeknik Negeri Ketapang(Politap)",
    "Politeknik Negeri Tanah Laut(Politala)",
    "Politeknik Negeri Subang(Poltek Subang)",
    "Politeknik Negeri Indramayu(Polindra)",
    "Politeknik Negeri Cilacap(Poltek Cilacap)",
    "Politeknik Negeri Nunukan(PNN)",
    "Akademi Komunitas Negeri Pacitan",
    "Akademi Komunitas Negeri Aceh Barat",
    "Akademi Komunitas Negeri Putra Sang Fajar Blitar",
    "Akademi Komunitas Negeri Rejang Lebong",
    "Akademi Komunitas Negeri Seni dan Budaya Yogyakarta"
]


export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, getter: any, setter: any) => {
    setter({
        ...getter,
        [e.target.name]: e.target.value
    })
}

export const formatDate = (date: string) => {
    const objDate = new Date(date);
    return objDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    })
}