# MemoRide-SBD

<p align="center">
 <i align="center">A Cultural Journey</i>
</p>

<p align ="center">
  <a href="#authors">Authors</a> •
  <a href="#introduction">Introduction</a> •
  <a href="#language-and-tools">Language and Tools</a> •
  <a href="#tables">Tables</a> •
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
The Backend environment of our web-based application is supported by:
1. [```Node.js```](https://nodejs.org/)
2. [```PostgreSQL```](https://www.postgresql.org/)
3. [```Postman```](https://www.postman.com/)
4. [```NeonDB```](https://neon.tech/)

Meanwhile, we developed our frontend by using frameworks such as:
1. [```JavaScript```](https://www.javascript.com/)
2. [```CSS```](https://www.w3.org/Style/CSS/Overview.en.html)
3. [```React```](https://react.dev/)
 
 
---

## Tables

### 1.  ```Tour```

<p align="justify">The ```Tour``` table is used to store several informations about the cultural tourist destination  which will be shown later in the ```Tours Page```. The datas within the table may also be utilized by Admins to make changes on the tours whether it's creating, editing, or deleting the tours. The table consists of datas which are:</p>

```
1. id
2. title
3. city
4. address
5. distance
6. photo
7. description
8. price
9. max_group_size
10. featured

```

### 2.  ```Review```

<p align="justify">The ```Review``` table is used to store informations, particularly a review about a certain cultural tourist destination which are input by the users and will be shown later in the ```Tours Detail Page```. The table consists of datas which are:</p>

```
1. id
2. product_Id
3. username
4. review_text
5. rating

```

### 3.  ```User```

<p align="justify">The ```User``` table is used to store registration data from the user when they register an account or logging in. It's also used to confirm a User when logging in and when choosing the role as ```User``` or ```Admin```. The table consists of datas which are:</p>

```
1. id
2. username
3. email
4. password
5. photo
6. role
```

### 4.  ```Booking```

<p align="justify">The ```Booking``` table is used to store informations when users are currently booking and specifies their booking preferences on a certain cultural tourist destination. The table consists of datas which are:</p>

```
1. id
2. user_id
3. user_email
4. tour_name
5. full_name
6. group_size
7. phone
8. book_at

```
---

## Flowchart
<details>
  <summary>View User and Admin Flowchart:</summary>

  ```MemoRide User Flowchart ```

![alt text](https://github.com/birujung/MemoRide-SBD/blob/tunjung/User_Flowchart.png)

```Memoride Admin Flowchart```

![alt text](https://github.com/birujung/MemoRide-SBD/blob/tunjung/Admin_Flowchart.png)

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
