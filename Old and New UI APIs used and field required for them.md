#### **# Trainer Panel (PIIDM) Management API Documentation**



**## Base URL**



`http://127.0.0.1:3002/api`



**## Authentication**



All API requests require an `Authorization` header with a Bearer token.



Authorization: Bearer YOUR\_API\_KEY





#### **## Endpoints**



**### 1. Get Lectures**



Retrieves a list of all the Lectures.



* Method: GET
* Path: /lecture/select-paginate-advanced?columns%5B0%5D%5Bdata%5D=topic\&columns%5B0%5D%5Bname%5D=\&columns%5B0%5D%5Bsearchable%5D=true\&columns%5B0%5D%5Borderable%5D=false\&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B1%5D%5Bdata%5D=batch\_date\&columns%5B1%5D%5Bname%5D=\&columns%5B1%5D%5Bsearchable%5D=true\&columns%5B1%5D%5Borderable%5D=false\&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B2%5D%5Bdata%5D=batch\_time.name\&columns%5B2%5D%5Bname%5D=\&columns%5B2%5D%5Bsearchable%5D=true\&columns%5B2%5D%5Borderable%5D=false\&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B3%5D%5Bdata%5D=course\_mode.name\&columns%5B3%5D%5Bname%5D=\&columns%5B3%5D%5Bsearchable%5D=true\&columns%5B3%5D%5Borderable%5D=false\&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B4%5D%5Bdata%5D=zoom\_link\&columns%5B4%5D%5Bname%5D=\&columns%5B4%5D%5Bsearchable%5D=true\&columns%5B4%5D%5Borderable%5D=false\&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B5%5D%5Bdata%5D=total\_combined\_batches\&columns%5B5%5D%5Bname%5D=\&columns%5B5%5D%5Bsearchable%5D=true\&columns%5B5%5D%5Borderable%5D=false\&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B6%5D%5Bdata%5D=\&columns%5B6%5D%5Bname%5D=\&columns%5B6%5D%5Bsearchable%5D=true\&columns%5B6%5D%5Borderable%5D=false\&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false\&start=0\&length=10\&search%5Bvalue%5D=\&search%5Bregex%5D=false\&\_=1753018158729\&draw=2\&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=
* Headers:

     - Authorization: Bearer YOUR\_API\_KEY (Required) Responses:

* Responses:

     - Status: 200 OK:

    "basic\_stats": {

        "total\_lectures": 46

    },

    "data": \[

        {

            "batch\_date": "2025-09-30",

            "batch\_time": {

                "batch\_time\_id": 2,

                "created\_at": "Thu, 20 Apr 2023 17:46:06 GMT",

                "name": "10:00AM - 12:00PM",

                "updated\_at": "Thu, 20 Apr 2023 17:46:06 GMT"

            },

            "course\_mode": {

                "course\_mode\_id": 1,

                "created\_at": "Thu, 20 Apr 2023 17:52:04 GMT",

                "deleted": 0,

                "name": "Classroom",

                "updated\_at": "Thu, 20 Apr 2023 17:52:04 GMT"

            },

            "created\_at": "Mon, 22 Sep 2025 06:35:51 GMT",

            "deleted": 0,

            "is\_active": 1,

            "json\_batch\_ids": "\[45]",

            "lecture\_id": 44,

            "name": "Vijay Gehlot-18/09/2025-11\[45]2",

            "topic": "CSS selectors4",

            "trainer": {

                "created\_at": "Sun, 30 Apr 2023 00:40:27 GMT",

                "deleted": 0,

                "email": "vijay\_gehlot\_trainer@test.com",

                "name": "Vijay Gehlot",

                "phone\_num": "+91-8552077668",

                "trainer\_id": 1,

                "updated\_at": "Sun, 30 Apr 2023 00:40:27 GMT",

                "user\_id": 2058

            },

            "updated\_at": "Mon, 22 Sep 2025 06:35:51 GMT",

            "user\_id": 2058,

            "zoom\_link": ""

        },

    ]







**### 2. Create Lectures**



Add a single Lecture.



