# MemoRide-SBD

<p align="center">
 <i align="center">A Cultural Journey</i>
</p>

<p align ="center">
  <a href="#authors">Authors</a> •
  <a href="#introduction">Introduction</a> •
  <a href="#language-and-tools">Language and Tools</a> •
  <a href="#tables">Tables</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#flowchart">Flowchart</a> •
  <a href="#ERD-and-uml">ERD and UML</a> 
</p>

---

## Authors

- [Amrita Deviayu Tunjungbiru](https://www.github.com/birujung) - 2106636584
- [Akmal Rabbani](https://www.github.com/akmalrbn) - 2106731610
- [Sulthan Satrya Yudha Darmawan](https://www.github.com/sulsyd) - 2106731560
---

## Introduction
<p align="justify">MemoRide merupakan sebuah aplikasi berbasis web yang dirancang untuk memudahkan pengguna dalam melakukan *booking* destinasi wisata kultural. Dengan menggunakan halaman utama aplikasi ini, pengguna dapat dengan mudah memilih dan mencari destinasi wisata kultural di Indonesia sesuai dengan preferensi mereka. Ketika pengguna telah memilih salah satu destinasi wisata, mereka akan dapat melihat rating yang diberikan oleh pengguna lain. Aplikasi ini juga menyediakan fitur riwayat booking dan riwayat wisata bagi pengguna, sehingga pengguna dapat melacak perjalanan mereka sebelumnya.</p>

<p align="justify">Selain itu, pengguna akan memiliki tingkatan member yang berbeda tergantung dari seberapa sering mereka melakukan perjalanan. Dalam aplikasi ini juga terdapat pengguna dengan peran admin, yang memiliki kemampuan untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada destinasi wisata yang tersedia. Dengan adanya fitur ini, admin dapat dengan mudah mengelola informasi dan detail destinasi wisata.</p>

<p align="justify">Dengan demikian, MemoRide hadir sebagai sebuah aplikasi web yang membantu pengguna dalam melakukan pemesanan destinasi wisata kultural di Indonesia. Aplikasi ini tidak hanya memberikan informasi dan rating yang berguna, tetapi juga menyediakan fitur riwayat dan tingkatan member, serta memberikan kontrol penuh kepada admin untuk mengelola destinasi wisata.</p>

---

## Language and Tools

---

## Tables

### 1.  ```Wisata```
The ```Wisata``` table is used to store several informations about the cultural destination objects which will be shown later in the ```Tours Page```. The table consists of datas which are:

```
1. Nama
2. Lokasi (Jalan)
3. Lokasi (Provinsi)
4. Jarak
5. Deskripsi
6. Review
7. Biaya per orang
8. Maksimal orang per wisata

```

### 2.  ```Review```
The ```Review``` table is used to store informations, particularly a review about a certain cultural destination object which are input by the users and will be shown later in the ```Tours Detail Page```. The table consists of datas which are:
```
1. wisata_Id
2. Username
3. Text Review
4. Rating

```

### 3.  ```User```
The ```User``` table is used to store registration data from the user when they make an account. It's also used to confirm a User when logging in and when choosing the role as ```User``` or ```Admin```. The table consists of datas which are:
```
1. Account_ID
2. Email
3. Password
4. Role

```

### 4.  ```Booking```
The ```Booking``` table is used to store informations when users are currently booking and specifies their booking preferences on a certain cultural destination object. The table consists of datas which are:
```
1. user_Id
2. Username
3. Nama Lengkap
4. Jumlah orang
5. Nomor Telepon
6. Booking Date
7. Nama Wisata
8. Total_Price

```
---

## How To Use

---

## Flowchart
<details>
  <summary>View User and Admin Flowchart:</summary>

  ```MemoRide User Flowchart ```

![alt text](https://github.com/birujung/MemoRide-SBD/blob/tunjung/User_Flowchart.png)

```Memoride Admin Flowchart```

![alt text]()

</details>

---

## ERD and UML 
<details>
  <summary>View ERD and UML</summary>

  ```Entity Relational Diagram (ERD)```

![alt text](https://github.com/birujung/MemoRide-SBD/blob/tunjung/ERD_MemoRide.png)

```Unified Modeling Language (UML)```

![alt text](https://github.com/birujung/MemoRide-SBD/blob/tunjung/UML_MemoRide.png)

</details>

---
