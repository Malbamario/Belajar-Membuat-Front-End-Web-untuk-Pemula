# Belajar Membuat Front-End Web untuk Pemula

Repository ini merupakan submission untuk menyelesaikan kelas __Belajar Membuat Front-End Web untuk Pemula__ dari __Dicoding__ dalam rangka __SIB Cycle 5 2023__. Aplikasi web ini merupakan sebuah aplikasi yang digunakan untuk mengelola buku-buku yang dimiliki oleh pengguna. Pada web ini juga menggunakan bootstrap 5 agar dapat mepercepat proses styling tiap elemen-nya.

Berikut daftar kriteria yang diperlukan dalam mengerjakan submission ini.

- [x] Mampu Menambahkan Data Buku<br>
  Data buku yang disimpan merupakan objek JavaScript dengan struktur berikut:
  ```js
  {
    id: string | number, (+new Date())
    title: string,
    author: string,
    year: number,
    isComplete: boolean,
  }
  ```
- [x] Memiliki Dua Rak Buku
  - Bookshelf Apps harus memiliki 2 Rak buku. Yakni, __“Belum selesai dibaca”__ dan __“Selesai dibaca”__.
  - Rak buku __"Belum selesai dibaca"__ hanya menyimpan buku jika properti `isComplete` bernilai `false`.
  - Rak buku __"Selesai dibaca"__ hanya menyimpan buku jika properti `isComplete` bernilai `true`.
- [x] Dapat Memindahkan Buku antar Rak<br>
  Buku yang ditampilkan pada rak, baik itu __"Belum selesai dibaca"__ maupun __"Selesai dibaca"__ harus dapat dipindahkan di antara keduanya.
- [x] Dapat Menghapus Data Buku<br>
  Buku yang ditampilkan pada rak, baik itu __"Belum selesai dibaca"__ maupun __"Selesai dibaca"__ harus dapat dihapus.
- [x] Manfaatkan `localStorage` dalam Menyimpan Data Buku<br>
  - Data buku yang ditampilkan pada rak, baik itu __"Belum selesai dibaca"__ maupun __"Selesai dibaca"__ harus dapat bertahan walaupun halaman web ditutup.
  - Harus menyimpan data buku pada `localStorage`.

Berikut merupakan saran yang dapat ditambahkan ke dalam submission ini.

- [x] Tambahkan fitur pencarian untuk mem-filter buku yang ditampilkan pada rak sesuai dengan title buku yang dituliskan pada kolom pencarian.
- [x] Berkreasilah dengan membuat proyek Bookshelf Apps tanpa menggunakan project starter.
- [x] Menuliskan kode dengan bersih.
  - Bersihkan comment dan kode yang tidak digunakan.
  - Indentasi yang sesuai.
- [x] Terdapat improvisasi fitur seperti (pilih satu): 
  - Custom Dialog ketika menghapus buku.
  - Dapat edit buku.
  - dsb.