* Method: POST
* Path: /lecture/add
* Headers:

    - Authorization: Bearer YOUR\_API\_KEY (Required) Responses

    - Request Body: \[

 		{"name":"Vijay Gehlot-18/09/2025-11\[45]2",

 		"topic":"JAVA9",

 		"course\_mode\_id":1,

 		"json\_batch\_ids":"\[45]",

 		"batch\_time\_id":2,

 		"trainer\_id":"1",

 		"user\_id":"2058",

 		"zoom\_link":"",

 		"batch\_date":"20/09/2025"}

 	    ]

* Responses:

    - Status: 201 Created:

    - Body: {

    	"message": "Lecture is created."

 	    }









**### 3. GET Assignments**



Retrieves a list of all the Assignments.



* Method: GET
* Path: /assignment/select-paginate-advanced?draw=1\&columns%5B0%5D%5Bdata%5D=title\&columns%5B0%5D%5Bname%5D=\&columns%5B0%5D%5Bsearchable%5D=true\&columns%5B0%5D%5Borderable%5D=false\&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B1%5D%5Bdata%5D=description\&columns%5B1%5D%5Bname%5D=\&columns%5B1%5D%5Bsearchable%5D=true\&columns%5B1%5D%5Borderable%5D=false\&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B2%5D%5Bdata%5D=assignment\_date\&columns%5B2%5D%5Bname%5D=\&columns%5B2%5D%5Bsearchable%5D=true\&columns%5B2%5D%5Borderable%5D=false\&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B3%5D%5Bdata%5D=total\_combined\_batches\&columns%5B3%5D%5Bname%5D=\&columns%5B3%5D%5Bsearchable%5D=true\&columns%5B3%5D%5Borderable%5D=false\&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B4%5D%5Bdata%5D=total\_marks\&columns%5B4%5D%5Bname%5D=\&columns%5B4%5D%5Bsearchable%5D=true\&columns%5B4%5D%5Borderable%5D=false\&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B5%5D%5Bdata%5D=\&columns%5B5%5D%5Bname%5D=\&columns%5B5%5D%5Bsearchable%5D=true\&columns%5B5%5D%5Borderable%5D=false\&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false\&start=0\&length=10\&search%5Bvalue%5D=\&search%5Bregex%5D=false\&\_=1757152792120
* Headers:

     - Authorization: Bearer YOUR\_API\_KEY (Required) Responses:

* Responses:

     - Status: 200 OK:

     - Response Body: {

    "basic\_stats": {

        "total\_assignments": 10

    },

    "data": \[

        {

            "assignment\_date": "2025-09-25",

            "assignment\_id": 9,

            "created\_at": "Tue, 23 Sep 2025 06:29:07 GMT",

            "deleted": 0,

            "description": "<p>CSS Head</p>",

            "is\_active": 1,

            "is\_assigned\_to\_students": 0,

            "json\_batch\_ids": "\[91]",

            "title": "CSS Head",

            "total\_marks": 100,

            "trainer": {

                "created\_at": "Sun, 30 Apr 2023 00:40:27 GMT",

                "deleted": 0,

                "email": "vijay\_gehlot\_trainer@test.com",

                "name": "Vijay Gehlot",

                "phone\_num": "+91-8552077668",

                "trainer\_id": 1,

                "updated\_at": "Sun, 30 Apr 2023 00:40:27 GMT",

                "user\_id": 2058

            },

            "updated\_at": "Tue, 23 Sep 2025 06:29:07 GMT",

            "user\_id": 2058

        }

      ]

    }



**### 4. Create Assignments:**



Add a single Assignment.



