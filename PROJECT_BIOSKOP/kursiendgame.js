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
  
    localStorage.setItem('film', 'Avengers: Endgame');
  
    const rows = 5;
    const cols = 8;
    const occupiedSeats = [4, 5, 6, 10, 12, 13, 14, 17, 18, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40.]; // Kursi yang sudah dipesan
    let jumlahTiket = 1;
    let selectedSeats = [];
    let userName = '';
  
    for (let i = 0; i < rows * cols; i++) {
      const seat = document.createElement('div');
      seat.textContent = i + 1;
      seat.className = 'w-10 h-10 flex items-center justify-center rounded-md text-sm font-semibold cursor-pointer bg-gray-400 transition duration-300';
  
      if (occupiedSeats.includes(i)) {
        seat.classList.add('bg-red-600', 'text-white', 'cursor-not-allowed');
        seat.classList.remove('cursor-pointer');
      } else {
        seat.addEventListener('click', () => {
          if (seat.classList.contains('bg-yellow-400')) {
            seat.classList.remove('bg-yellow-400', 'text-black');
            seat.classList.add('bg-gray-400');
            selectedSeats = selectedSeats.filter(s => s !== i + 1);
          } else {
            if (selectedSeats.length < jumlahTiket) {
              seat.classList.remove('bg-gray-400');
              seat.classList.add('bg-yellow-400', 'text-black');
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
  
      modalMessage.textContent = `Terima kasih, ${userName}! Kursi: ${selectedSeats.join(', ')} pada jam ${jadwal}.`;
      modal.style.display = 'flex';
    });
  
    closeModalBtn.addEventListener('click', () => {
      const jadwal = document.getElementById('jadwal').value;
      modal.style.display = 'none';
      window.location.href = `pembayaran.html?nama=${encodeURIComponent(userName)}&kursi=${encodeURIComponent(selectedSeats.join(','))}&jadwal=${encodeURIComponent(jadwal)}`;
    });
  });
  