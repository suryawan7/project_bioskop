document.addEventListener('DOMContentLoaded', () => {
  const seatsContainer = document.getElementById('seats');
  const confirmBtn = document.getElementById('confirmBtn');
  const bookingForm = document.getElementById('bookingForm');
  const jumlahTiketDisplay = document.getElementById('jumlahTiket');
  const tambahBtn = document.getElementById('tambahTiket');
  const kurangiBtn = document.getElementById('kurangiTiket');
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modalMessage');
  const closeModalBtn = document.getElementById('closeModalBtn');
  localStorage.setItem('film', 'Thor: Ragnarok');


  const rows = 5;
  const cols = 8;
  const occupiedSeats = [3, 7, 12];
  let jumlahTiket = 1;
  let selectedSeats = [];
  let userName = '';

  for (let i = 0; i < rows * cols; i++) {
    const seat = document.createElement('div');
    seat.classList.add('seat');
    seat.textContent = i + 1;

    if (occupiedSeats.includes(i)) {
      seat.classList.add('occupied');
    } else {
      seat.addEventListener('click', () => {
        if (seat.classList.contains('selected')) {
          seat.classList.remove('selected');
          selectedSeats = selectedSeats.filter(s => s !== i + 1);
        } else {
          if (selectedSeats.length < jumlahTiket) {
            seat.classList.add('selected');
            selectedSeats.push(i + 1);
          }
        }
        confirmBtn.disabled = selectedSeats.length !== jumlahTiket;
      });
    }

    seatsContainer.appendChild(seat);
  }

  const updateJumlahTiket = (delta) => {
    jumlahTiket = Math.max(1, jumlahTiket + delta);
    jumlahTiketDisplay.textContent = jumlahTiket;

    selectedSeats = [];
    document.querySelectorAll('.seat.selected').forEach(s => s.classList.remove('selected'));
    confirmBtn.disabled = true;
  };

  tambahBtn.addEventListener('click', () => updateJumlahTiket(1));
  kurangiBtn.addEventListener('click', () => updateJumlahTiket(-1));

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const jadwal = document.getElementById('jadwal').value;
    userName = document.getElementById('nama').value;

    if (!jadwal || !userName || selectedSeats.length !== jumlahTiket) {
      alert('Harap isi nama, jadwal, dan pilih kursi sesuai jumlah tiket.');
      return;
    }

    modalMessage.textContent = `Terima kasih, ${userName}! Kursi yang dipesan: ${selectedSeats.join(', ')} pada jam ${jadwal}.`;
    modal.style.display = 'flex';
  });

  closeModalBtn.addEventListener('click', () => {
    const jadwal = document.getElementById('jadwal').value;
    modal.style.display = 'none';
    window.location.href = `pembayaran.html?nama=${encodeURIComponent(userName)}&kursi=${encodeURIComponent(selectedSeats.join(','))}&jadwal=${encodeURIComponent(jadwal)}`;
  });
});
