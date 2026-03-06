document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const nama = params.get('nama');
    const kursi = params.get('kursi');
    const jadwal = params.get('jadwal');
    const film = localStorage.getItem('film') || 'Film Tidak Diketahui';
  
    const container = document.getElementById('bukti');
    container.innerHTML = `
      <p><strong>Nama:</strong> ${nama}</p>
      <p><strong>Kursi:</strong> ${kursi}</p>
      <p><strong>Jadwal:</strong> ${jadwal}</p>
      <p><strong>Film:</strong> ${film}</p>
      <p><strong>Status:</strong> ✅ Pembayaran Berhasil</p>
    `;
  
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
  
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
  
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text('Tiket Bioskop', 15, 15);
      
      doc.setLineWidth(0.5);
      doc.line(10, 20, 200, 20); 
  
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
  
      doc.text(`Nama Pemesan: ${nama}`, 15, 30);
      doc.text(`Film: ${film}`, 15, 40);
      doc.text(`Jadwal: ${jadwal}`, 15, 50);
      doc.text(`Kursi: ${kursi}`, 15, 60);
      doc.text(`Status: ✅ Pembayaran Berhasil`, 15, 70);
  
      doc.addImage("https://api.qrserver.com/v1/create-qr-code/?data=" + encodeURIComponent(film + kursi), 'PNG', 140, 30, 50, 50);
  
      doc.setFontSize(8);
      doc.text('Terima kasih telah memilih Bioskop Online.', 15, 280);
      doc.text('Silakan datang tepat waktu untuk menikmati film!', 15, 290);
  
  
      doc.save('bukti_pemesanan_tiket.pdf');
    });
  });