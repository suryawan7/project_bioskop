// Anda bisa menambahkan kode JavaScript untuk interaktivitas
// Misalnya, memilih jadwal film atau memesan tiket

document.addEventListener("DOMContentLoaded", function() {
    // Tindakan saat film dipilih atau tombol lainnya diklik
    const btnLihatJadwal = document.querySelectorAll('.btn-primary');
    btnLihatJadwal.forEach(button => {
        button.addEventListener('click', function() {
            alert("Anda memilih jadwal untuk film ini.");
        });
    });
});
