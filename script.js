
/* =================================
   1. PERSONALISASI NAMA TAMU
================================= */

// Membaca parameter URL
const urlParams = new URLSearchParams(window.location.search);

// Mengambil nama dan kategori dari URL
const namaTamu = urlParams.get("to");
const kategoriTamu = urlParams.get("kategori");

// Mengambil elemen HTML
const elemenNama = document.getElementById("namaTamu");
const elemenKategori = document.getElementById("kategoriTamu");

// Menampilkan nama tamu
if (namaTamu) {
    elemenNama.textContent = namaTamu;
} else {
    elemenNama.textContent = "Tamu Undangan";
}

// Menampilkan kategori tamu
if (kategoriTamu) {
    elemenKategori.textContent = kategoriTamu;
} else {
    elemenKategori.textContent = "Undangan Umum";
}


/* =================================
   2. TOMBOL BUKA UNDANGAN
================================= */

function bukaUndangan() {

    const isiUndangan = document.getElementById("isiUndangan");

    isiUndangan.scrollIntoView({
        behavior: "smooth"
    });

}


/* =================================
   3. FORM RSVP
================================= */

const formRSVP = document.getElementById("formRSVP");

formRSVP.addEventListener("submit", function(event) {

    // Mencegah halaman refresh
    event.preventDefault();

    // Mengambil data formulir
    const nama = document.getElementById("namaRSVP").value;
    const instansi = document.getElementById("instansiRSVP").value;
    const kehadiran = document.getElementById("kehadiran").value;

    // Menampilkan hasil konfirmasi
    document.getElementById("hasilRSVP").textContent =
        "Terima kasih " + nama +
        " dari " + instansi +
        ". Konfirmasi Anda: " + kehadiran + ".";

    // Mengosongkan formulir
    formRSVP.reset();

});
