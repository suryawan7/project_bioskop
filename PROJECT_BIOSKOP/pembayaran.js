document.addEventListener('DOMContentLoaded', () => {
  const ticketDetailsContainer = document.getElementById('ticketDetails');
  const paymentMethodSelect = document.getElementById('paymentMethod');
  const payBtn = document.getElementById('payBtn');
  const qrisContainer = document.getElementById('qrisContainer');
  const qrisBarcode = document.getElementById('qrisBarcode');
  const timeoutMessage = document.getElementById('timeoutMessage');

  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get('nama');
  const selectedSeats = urlParams.get('kursi').split(','); 
  const jadwal = urlParams.get('jadwal');

  ticketDetailsContainer.innerHTML = `
    <h2 class="text-xl font-semibold">Nama Pemesan: ${userName}</h2>
    <p class="text-lg">Kursi yang dipesan: ${selectedSeats.join(', ')}</p>
    <p class="text-lg">Jadwal: ${jadwal}</p>
  `;

  //tombol bayar
  paymentMethodSelect.addEventListener('change', (e) => {
    payBtn.disabled = !e.target.value;
  });

  //pembayaran
  document.getElementById('paymentForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const paymentMethod = paymentMethodSelect.value;

    if (paymentMethod === 'QRIS') {
      generateQrisCode();
    } else {
      alert('Pembayaran melalui Bank Transfer sedang diproses.');
    }
  });

  // Fungsi generate QRIS
  function generateQrisCode() {
    const qrisData = `Pembayaran Tiket: ${selectedSeats.join(', ')}\nJadwal: ${jadwal}`;
    
    //QRIS
    QRCode.toCanvas(qrisBarcode, qrisData, function (error) {
      if (error) {
        console.error(error);
      }
    });

    // Show QRIS payment container
    qrisContainer.classList.remove('hidden');

    // Timeout pesan (Contoh: untuk pembayaran QRIS)
    qrisBarcode.addEventListener('click', () => {
      timeoutMessage.classList.remove('hidden');
      timeoutMessage.textContent = '✅ Pembayaran berhasil! Mengalihkan...';

      setTimeout(() => {
       // Dalam qrisBarcode click event
        window.location.href = `buktitiket.html?nama=${userName}&kursi=${selectedSeats.join(',')}&jadwal=${jadwal}`;
      }, 2000); // Tunggu 2 detik lalu redirect
    });
  }
});