* Method: POST
* Path: /assignment/add
* Headers:

    - Authorization: Bearer YOUR\_API\_KEY (Required) Responses

    - Request Body: \[

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

* Responses:

    - Status: 201 Created:

    - Body: {

    	       "message": "Assignment is created."

 	    }





**### 5. GET Batches:**



Retrieves a list of all the Batches.



* Method: GET
* Path: /batch/select-paginate-advanced?draw=1\&columns%5B0%5D%5Bdata%5D=batch\_num\&columns%5B0%5D%5Bname%5D=\&columns%5B0%5D%5Bsearchable%5D=true\&columns%5B0%5D%5Borderable%5D=false\&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B1%5D%5Bdata%5D=\&columns%5B1%5D%5Bname%5D=\&columns%5B1%5D%5Bsearchable%5D=true\&columns%5B1%5D%5Borderable%5D=false\&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B2%5D%5Bdata%5D=name\&columns%5B2%5D%5Bname%5D=\&columns%5B2%5D%5Bsearchable%5D=true\&columns%5B2%5D%5Borderable%5D=false\&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B3%5D%5Bdata%5D=batch\_date\&columns%5B3%5D%5Bname%5D=\&columns%5B3%5D%5Bsearchable%5D=true\&columns%5B3%5D%5Borderable%5D=false\&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B4%5D%5Bdata%5D=batch\_time.name\&columns%5B4%5D%5Bname%5D=\&columns%5B4%5D%5Bsearchable%5D=true\&columns%5B4%5D%5Borderable%5D=false\&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B5%5D%5Bdata%5D=branch.name\&columns%5B5%5D%5Bname%5D=\&columns%5B5%5D%5Bsearchable%5D=true\&columns%5B5%5D%5Borderable%5D=false\&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B6%5D%5Bdata%5D=course.name\&columns%5B6%5D%5Bname%5D=\&columns%5B6%5D%5Bsearchable%5D=true\&columns%5B6%5D%5Borderable%5D=false\&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B7%5D%5Bdata%5D=course\_mode.name\&columns%5B7%5D%5Bname%5D=\&columns%5B7%5D%5Bsearchable%5D=true\&columns%5B7%5D%5Borderable%5D=false\&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B8%5D%5Bdata%5D=trainer.name\&columns%5B8%5D%5Bname%5D=\&columns%5B8%5D%5Bsearchable%5D=true\&columns%5B8%5D%5Borderable%5D=false\&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B9%5D%5Bdata%5D=total\_seats\&columns%5B9%5D%5Bname%5D=\&columns%5B9%5D%5Bsearchable%5D=true\&columns%5B9%5D%5Borderable%5D=false\&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false\&start=0\&length=10\&search%5Bvalue%5D=\&search%5Bregex%5D=false
* Headers:

     - Authorization: Bearer YOUR\_API\_KEY (Required) Responses:

* Responses:

     - Status: 200 OK:

     - Response Body: {

    "basic\_stats": {

        "total\_batches": 21

    },

    "data": \[

        {

            "batch\_date": "2024-05-03",

            "batch\_id": 91,

            "batch\_num": 1091,

            "batch\_time": {

                "batch\_time\_id": 2,

                "created\_at": "Thu, 20 Apr 2023 17:46:06 GMT",

                "name": "10:00AM - 12:00PM",

                "updated\_at": "Thu, 20 Apr 2023 17:46:06 GMT"

            },

            "branch": {

                "branch\_id": 1,

                "created\_at": "Mon, 13 Mar 2023 22:37:26 GMT",

                "name": "FC Road, Pune",

                "updated\_at": "Mon, 13 Mar 2023 22:37:26 GMT"

            },

            "course": {

                "course\_category\_id": 1,

                "course\_id": 1,

                "created\_at": "Thu, 20 Apr 2023 17:46:29 GMT",

                "deleted": 0,

                "name": "Advanced Digital Marketing Course",

                "updated\_at": "Thu, 20 Apr 2023 17:46:29 GMT"

            },

            "course\_mode": {

                "course\_mode\_id": 1,

                "created\_at": "Thu, 20 Apr 2023 17:52:04 GMT",

                "deleted": 0,

                "name": "Classroom",

                "updated\_at": "Thu, 20 Apr 2023 17:52:04 GMT"

            },

            "deleted": 0,

            "name": "fcvijay10-12pm-May",

            "seats\_occupied": 23,

            "seats\_vacant": 17,

            "total\_seats": 40,

            "trainer": {

                "created\_at": "Sun, 30 Apr 2023 00:40:27 GMT",

                "deleted": 0,

                "email": "vijay\_gehlot\_trainer@test.com",

                "name": "Vijay Gehlot",

                "phone\_num": "+91-8552077668",

                "trainer\_id": 1,

                "updated\_at": "Sun, 30 Apr 2023 00:40:27 GMT",

                "user\_id": 2058

            }

        }

      ]

    }







**### 6. GET Students:**



Retrieves a list of all the Students.



* Method: GET
* Path: /students\_report/select-paginate-advanced?draw=1\&columns%5B0%5D%5Bdata%5D=student.name\&columns%5B0%5D%5Bname%5D=\&columns%5B0%5D%5Bsearchable%5D=true\&columns%5B0%5D%5Borderable%5D=false\&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B1%5D%5Bdata%5D=attendance\&columns%5B1%5D%5Bname%5D=\&columns%5B1%5D%5Bsearchable%5D=true\&columns%5B1%5D%5Borderable%5D=false\&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B2%5D%5Bdata%5D=assignment\&columns%5B2%5D%5Bname%5D=\&columns%5B2%5D%5Bsearchable%5D=true\&columns%5B2%5D%5Borderable%5D=false\&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B3%5D%5Bdata%5D=exam\&columns%5B3%5D%5Bname%5D=\&columns%5B3%5D%5Bsearchable%5D=true\&columns%5B3%5D%5Borderable%5D=false\&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B4%5D%5Bdata%5D=score\&columns%5B4%5D%5Bname%5D=\&columns%5B4%5D%5Bsearchable%5D=true\&columns%5B4%5D%5Borderable%5D=false\&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B5%5D%5Bdata%5D=certificate\&columns%5B5%5D%5Bname%5D=\&columns%5B5%5D%5Bsearchable%5D=true\&columns%5B5%5D%5Borderable%5D=false\&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B6%5D%5Bdata%5D=mock\_interview\&columns%5B6%5D%5Bname%5D=\&columns%5B6%5D%5Bsearchable%5D=true\&columns%5B6%5D%5Borderable%5D=false\&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B7%5D%5Bdata%5D=placement\_status\&columns%5B7%5D%5Bname%5D=\&columns%5B7%5D%5Bsearchable%5D=true\&columns%5B7%5D%5Borderable%5D=false\&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false\&start=0\&length=10\&search%5Bvalue%5D=\&search%5Bregex%5D=false
* Headers:

     - Authorization: Bearer YOUR\_API\_KEY (Required) Responses:

* Responses:

     - Status: 200 OK:

     - Response Body: {

   	{



&nbsp;   "basic\_stats": {

&nbsp;       "total\_student\_reports": 3075

&nbsp;   },

&nbsp;   "data": \[

&nbsp;       {

&nbsp;           "assignment": "",

&nbsp;           "attendance": "",

&nbsp;           "certificate": "",

&nbsp;           "exam": "",

&nbsp;           "mock\_interview": "",

&nbsp;           "placement\_status": null,

&nbsp;           "score": "",

&nbsp;           "student": {

&nbsp;               "admission\_date": "Fri, 04 Mar 2022 00:00:00 GMT",

&nbsp;               "agent\_id": 5,

&nbsp;               "alternate\_phone\_num": null,

&nbsp;               "area": "",

&nbsp;               "back\_image\_path": "",

&nbsp;               "batch\_id": null,

&nbsp;               "batch\_time\_id": 1,

&nbsp;               "branch\_id": 1,

&nbsp;               "city\_id": 1,

&nbsp;               "country\_id": 98,

&nbsp;               "course\_content\_class\_recording\_id": 1,

&nbsp;               "course\_content\_id": 1,

&nbsp;               "course\_id": 1,

&nbsp;               "course\_mode\_id": 1,

&nbsp;               "created\_at": "Mon, 13 Mar 2023 22:39:03 GMT",

&nbsp;               "deleted": 0,

&nbsp;               "dob": "Mon, 01 Jan 1990 00:00:00 GMT",

&nbsp;               "email": null,

&nbsp;               "front\_image\_path": "",

&nbsp;               "highest\_education": "",

&nbsp;               "is\_active": 1,

&nbsp;               "is\_document\_verified": 1,

&nbsp;               "json\_course\_learning\_progress": "",

&nbsp;               "json\_course\_learning\_progress\_class\_recording": null,

&nbsp;               "lead\_id": 2219,

&nbsp;               "name": "yash ghadghe",

&nbsp;               "occupation": "",

&nbsp;               "passport\_image\_path": "",

&nbsp;               "phone\_num": "+91-8983383844",

&nbsp;               "pincode": "",

&nbsp;               "purpose\_for\_course": "Other",

&nbsp;               "referred\_by": "",

&nbsp;               "source\_id": 4,

&nbsp;               "state\_id": 21,

&nbsp;               "student\_id": 373,

&nbsp;               "total\_fee": 20000,

&nbsp;               "total\_fee\_paid": 20000,

&nbsp;               "total\_pending\_fee": 0,

&nbsp;               "trainer\_id": 1,

&nbsp;               "updated\_at": "Mon, 13 Mar 2023 22:39:03 GMT",

&nbsp;               "user\_id": 387,

&nbsp;               "who\_you\_are": null

&nbsp;           }

&nbsp;       }

&nbsp;    ]

&nbsp; }

}





**### 6. GET Lecture Attendance By Id:**



Retrieves a list of all the Lecture Attendance.



* Method: GET
* Path: /lecture/attendance/:lecture\_id  

&nbsp; - Authorization: Bearer YOUR\_API\_KEY (Required) Responses:



* Parameters:

&nbsp;  - /:lecture\_id

* Responses:

     - Status: 200 OK:

     - Response Body: 

   	

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

                "admission\_date": "Fri, 04 Mar 2022 00:00:00 GMT",

                "agent\_id": 5,

                "alternate\_phone\_num": null,

                "area": "",

                "back\_image\_path": "",

                "batch\_id": null,

                "batch\_time\_id": 1,

                "branch\_id": 1,

                "city\_id": 1,

                "country\_id": 98,

                "course\_content\_class\_recording\_id": 1,

                "course\_content\_id": 1,

                "course\_id": 1,

                "course\_mode\_id": 1,

                "created\_at": "Mon, 13 Mar 2023 22:39:03 GMT",

                "deleted": 0,

                "dob": "Mon, 01 Jan 1990 00:00:00 GMT",

                "email": null,

                "front\_image\_path": "",

                "highest\_education": "",

                "is\_active": 1,

                "is\_document\_verified": 1,

                "json\_course\_learning\_progress": "",

                "json\_course\_learning\_progress\_class\_recording": null,

                "lead\_id": 2219,

                "name": "yash ghadghe",

                "occupation": "",

                "passport\_image\_path": "",

                "phone\_num": "+91-8983383844",

                "pincode": "",

                "purpose\_for\_course": "Other",

                "referred\_by": "",

                "source\_id": 4,

                "state\_id": 21,

                "student\_id": 373,

                "total\_fee": 20000,

                "total\_fee\_paid": 20000,

                "total\_pending\_fee": 0,

                "trainer\_id": 1,

                "updated\_at": "Mon, 13 Mar 2023 22:39:03 GMT",

                "user\_id": 387,

                "who\_you\_are": null

            }

        }

     ]

  }

}









