

	**# Trainer Panel (PIIDM) Management API Documentation**



	**## Base URL**

	`http://127.0.0.1:3002/api`



	**## Authentication**

	&nbsp; All API requests require an `Authorization` header with a Bearer token.

	&nbsp;`Authorization: Bearer YOUR\_API\_KEY`



	**## Endpoints**

	**### 1. Get Lectures**

	Retrieves a list of all the Lectures.

	* **Method**: GET
	* **Path**: `/lecture/select-paginate-advanced?draw=1&columns%5B0%5D%5Bdata%5D=topic&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=batch_date&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=batch_time.name&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=course_mode.name&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=zoom_link&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=total_combined_batches&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1753018158729`
	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
				{
				  "basic\_stats": {
					"total\_lectures": 46
				  },
				  "data": \[
					{
					  "batch\_date": "2025-09-30",
					  "batch\_time": {
						"batch\_time\_id": 2,
						"name": "10:00AM - 12:00PM"
					  },
					  "course\_mode": {
						"course\_mode\_id": 1,
						"name": "Classroom"
					  },
					  "lecture\_id": 44,
					  "topic": "CSS selectors4",
					  "trainer": {
						"name": "Vijay Gehlot",
						"trainer\_id": 1
					  },
					  "zoom\_link": ""
					}
				  ]
				}
		```

	---

	**### 2. Create Lecture**

	Adds a single Lecture.

	* **Method**: POST
	* **Path**: `/lecture/add`
	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Request Body**:

	&nbsp;   
		```json
			\[
			  {
				"name": "Vijay Gehlot-18/09/2025-11\[45]2",
				"topic": "JAVA9",
				"course\_mode\_id": 1,
				"json\_batch\_ids": "\[45]",
				"batch\_time\_id": 2,
				"trainer\_id": "1",
				"user\_id": "2058",
				"zoom\_link": "",
				"batch\_date": "20/09/2025"
			  }
			]
		```

	* **Responses**:

	  * **Status: 201 Created**
	  * **Body**:

		```json
				{
				  "message": "Lecture is created."
				}
				```

	---

	**### 3. Get Assignments**

	Retrieves a list of all the Assignments.

	* **Method**: GET
	* **Path**: `/assignment/select-paginate-advanced?draw=1&columns%5B0%5D%5Bdata%5D=title&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=description&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=assignment_date&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=total_combined_batches&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=total_marks&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1757251982282`
	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
				{
				  "basic\_stats": {
					"total\_assignments": 10
				  },
				  "data": \[
					{
					  "assignment\_date": "2025-09-25",
					  "assignment\_id": 9,
					  "description": "<p>CSS Head</p>",
					  "json\_batch\_ids": "\[91]",
					  "title": "CSS Head",
					  "total\_marks": 100,
					  "trainer": {
						"name": "Vijay Gehlot",
						"trainer\_id": 1
					  }
					}
				  ]
				}
				```

	---

	**### 4. Create Assignment**

	Adds a single Assignment.

	* **Method**: POST
	* **Path**: `/assignment/add`
	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Request Body**:

	&nbsp;   ```json
		\[
		  {
			"title": "Documentation of GEN AI",
			"description": "Documentation of GEN AI",
			"json\_batch\_ids": "\[30]",
			"trainer\_id": "1",
			"user\_id": "2058",
			"assignment\_date": "22/09/2025",
			"total\_marks": "500"
		  }
		]
		```

	* **Responses**:

	  * **Status: 201 Created**
	  * **Body**:

		```json
				{
				  "message": "Assignment is created."
				}
				```

	---

	**### 5. Get Batches**

	Retrieves a list of all the Batches.

	* **Method**: GET
	* **Path**: `/batch/select-paginate-advanced?draw=1&columns%5B0%5D%5Bdata%5D=batch_num&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=name&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=batch_date&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=batch_time.name&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=branch.name&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=course.name&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=course_mode.name&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=false&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=trainer.name&columns%5B8%5D%5Bname%5D=&columns%5B8%5D%5Bsearchable%5D=true&columns%5B8%5D%5Borderable%5D=false&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=total_seats&columns%5B9%5D%5Bname%5D=&columns%5B9%5D%5Bsearchable%5D=true&columns%5B9%5D%5Borderable%5D=false&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false`
	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
				{
				  "basic\_stats": {
					"total\_batches": 21
				  },
				  "data": \[
					{
					  "batch\_date": "2024-05-03",
					  "batch\_id": 91,
					  "batch\_num": 1091,
					  "name": "fcvijay10-12pm-May",
					  "seats\_occupied": 23,
					  "seats\_vacant": 17,
					  "total\_seats": 40
					}
				  ]
				}
				```

	---

	**### 6. Get Students**

	Retrieves a list of all the Students.

	* **Method**: GET
	* **Path**: `/students_report/select-paginate-advanced?draw=1&columns%5B0%5D%5Bdata%5D=student.name&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=attendance&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=assignment&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=exam&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=score&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=certificate&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=mock_interview&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=placement_status&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=false&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false`
	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
				{
				  "basic\_stats": {
					"total\_student\_reports": 3075
				  },
				  "data": \[
					{
					  "assignment": "",
					  "attendance": "",
					  "certificate": "",
					  "exam": "",
					  "mock\_interview": "",
					  "placement\_status": null,
					  "score": "",
					  "student": {
						"name": "yash ghadghe",
						"phone\_num": "+91-8983383844",
						"student\_id": 373
					  }
					}
				  ]
				}
				```

	---

	**### 7. Get Lecture Attendance By ID**

	Retrieves the attendance for a specific lecture.

	* **Method**: GET
	* **Path**: `/lecture/attendance/:lecture\_id`
	* **Parameters**:

	  * `/:lecture\_id` (e.g., `/lecture/attendance/44`)

	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
			   \[

		&nbsp;   {

		&nbsp;       "attendance\_id": 1442,

		&nbsp;       "attendance\_status": 2,

		&nbsp;       "created\_at": "Sun, 21 Sep 2025 05:30:53 GMT",

		&nbsp;       "deleted": 0,

		&nbsp;       "lecture": {

		&nbsp;           "batch\_date": "Wed, 10 Sep 2025 00:00:00 GMT",

		&nbsp;           "batch\_time\_id": 6,

		&nbsp;           "course\_mode\_id": 1,

		&nbsp;           "created\_at": "Sun, 21 Sep 2025 05:30:53 GMT",

		&nbsp;           "deleted": 0,

		&nbsp;           "is\_active": 1,

		&nbsp;           "json\_batch\_ids": "\[82]",

		&nbsp;           "lecture\_id": 34,

		&nbsp;           "name": "Vijay Gehlot-10/09/2025-11\[82]6",

		&nbsp;           "topic": "HTML Semantics",

		&nbsp;           "trainer\_id": 1,

		&nbsp;           "updated\_at": "Sun, 21 Sep 2025 05:30:53 GMT",

		&nbsp;           "user\_id": 2058,

		&nbsp;           "zoom\_link": ""

		&nbsp;       },

		&nbsp;       "student": {

		&nbsp;           "admission\_date": "Tue, 05 Mar 2024 00:00:00 GMT",

		&nbsp;           "agent\_id": 11,

		&nbsp;           "alternate\_phone\_num": null,

		&nbsp;           "area": null,

		&nbsp;           "back\_image\_path": null,

		&nbsp;           "batch\_id": 82,

		&nbsp;           "batch\_time\_id": 2,

		&nbsp;           "branch\_id": 1,

		&nbsp;           "city\_id": 1,

		&nbsp;           "country\_id": 98,

		&nbsp;           "course\_content\_class\_recording\_id": 1,

		&nbsp;           "course\_content\_id": 1,

		&nbsp;           "course\_id": 7,

		&nbsp;           "course\_mode\_id": 1,

		&nbsp;           "created\_at": "Tue, 05 Mar 2024 05:39:04 GMT",

		&nbsp;           "deleted": 0,

		&nbsp;           "dob": null,

		&nbsp;           "email": "samarthranjeetwankar200@gmail.com",

		&nbsp;           "front\_image\_path": null,

		&nbsp;           "highest\_education": null,

		&nbsp;           "is\_active": 1,

		&nbsp;           "is\_document\_verified": 0,

		&nbsp;           "json\_course\_learning\_progress": null,

		&nbsp;           "json\_course\_learning\_progress\_class\_recording": null,

		&nbsp;           "lead\_id": 21480,

		&nbsp;           "name": "samarth wankar",

		&nbsp;           "occupation": null,

		&nbsp;           "passport\_image\_path": null,

		&nbsp;           "phone\_num": "+91-8668458060",

		&nbsp;           "pincode": null,

		&nbsp;           "purpose\_for\_course": null,

		&nbsp;           "referred\_by": null,

		&nbsp;           "source\_id": 1,

		&nbsp;           "state\_id": 21,

		&nbsp;           "student\_id": 3640,

		&nbsp;           "total\_fee": 50000,

		&nbsp;           "total\_fee\_paid": 50000,

		&nbsp;           "total\_pending\_fee": 0,

		&nbsp;           "trainer\_id": 1,

		&nbsp;           "updated\_at": "Tue, 05 Mar 2024 05:39:04 GMT",

		&nbsp;           "user\_id": 3656,

		&nbsp;           "who\_you\_are": null

		&nbsp;       },

		&nbsp;       "updated\_at": "Sun, 21 Sep 2025 11:01:27 GMT"

		&nbsp;   }

		]    

		```

	---

	**### 8. Get Batch by ID**

	Retrieves a specific batch by its ID.

	* **Method**: GET
	* **Path**: `/batch/select/:batch\_id`
	* **Parameters**:

	  * `/:batch\_id` (e.g., `/batch/select/47`)

	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
				{

		&nbsp;   "batch\_date": "2023-09-18",

		&nbsp;   "batch\_id": 3,

		&nbsp;   "batch\_num": 1003,

		&nbsp;   "batch\_time": {

		&nbsp;       "batch\_time\_id": 7,

		&nbsp;       "created\_at": "Thu, 20 Apr 2023 17:46:06 GMT",

		&nbsp;       "name": "07:00PM - 09:00PM",

		&nbsp;       "updated\_at": "Thu, 20 Apr 2023 17:46:06 GMT"

		&nbsp;   },

		&nbsp;   "branch": {

		&nbsp;       "branch\_id": 1,

		&nbsp;       "created\_at": "Mon, 13 Mar 2023 22:37:26 GMT",

		&nbsp;       "name": "FC Road, Pune",

		&nbsp;       "updated\_at": "Mon, 13 Mar 2023 22:37:26 GMT"

		&nbsp;   },

		&nbsp;   "course": {

		&nbsp;       "course\_category\_id": 1,

		&nbsp;       "course\_id": 1,

		&nbsp;       "created\_at": "Thu, 20 Apr 2023 17:46:29 GMT",

		&nbsp;       "deleted": 0,

		&nbsp;       "name": "Advanced Digital Marketing Course",

		&nbsp;       "updated\_at": "Thu, 20 Apr 2023 17:46:29 GMT"

		&nbsp;   },

		&nbsp;   "course\_mode": {

		&nbsp;       "course\_mode\_id": 1,

		&nbsp;       "created\_at": "Thu, 20 Apr 2023 17:52:04 GMT",

		&nbsp;       "deleted": 0,

		&nbsp;       "name": "Classroom",

		&nbsp;       "updated\_at": "Thu, 20 Apr 2023 17:52:04 GMT"

		&nbsp;   },

		&nbsp;   "deleted": 0,

		&nbsp;   "name": "fcvijay7-9pm",

		&nbsp;   "seats\_occupied": 12,

		&nbsp;   "seats\_vacant": 33,

		&nbsp;   "total\_seats": 50,

		&nbsp;   "trainer": {

		&nbsp;       "created\_at": "Sun, 30 Apr 2023 00:40:27 GMT",

		&nbsp;       "deleted": 0,

		&nbsp;       "email": "vijay\_gehlot\_trainer@test.com",

		&nbsp;       "name": "Vijay Gehlot",

		&nbsp;       "phone\_num": "+91-8552077668",

		&nbsp;       "trainer\_id": 1,

		&nbsp;       "updated\_at": "Sun, 30 Apr 2023 00:40:27 GMT",

		&nbsp;       "user\_id": 2058

		&nbsp;   }

		}     

		&nbsp;  ```

	---

	**### 9. Update Attendance**

	Updates the attendance status for students in a lecture.

	* **Method**: PUT
	* **Path**: `/lecture/attendance/update`
	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Request Body**:

	&nbsp;   ```json
		\[
		  { "attendance\_id": 1546, "attendance\_status": 2 },
		  { "attendance\_id": 1547, "attendance\_status": 0 },
		  { "attendance\_id": 1548, "attendance\_status": 0 }
		]
		```

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
				{
					"message": "Attendance updated."
				}
				```

	---

	**### 10. Update Lecture (Session)**

	Updates details for a specific lecture.

	* **Method**: PUT
	* **Path**: `/lecture/update/:lecture\_id`
	* **Parameters**:

	  * `/:lecture\_id` (e.g., `/lecture/update/43`)

	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Request Body**:

	&nbsp;   ```json
		\[
		  {
			"name": "Vijay Gehlot-29/09/2025-11\[45]1",
			"topic": "JAVA5",
			"course\_mode\_id": 1,
			"batch\_time\_id": 1,
			"trainer\_id": "1",
			"user\_id": "2058",
			"zoom\_link": "",
			"batch\_date": "29/09/2025"
		  }
		]
		```

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
				{
					"message": "Lecture is updated."
				}
				```

	---

	**### 11. Update Assignment**

	Updates details for a specific assignment.

	* **Method**: PUT
	* **Path**: `/assignment/update/:assignment\_id`
	* **Parameters**:

	  * `/:assignment\_id` (e.g., `/assignment/update/12`)

	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Request Body**:

	&nbsp;   ```json
		\[
		  {
			"title": "fc-2",
			"description": "fc-2",
			"assignment\_date": "29/09/2025",
			"total\_marks": "2000",
			"trainer\_id": "1",
			"user\_id": "2058"
		  }
		]
		```

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
				{
					"message": "Assignment is updated."
				}
				```

	---

	**### 12. View Assignment Submission**

	Retrieves submission details for a specific assignment.

	* **Method**: GET
	* **Path**: `/assignment/submission/view/:assignment\_id`
	* **Parameters**:

	  * `/:assignment\_id` (e.g., `/assignment/submission/view/8`)

	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
		[
			{
				"assignment": {
					"assignment_date": "Wed, 24 Sep 2025 00:00:00 GMT",
					"assignment_id": 8,
					"created_at": "Mon, 22 Sep 2025 11:11:32 GMT",
					"deleted": 0,
					"description": "<p>JavaScript8</p>",
					"is_active": 1,
					"is_assigned_to_students": 1,
					"json_batch_ids": "[93]",
					"title": "JavaScript8",
					"total_marks": 100,
					"trainer_id": 1,
					"updated_at": "Tue, 23 Sep 2025 12:42:38 GMT",
					"user_id": 2058
				},
				"created_at": "Tue, 23 Sep 2025 07:12:38 GMT",
				"deleted": 0,
				"document_uploaded_path": null,
				"marks_obtained": null,
				"student": {
					"admission_date": "Sun, 31 Mar 2024 00:00:00 GMT",
					"agent_id": 3,
					"alternate_phone_num": null,
					"area": null,
					"back_image_path": null,
					"batch_id": 93,
					"batch_time_id": 4,
					"branch_id": 1,
					"city_id": 1,
					"country_id": 98,
					"course_content_class_recording_id": 1,
					"course_content_id": 1,
					"course_id": 7,
					"course_mode_id": 1,
					"created_at": "Mon, 01 Apr 2024 05:27:26 GMT",
					"deleted": 0,
					"dob": null,
					"email": null,
					"front_image_path": null,
					"highest_education": null,
					"is_active": 1,
					"is_document_verified": 0,
					"json_course_learning_progress": null,
					"json_course_learning_progress_class_recording": null,
					"lead_id": 26017,
					"name": "Diksha Kalsaitkar",
					"occupation": null,
					"passport_image_path": null,
					"phone_num": "+91-9112012740",
					"pincode": null,
					"purpose_for_course": null,
					"referred_by": null,
					"source_id": 1,
					"state_id": 21,
					"student_id": 3751,
					"total_fee": 40000,
					"total_fee_paid": 5000,
					"total_pending_fee": 35000,
					"trainer_id": 1,
					"updated_at": "Mon, 01 Apr 2024 05:27:26 GMT",
					"user_id": 3765,
					"who_you_are": null
				},
				"submission_id": 64,
				"submission_status": 0,
				"updated_at": "Tue, 23 Sep 2025 07:12:38 GMT"
			}
		]
		```

	---

	**### 13. Update Assignment Submission**

	Updates marks and status for an assignment submission.

	* **Method**: PUT
	* **Path**: `/assignment/submission/update/:submission\_id`
	* **Parameters**:

	  * `/:submission\_id` (e.g., `/assignment/submission/update/8`)

	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Request Body**:

	&nbsp;   ```json
		\[
		  { "submission\_id": 86, "marks\_obtained": 80, "submission\_status": 1 },
		  { "submission\_id": 87, "marks\_obtained": null, "submission\_status": 0 }
		]
		```

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
				{
					"message": "Submission updated."
				}
				```

	---

	**### 14. Get Trainers**

	Retrieves a list of all trainers.

	* **Method**: GET
	* **Path**: `/trainer/select-paginate-advanced?draw=1\&...`
	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
				{
					"basic_stats": {
						"total_trainers": 1
					},
					"data": [
						{
							"created_at": "Sun, 30 Apr 2023 00:40:27 GMT",
							"deleted": 0,
							"email": "vijay_gehlot_trainer@test.com",
							"is_active": 1,
							"name": "Vijay Gehlot",
							"phone_num": "+91-8552077668",
							"trainer_id": 1,
							"updated_at": "Sun, 30 Apr 2023 00:40:27 GMT",
							"user_id": 2058
						}
					],
					"draw": 1,
					"recordsFiltered": 1,
					"recordsTotal": 1
				}
				```

	---

	**### 15. Get Trainer by ID**

	Retrieves a specific trainer by their ID.

	* **Method**: GET
	* **Path**: `/trainer/select/:trainer\_id`
	* **Parameters**:

	  * `/:trainer\_id` (e.g., `/trainer/select/1`)

	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
				{
					"created_at": "Sun, 30 Apr 2023 00:40:27 GMT",
					"deleted": 0,
					"email": "vijay_gehlot_trainer@test.com",
					"is_active": 1,
					"name": "Vijay Gehlot",
					"phone_num": "+91-8552077668",
					"trainer_id": 1,
					"updated_at": "Sun, 30 Apr 2023 00:40:27 GMT",
					"user_id": 2058
				}
				```

	---

	**### 16. Update Trainer**

	Updates a trainer's user profile information.

	* **Method**: PUT
	* **Path**: `/user/update/:user\_id`
	* **Parameters**:

	  * `/:user\_id` (e.g., `/user/update/2058`)

	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Request Body**:

	&nbsp;   ```json
		{
		  "name": "Vijay Gehlot",
		  "phone\_num": "+91-8552077668",
		  "email": "vijay\_gehlot\_trainer@test.com"
		}
		```

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
				{
					"message": "User is updated."
				}
				```

	---

	**### 17. Get All Batches**

	Retrieves a complete list of all batches without pagination.

	* **Method**: GET
	* **Path**: `/batch/all`
	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
				[
					{
						"batch_date": "Fri, 03 May 2024 00:00:00 GMT",
						"batch_id": 91,
						"batch_num": 1091,
						"batch_time_id": 2,
						"branch_id": 1,
						"course_id": 1,
						"course_mode_id": 1,
						"deleted": 0,
						"name": "fcvijay10-12pm-May",
						"seats_occupied": 23,
						"seats_vacant": 17,
						"total_seats": 40,
						"trainer_id": 1
					}
				]
				```

	---

	**### 18. Get All Lectures**

	Retrieves a complete list of all lectures without pagination.

	* **Method**: GET
	* **Path**: `/lecture/all`
	* **Headers**:

	  * Authorization: Bearer YOUR\_API\_KEY (Required)

	* **Responses**:

	  * **Status: 200 OK**
	  * **Body**:

		```json
				[
					{
						"batch_date": "2024-12-03",
						"batch_time": {
							"batch_time_id": 4,
							"created_at": "Thu, 20 Apr 2023 17:46:06 GMT",
							"name": "01:00PM - 03:00PM",
							"updated_at": "Thu, 20 Apr 2023 17:46:06 GMT"
						},
						"course_mode": {
							"course_mode_id": 1,
							"created_at": "Thu, 20 Apr 2023 17:52:04 GMT",
							"deleted": 0,
							"name": "Classroom",
							"updated_at": "Thu, 20 Apr 2023 17:52:04 GMT"
						},
						"created_at": "Sun, 15 Dec 2024 16:11:14 GMT",
						"deleted": 0,
						"is_active": 1,
						"json_batch_ids": null,
						"lecture_id": 15,
						"name": "Vijay Gehlot-03/12/24-171934",
						"topic": null,
						"trainer": {
							"created_at": "Sun, 30 Apr 2023 00:40:27 GMT",
							"deleted": 0,
							"email": "vijay_gehlot_trainer@test.com",
							"name": "Vijay Gehlot",
							"phone_num": "+91-8552077668",
							"trainer_id": 1,
							"updated_at": "Sun, 30 Apr 2023 00:40:27 GMT",
							"user_id": 2058
						},
						"updated_at": "Sun, 15 Dec 2024 16:11:14 GMT",
						"user_id": 2058,
						"zoom_link": null
					}
				]
				```

