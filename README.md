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
  <a href="#ERD-and-UML">ERD and UML</a> 
</p>

---

## Authors

- [Amrita Deviayu Tunjungbiru](https://www.github.com/birujung) - 2106636584
- [Akmal Rabbani](https://www.github.com/akmalrbn) - 2106731610
- [Sulthan Satrya Yudha Darmawan](https://www.github.com/sulsyd) - 2106731560
---

## Introduction
<p align="justify">MemoRide is a web-based application designed to facilitate users in booking cultural tourist destinations. Through its homepage, users can easily select and search for cultural tourist destinations in Indonesia based on their preferences. Once users have chosen a destination, they can view ratings given by other users. The application also provides features for users to track their booking history and travel history, allowing them to keep a record of their previous trips.</p>

<p align="justify">Additionally, users will have different membership levels based on how frequently they travel. The application also includes users with admin roles, who have the ability to perform CRUD operations (Create, Read, Update, Delete) on the available tourist destinations. With this feature, admins can easily manage information and details of the tourist destinations.</p>

<p align="justify">In summary, MemoRide is a web application that assists users in booking cultural tourist destinations in Indonesia. It not only provides useful information and ratings but also offers features for tracking history and membership levels. Furthermore, it gives admins full control to manage tourist destinations.</p>

---

## Language and Tools

---

## Tables

### 1.  ```Wisata```

<p align="justify">The ```Wisata``` table is used to store several informations about the cultural tourist destination  which will be shown later in the ```Tours Page```. The table consists of datas which are:</p>

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

<p align="justify">The ```Review``` table is used to store informations, particularly a review about a certain cultural tourist destination which are input by the users and will be shown later in the ```Tours Detail Page```. The table consists of datas which are:</p>

```
1. wisata_Id
2. Username
3. Text Review
4. Rating

```

### 3.  ```User```

<p align="justify">The ```User``` table is used to store registration data from the user when they make an account. It's also used to confirm a User when logging in and when choosing the role as ```User``` or ```Admin```. The table consists of datas which are:</p>

```
1. Account_ID
2. Email
3. Password
4. Role

```

### 4.  ```Booking```

<p align="justify">The ```Booking``` table is used to store informations when users are currently booking and specifies their booking preferences on a certain cultural tourist destination. The table consists of datas which are:</p>

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