&nbsp;	





**6. Batch by Id (GET):** curl 'http://127.0.0.1:3002/api/batch/select/47' \\

  -H 'Accept: \*/\*' \\

  -H 'Accept-Language: en-US,en-IN;q=0.9,en;q=0.8' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Connection: keep-alive' \\

  -H 'Content-Type: application/json; charset=utf-8' \\

  -H 'Origin: https://localhost' \\

  -H 'Sec-Fetch-Dest: empty' \\

  -H 'Sec-Fetch-Mode: cors' \\

  -H 'Sec-Fetch-Site: cross-site' \\

  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?1' \\

  -H 'sec-ch-ua-platform: "Android"'



**7. Update Attendance (PUT)** --> curl 'http://127.0.0.1:3002/api/lecture/attendance/update' \\

  -X 'PUT' \\

  -H 'Accept: application/json, text/javascript, \*/\*; q=0.01' \\

  -H 'Accept-Language: en-US,en-IN;q=0.9,en;q=0.8' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Connection: keep-alive' \\

  -H 'Content-Type: application/json; charset=UTF-8' \\

  -H 'Origin: https://localhost' \\

  -H 'Sec-Fetch-Dest: empty' \\

  -H 'Sec-Fetch-Mode: cors' \\

  -H 'Sec-Fetch-Site: cross-site' \\

  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?1' \\

  -H 'sec-ch-ua-platform: "Android"' \\

  --data-raw '\[{"attendance\_id":null,"attendance\_status":null},{"attendance\_id":1546,"attendance\_status":2},{"attendance\_id":1547,"attendance\_status":0},{"attendance\_id":1548,"attendance\_status":0},{"attendance\_id":1549,"attendance\_status":0},{"attendance\_id":1550,"attendance\_status":0},{"attendance\_id":1551,"attendance\_status":0},{"attendance\_id":1552,"attendance\_status":0},{"attendance\_id":1553,"attendance\_status":0},{"attendance\_id":1554,"attendance\_status":0},{"attendance\_id":1555,"attendance\_status":0},{"attendance\_id":1556,"attendance\_status":0},{"attendance\_id":1557,"attendance\_status":0},{"attendance\_id":1558,"attendance\_status":0},{"attendance\_id":1559,"attendance\_status":0},{"attendance\_id":1560,"attendance\_status":0},{"attendance\_id":1561,"attendance\_status":0},{"attendance\_id":1562,"attendance\_status":0},{"attendance\_id":1563,"attendance\_status":0},{"attendance\_id":1564,"attendance\_status":0}]'





