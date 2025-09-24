##### **# Trainer Panel (PIIDM) Management API Documentation**



**## Base URL**



`http://127.0.0.1:3002/api`



**## Authentication**



All API requests require an `Authorization` header with a Bearer token.



Authorization: Bearer YOUR\_API\_KEY





###### **## Endpoints**



**### 1. Get Lectures**



Retrieves a list of all the Lectures.



\- Method: `GET`

\- Path: `/users`

\- Headers:

&nbsp;   - `Authorization`: `Bearer YOUR\_API\_KEY` (Required)

\- Responses:

&nbsp;   - `200 OK`:

&nbsp;       ```json



&nbsp;   "basic\_stats": {

&nbsp;       "total\_lectures": 46

&nbsp;   },

&nbsp;   "data": \[

&nbsp;       {

&nbsp;           "batch\_date": "2025-09-30",

&nbsp;           "batch\_time": {

&nbsp;               "batch\_time\_id": 2,

&nbsp;               "created\_at": "Thu, 20 Apr 2023 17:46:06 GMT",

&nbsp;               "name": "10:00AM - 12:00PM",

&nbsp;               "updated\_at": "Thu, 20 Apr 2023 17:46:06 GMT"

&nbsp;           },

&nbsp;           "course\_mode": {

&nbsp;               "course\_mode\_id": 1,

&nbsp;               "created\_at": "Thu, 20 Apr 2023 17:52:04 GMT",

&nbsp;               "deleted": 0,

&nbsp;               "name": "Classroom",

&nbsp;               "updated\_at": "Thu, 20 Apr 2023 17:52:04 GMT"

&nbsp;           },

&nbsp;           "created\_at": "Mon, 22 Sep 2025 06:35:51 GMT",

&nbsp;           "deleted": 0,

&nbsp;           "is\_active": 1,

&nbsp;           "json\_batch\_ids": "\[45]",

&nbsp;           "lecture\_id": 44,

&nbsp;           "name": "Vijay Gehlot-18/09/2025-11\[45]2",

&nbsp;           "topic": "CSS selectors4",

&nbsp;           "trainer": {

&nbsp;               "created\_at": "Sun, 30 Apr 2023 00:40:27 GMT",

&nbsp;               "deleted": 0,

&nbsp;               "email": "vijay\_gehlot\_trainer@test.com",

&nbsp;               "name": "Vijay Gehlot",

&nbsp;               "phone\_num": "+91-8552077668",

&nbsp;               "trainer\_id": 1,

&nbsp;               "updated\_at": "Sun, 30 Apr 2023 00:40:27 GMT",

&nbsp;               "user\_id": 2058

&nbsp;           },

&nbsp;           "updated\_at": "Mon, 22 Sep 2025 06:35:51 GMT",

&nbsp;           "user\_id": 2058,

&nbsp;           "zoom\_link": ""

&nbsp;       },

&nbsp;   ]







**### 2. Create Lectures**





http://127.0.0.1:3002/api/lecture/add









**2. Assignments API (GET)** --> curl 'http://127.0.0.1:3002/api/assignment/select-paginate-advanced?draw=1\&columns%5B0%5D%5Bdata%5D=title\&columns%5B0%5D%5Bname%5D=\&columns%5B0%5D%5Bsearchable%5D=true\&columns%5B0%5D%5Borderable%5D=false\&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B1%5D%5Bdata%5D=description\&columns%5B1%5D%5Bname%5D=\&columns%5B1%5D%5Bsearchable%5D=true\&columns%5B1%5D%5Borderable%5D=false\&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B2%5D%5Bdata%5D=assignment\_date\&columns%5B2%5D%5Bname%5D=\&columns%5B2%5D%5Bsearchable%5D=true\&columns%5B2%5D%5Borderable%5D=false\&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B3%5D%5Bdata%5D=total\_combined\_batches\&columns%5B3%5D%5Bname%5D=\&columns%5B3%5D%5Bsearchable%5D=true\&columns%5B3%5D%5Borderable%5D=false\&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B4%5D%5Bdata%5D=total\_marks\&columns%5B4%5D%5Bname%5D=\&columns%5B4%5D%5Bsearchable%5D=true\&columns%5B4%5D%5Borderable%5D=false\&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B5%5D%5Bdata%5D=\&columns%5B5%5D%5Bname%5D=\&columns%5B5%5D%5Bsearchable%5D=true\&columns%5B5%5D%5Borderable%5D=false\&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false\&start=0\&length=10\&search%5Bvalue%5D=\&search%5Bregex%5D=false\&\_=1757251982282' \\

  -H 'Accept: application/json, text/javascript, \*/\*; q=0.01' \\

  -H 'Accept-Language: en-US,en-IN;q=0.9,en;q=0.8' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Connection: keep-alive' \\

  -H 'Origin: https://localhost' \\

  -H 'Sec-Fetch-Dest: empty' \\

  -H 'Sec-Fetch-Mode: cors' \\

  -H 'Sec-Fetch-Site: cross-site' \\

  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?0' \\

  -H 'sec-ch-ua-platform: "Windows"'





**3. Batches API (GET)** --> curl 'http://127.0.0.1:3002/api/batch/select-paginate-advanced?draw=1\&columns%5B0%5D%5Bdata%5D=batch\_num\&columns%5B0%5D%5Bname%5D=\&columns%5B0%5D%5Bsearchable%5D=true\&columns%5B0%5D%5Borderable%5D=false\&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B1%5D%5Bdata%5D=\&columns%5B1%5D%5Bname%5D=\&columns%5B1%5D%5Bsearchable%5D=true\&columns%5B1%5D%5Borderable%5D=false\&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B2%5D%5Bdata%5D=name\&columns%5B2%5D%5Bname%5D=\&columns%5B2%5D%5Bsearchable%5D=true\&columns%5B2%5D%5Borderable%5D=false\&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B3%5D%5Bdata%5D=batch\_date\&columns%5B3%5D%5Bname%5D=\&columns%5B3%5D%5Bsearchable%5D=true\&columns%5B3%5D%5Borderable%5D=false\&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B4%5D%5Bdata%5D=batch\_time.name\&columns%5B4%5D%5Bname%5D=\&columns%5B4%5D%5Bsearchable%5D=true\&columns%5B4%5D%5Borderable%5D=false\&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B5%5D%5Bdata%5D=branch.name\&columns%5B5%5D%5Bname%5D=\&columns%5B5%5D%5Bsearchable%5D=true\&columns%5B5%5D%5Borderable%5D=false\&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B6%5D%5Bdata%5D=course.name\&columns%5B6%5D%5Bname%5D=\&columns%5B6%5D%5Bsearchable%5D=true\&columns%5B6%5D%5Borderable%5D=false\&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B7%5D%5Bdata%5D=course\_mode.name\&columns%5B7%5D%5Bname%5D=\&columns%5B7%5D%5Bsearchable%5D=true\&columns%5B7%5D%5Borderable%5D=false\&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B8%5D%5Bdata%5D=trainer.name\&columns%5B8%5D%5Bname%5D=\&columns%5B8%5D%5Bsearchable%5D=true\&columns%5B8%5D%5Borderable%5D=false\&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B9%5D%5Bdata%5D=total\_seats\&columns%5B9%5D%5Bname%5D=\&columns%5B9%5D%5Bsearchable%5D=true\&columns%5B9%5D%5Borderable%5D=false\&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false\&start=0\&length=10\&search%5Bvalue%5D=\&search%5Bregex%5D=false' \\

  -H 'Accept: \*/\*' \\

  -H 'Accept-Language: en-US,en-IN;q=0.9,en;q=0.8' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Connection: keep-alive' \\

  -H 'Content-Type: application/json' \\

  -H 'Origin: http://localhost:5173' \\

  -H 'Referer: http://localhost:5173/' \\

  -H 'Sec-Fetch-Dest: empty' \\

  -H 'Sec-Fetch-Mode: cors' \\

  -H 'Sec-Fetch-Site: cross-site' \\

  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?1' \\

  -H 'sec-ch-ua-platform: "Android"'





**4. Students API (GET)** --> curl 'http://127.0.0.1:3002/api/students\_report/select-paginate-advanced?draw=1\&columns%5B0%5D%5Bdata%5D=student.name\&columns%5B0%5D%5Bname%5D=\&columns%5B0%5D%5Bsearchable%5D=true\&columns%5B0%5D%5Borderable%5D=false\&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B1%5D%5Bdata%5D=attendance\&columns%5B1%5D%5Bname%5D=\&columns%5B1%5D%5Bsearchable%5D=true\&columns%5B1%5D%5Borderable%5D=false\&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B2%5D%5Bdata%5D=assignment\&columns%5B2%5D%5Bname%5D=\&columns%5B2%5D%5Bsearchable%5D=true\&columns%5B2%5D%5Borderable%5D=false\&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B3%5D%5Bdata%5D=exam\&columns%5B3%5D%5Bname%5D=\&columns%5B3%5D%5Bsearchable%5D=true\&columns%5B3%5D%5Borderable%5D=false\&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B4%5D%5Bdata%5D=score\&columns%5B4%5D%5Bname%5D=\&columns%5B4%5D%5Bsearchable%5D=true\&columns%5B4%5D%5Borderable%5D=false\&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B5%5D%5Bdata%5D=certificate\&columns%5B5%5D%5Bname%5D=\&columns%5B5%5D%5Bsearchable%5D=true\&columns%5B5%5D%5Borderable%5D=false\&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B6%5D%5Bdata%5D=mock\_interview\&columns%5B6%5D%5Bname%5D=\&columns%5B6%5D%5Bsearchable%5D=true\&columns%5B6%5D%5Borderable%5D=false\&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false\&columns%5B7%5D%5Bdata%5D=placement\_status\&columns%5B7%5D%5Bname%5D=\&columns%5B7%5D%5Bsearchable%5D=true\&columns%5B7%5D%5Borderable%5D=false\&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=\&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false\&start=0\&length=10\&search%5Bvalue%5D=\&search%5Bregex%5D=false' \\

  -H 'Accept: \*/\*' \\

  -H 'Accept-Language: en-US,en-IN;q=0.9,en;q=0.8' \\

  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg' \\

  -H 'Connection: keep-alive' \\

  -H 'Content-Type: application/json' \\

  -H 'Origin: http://localhost:5173' \\

  -H 'Referer: http://localhost:5173/' \\

  -H 'Sec-Fetch-Dest: empty' \\

  -H 'Sec-Fetch-Mode: cors' \\

  -H 'Sec-Fetch-Site: cross-site' \\

  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \\

  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \\

  -H 'sec-ch-ua-mobile: ?1' \\

  -H 'sec-ch-ua-platform: "Android"'





**5. Lecture Attendance (Student Attendance) by Id (GET)**: curl 'http://127.0.0.1:3002/api/lecture/attendance/42' \\

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







 

