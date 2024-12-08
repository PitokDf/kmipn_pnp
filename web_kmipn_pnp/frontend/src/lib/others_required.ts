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

export const borderColor = [
    'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 205, 86, 1)',
    'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
    'rgba(201, 203, 207, 1)', 'rgba(128, 0, 128, 1)', 'rgba(255, 140, 0, 1)',
    'rgba(70, 130, 180, 1)', 'rgba(240, 128, 128, 1)', 'rgba(154, 205, 50, 1)',
    'rgba(255, 215, 0, 1)', 'rgba(218, 112, 214, 1)', 'rgba(100, 149, 237, 1)',
    'rgba(46, 139, 87, 1)', 'rgba(199, 21, 133, 1)', 'rgba(128, 128, 0, 1)',
    'rgba(72, 61, 139, 1)', 'rgba(255, 69, 0, 1)', 'rgba(50, 205, 50, 1)',
    'rgba(0, 191, 255, 1)', 'rgba(219, 112, 147, 1)', 'rgba(0, 255, 255, 1)',
    'rgba(255, 182, 193, 1)', 'rgba(238, 130, 238, 1)', 'rgba(34, 139, 34, 1)',
    'rgba(64, 224, 208, 1)', 'rgba(135, 206, 250, 1)', 'rgba(255, 160, 122, 1)',
    'rgba(105, 105, 105, 1)', 'rgba(255, 255, 224, 1)', 'rgba(0, 128, 128, 1)',
    'rgba(255, 228, 181, 1)', 'rgba(123, 104, 238, 1)', 'rgba(250, 128, 114, 1)',
    'rgba(186, 85, 211, 1)', 'rgba(176, 224, 230, 1)', 'rgba(240, 230, 140, 1)',
    'rgba(219, 112, 219, 1)', 'rgba(112, 128, 144, 1)', 'rgba(210, 180, 140, 1)',
    'rgba(60, 179, 113, 1)', 'rgba(47, 79, 79, 1)', 'rgba(0, 250, 154, 1)',
    'rgba(244, 164, 96, 1)', 'rgba(128, 0, 0, 1)', 'rgba(221, 160, 221, 1)',
    'rgba(0, 100, 0, 1)', 'rgba(189, 183, 107, 1)', 'rgba(178, 34, 34, 1)'
];