**8.** **Add Session(Lecture) API (POST)** --> curl 'http://127.0.0.1:3002/api/lecture/add' \\

  -H 'Accept: application/json, text/javascript, \*/\*; q=0.01' \\

  -H 'Accept-Language: en-US,en-IN;q=0.9,en;q=0.8' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Connection: keep-alive' \\

  -H 'Content-Type: application/json; charset=UTF-8' \\

  -H 'Origin: https://localhost' \\

  -H 'Sec-Fetch-Dest: empty' \\

  -H 'Sec-Fetch-Mode: cors' \\

  -H 'Sec-Fetch-Site: cross-site' \\

  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?1' \\

  -H 'sec-ch-ua-platform: "Android"' \\

  --data-raw '\[{"name":"Vijay Gehlot-22/09/2025-11\[40]2","topic":"GEN AI","course\_mode\_id":1,"json\_batch\_ids":"\[40]","batch\_time\_id":2,"trainer\_id":"1","user\_id":"2058","zoom\_link":"","batch\_date":"22/09/2025"}]'





**9. Update Session (PUT)** --> curl 'http://127.0.0.1:3002/api/lecture/update/43' \\

  -X 'PUT' \\

  -H 'Accept: application/json, text/javascript, \*/\*; q=0.01' \\

  -H 'Accept-Language: en-US,en-IN;q=0.9,en;q=0.8' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Connection: keep-alive' \\

  -H 'Content-Type: application/json; charset=UTF-8' \\

  -H 'Origin: https://localhost' \\

  -H 'Sec-Fetch-Dest: empty' \\

  -H 'Sec-Fetch-Mode: cors' \\

  -H 'Sec-Fetch-Site: cross-site' \\

  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?1' \\

  -H 'sec-ch-ua-platform: "Android"' \\

  --data-raw '\[{"name":"Vijay Gehlot-29/09/2025-11\[45]1","topic":"JAVA5","course\_mode\_id":1,"batch\_time\_id":1,"trainer\_id":"1","user\_id":"2058","zoom\_link":"","batch\_date":"29/09/2025"}]'





**10. Add Assignment (POST)** --> curl 'http://127.0.0.1:3002/api/assignment/add' \\

  -H 'Accept: application/json, text/javascript, \*/\*; q=0.01' \\

  -H 'Accept-Language: en-US,en-IN;q=0.9,en;q=0.8' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Connection: keep-alive' \\

  -H 'Content-Type: application/json; charset=UTF-8' \\

  -H 'Origin: https://localhost' \\

  -H 'Sec-Fetch-Dest: empty' \\

  -H 'Sec-Fetch-Mode: cors' \\

  -H 'Sec-Fetch-Site: cross-site' \\

  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?1' \\

  -H 'sec-ch-ua-platform: "Android"' \\

  --data-raw '\[{"title":"Documentation of GEN AI","description":"Documentation of GEN AI","json\_batch\_ids":"\[30]","trainer\_id":"1","user\_id":"2058","assignment\_date":"22/09/2025","total\_marks":"500"}]'





**11. Update Assignment (PUT)** --> curl 'http://127.0.0.1:3002/api/assignment/update/12' \\

  -X 'PUT' \\

  -H 'Accept: application/json, text/javascript, \*/\*; q=0.01' \\

  -H 'Accept-Language: en-US,en-IN;q=0.9,en;q=0.8' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Connection: keep-alive' \\

  -H 'Content-Type: application/json; charset=UTF-8' \\

  -H 'Origin: https://localhost' \\

  -H 'Sec-Fetch-Dest: empty' \\

  -H 'Sec-Fetch-Mode: cors' \\

  -H 'Sec-Fetch-Site: cross-site' \\

  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?1' \\

  -H 'sec-ch-ua-platform: "Android"' \\

  --data-raw '\[{"title":"fc-2","description":"fc-2","assignment\_date":"29/09/2025","total\_marks":"2000","trainer\_id":"1","user\_id":"2058"}]'





**12. Assignment Submission View (GET):** curl 'http://127.0.0.1:3002/api/assignment/submission/view/8' \\

  -H 'Accept: \*/\*' \\

  -H 'Accept-Language: en-US,en-IN;q=0.9,en;q=0.8' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Connection: keep-alive' \\

  -H 'Content-Type: application/json; charset=utf-8' \\

  -H 'Origin: https://localhost' \\

  -H 'Sec-Fetch-Dest: empty' \\

  -H 'Sec-Fetch-Mode: cors' \\

  -H 'Sec-Fetch-Site: cross-site' \\

  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?1' \\

  -H 'sec-ch-ua-platform: "Android"'



**13. Assignment Submission Update (PUT):** curl 'http://127.0.0.1:3002/api/assignment/submission/update/8' \\

  -X 'PUT' \\

  -H 'Accept: application/json, text/javascript, \*/\*; q=0.01' \\

  -H 'Accept-Language: en-US,en-IN;q=0.9,en;q=0.8' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Connection: keep-alive' \\

  -H 'Content-Type: application/json; charset=UTF-8' \\

  -H 'Origin: https://localhost' \\

  -H 'Sec-Fetch-Dest: empty' \\

  -H 'Sec-Fetch-Mode: cors' \\

  -H 'Sec-Fetch-Site: cross-site' \\

  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?1' \\

  -H 'sec-ch-ua-platform: "Android"' \\

  --data-raw '\[{"submission\_id":86,"marks\_obtained":80,"submission\_status":1},{"submission\_id":87,"marks\_obtained":null,"submission\_status":0},{"submission\_id":88,"marks\_obtained":null,"submission\_status":0},{"submission\_id":89,"marks\_obtained":null,"submission\_status":0},{"submission\_id":90,"marks\_obtained":null,"submission\_status":0},{"submission\_id":91,"marks\_obtained":null,"submission\_status":0},{"submission\_id":92,"marks\_obtained":null,"submission\_status":0},{"submission\_id":93,"marks\_obtained":null,"submission\_status":0},{"submission\_id":94,"marks\_obtained":null,"submission\_status":0},{"submission\_id":95,"marks\_obtained":null,"submission\_status":0},{"submission\_id":96,"marks\_obtained":null,"submission\_status":0},{"submission\_id":97,"marks\_obtained":null,"submission\_status":0},{"submission\_id":98,"marks\_obtained":null,"submission\_status":0},{"submission\_id":99,"marks\_obtained":null,"submission\_status":0},{"submission\_id":100,"marks\_obtained":null,"submission\_status":0},{"submission\_id":101,"marks\_obtained":null,"submission\_status":0},{"submission\_id":102,"marks\_obtained":null,"submission\_status":0},{"submission\_id":103,"marks\_obtained":null,"submission\_status":0},{"submission\_id":104,"marks\_obtained":null,"submission\_status":0},{"submission\_id":105,"marks\_obtained":null,"submission\_status":0},{"submission\_id":106,"marks\_obtained":null,"submission\_status":0},{"submission\_id":107,"marks\_obtained":null,"submission\_status":0},{"submission\_id":108,"marks\_obtained":null,"submission\_status":0},{"submission\_id":109,"marks\_obtained":null,"submission\_status":0},{"submission\_id":110,"marks\_obtained":null,"submission\_status":0},{"submission\_id":111,"marks\_obtained":null,"submission\_status":0},{"submission\_id":112,"marks\_obtained":null,"submission\_status":0},{"submission\_id":113,"marks\_obtained":null,"submission\_status":0},{"submission\_id":114,"marks\_obtained":null,"submission\_status":0},{"submission\_id":115,"marks\_obtained":null,"submission\_status":0},{"submission\_id":116,"marks\_obtained":null,"submission\_status":0},{"submission\_id":117,"marks\_obtained":null,"submission\_status":0},{"submission\_id":118,"marks\_obtained":null,"submission\_status":0}]'



**14. GET Trainer** --> curl 'http://127.0.0.1:3002/api/trainer/select-paginate-advanced?draw=1\&columns%5B0%5D%5Bdata%5D=trainer\_id\&columns%5B0%5D%5Bname%5D=\&columns%5B0%5D%5Bsearchable%5D=true\&columns%5B0%5D%5Borderable%5D=false\&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B1%5D%5Bdata%5D=name\&columns%5B1%5D%5Bname%5D=\&columns%5B1%5D%5Bsearchable%5D=true\&columns%5B1%5D%5Borderable%5D=false\&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B2%5D%5Bdata%5D=phone\_num\&columns%5B2%5D%5Bname%5D=\&columns%5B2%5D%5Bsearchable%5D=true\&columns%5B2%5D%5Borderable%5D=false\&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B3%5D%5Bdata%5D=email\&columns%5B3%5D%5Bname%5D=\&columns%5B3%5D%5Bsearchable%5D=true\&columns%5B3%5D%5Borderable%5D=false\&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B4%5D%5Bdata%5D=\&columns%5B4%5D%5Bname%5D=\&columns%5B4%5D%5Bsearchable%5D=true\&columns%5B4%5D%5Borderable%5D=false\&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false\&start=0\&length=10\&search%5Bvalue%5D=\&search%5Bregex%5D=false\&\_=1757254092211' \\

  -H 'Accept: application/json, text/javascript, \*/\*; q=0.01' \\

  -H 'Accept-Language: en-US,en-IN;q=0.9,en;q=0.8' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Connection: keep-alive' \\

  -H 'Origin: https://localhost' \\

  -H 'Sec-Fetch-Dest: empty' \\

  -H 'Sec-Fetch-Mode: cors' \\

  -H 'Sec-Fetch-Site: cross-site' \\

  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?1' \\

  -H 'sec-ch-ua-platform: "Android"'



**15. Trainer By Id (GET)** --> curl 'http://127.0.0.1:3002/api/trainer/select/1' \\

  -H 'Accept: application/json, text/javascript, \*/\*; q=0.01' \\

  -H 'Accept-Language: en-US,en-IN;q=0.9,en;q=0.8' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Connection: keep-alive' \\

  -H 'Content-Type: application/json; charset=utf-8' \\

  -H 'Origin: https://localhost' \\

  -H 'Sec-Fetch-Dest: empty' \\

  -H 'Sec-Fetch-Mode: cors' \\

  -H 'Sec-Fetch-Site: cross-site' \\

  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?1' \\

  -H 'sec-ch-ua-platform: "Android"'



**16. Update Trainer (PUT)** --> curl 'http://127.0.0.1:3002/api/user/update/2058' \\

  -X 'PUT' \\

  -H 'Accept: application/json, text/javascript, \*/\*; q=0.01' \\

  -H 'Accept-Language: en-US,en-IN;q=0.9,en;q=0.8' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Connection: keep-alive' \\

  -H 'Content-Type: application/json; charset=UTF-8' \\

  -H 'Origin: https://localhost' \\

  -H 'Sec-Fetch-Dest: empty' \\

  -H 'Sec-Fetch-Mode: cors' \\

  -H 'Sec-Fetch-Site: cross-site' \\

  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?1' \\

  -H 'sec-ch-ua-platform: "Android"' \\

  --data-raw '{"name":"Vijay Gehlot","phone\_num":"+91-8552077668","email":"vijay\_gehlot\_trainer@test.com"}'





**17.All Batches (GET)** --> curl 'http://127.0.0.1:3002/api/batch/all' \\

  -H 'sec-ch-ua-platform: "Android"' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Referer;' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?1' \\

  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \\

  -H 'Accept: application/json, text/javascript, \*/\*; q=0.01' \\

  -H 'Content-Type: application/json; charset=utf-8'





**18. All Lecture (GET)** --> curl 'http://127.0.0.1:3002/api/lecture/all' \\

  -H 'Accept: \*/\*' \\

  -H 'Accept-Language: en-US,en-IN;q=0.9,en;q=0.8' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Connection: keep-alive' \\

  -H 'Content-Type: application/json; charset=utf-8' \\

  -H 'Origin: https://localhost' \\

  -H 'Sec-Fetch-Dest: empty' \\

  -H 'Sec-Fetch-Mode: cors' \\

  -H 'Sec-Fetch-Site: cross-site' \\

  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?1' \\

  -H 'sec-ch-ua-platform: "Android"'







 

