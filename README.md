# leader-board

## Request a Token:

| POST /authenticate |
|--------------------|

*Note: A token is required to access all other endpoints. Token must be provided in the headers as a key-value pair of `authorization: <your token>`*

Request body must include:
```
{
  email: '<youremail@email.com>',
  appName: 'Leader Board'
}
```
*Note: appName MUST be Leader Board*

Response: 
``` 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdHVyaW5nLmlvIiwiYXBwTmFtZSI6IkxlYWRlciBCb2FyZCIsImlhdCI6MTUzMTQxNzI4MSwiZXhwIjoxNTMxNTkwMDgxLCJqdGkiOiJhZG1pbiJ9.ol_KL_Q1e6xZ54G-_axcm5s2fbTsfnR1Eo4Gn-dMcnw"

}
```

## Get All Events:

| GET api/v1/events |
|--------------------|

*This will return a list of all available events.*

*Note: Don't forget to include your token in the headers!*

Response:
```
{
    "status": "success",
    "events": [
        {
            "id": 1,
            "name": "Olympics",
            "year": "2018",
            "location": "PyeongChang"
        }
    ]
}
```

## Get All Riders:

| GET api/v1/riders |
|--------------------|

*This will return a list of all available riders.*

*Note: Don't forget to include your token in the headers!*

Response:
```
{
    "status": "success",
    "riders": [
        {
            "id": 1,
            "name": "Chloe KIM",
            "gender": "womens",
            "img": "https://stillimg.olympic.org/flags/1x1/340x340/usa.png?interpolation=lanczos-none&resize=45:45, https://stillimg.olympic.org/flags/1x1/340x340/usa.png?interpolation=lanczos-none&resize=90:90 2x",
            "country": "USA"
        },
        {
            "id": 2,
            "name": "Jiayu LIU",
            "gender": "womens",
            "img": "https://stillimg.olympic.org/flags/1x1/340x340/chn.png?interpolation=lanczos-none&resize=45:45, https://stillimg.olympic.org/flags/1x1/340x340/chn.png?interpolation=lanczos-none&resize=90:90 2x",
            "country": "CHN"
        },
        'etc...'
    ]
}
```

## Get All Results For a Particular Rider:

| GET api/v1/riders/:id/results |
|--------------------|

*This will return a list of all available results for a particular rider.*

*Note: Don't forget to include your token in the headers!*

Response:
```
{
    "status": "success",
    "results": [
        {
            "id": 25,
            "event_id": 1,
            "division_id": 8,
            "rider_id": 25,
            "run_1": "no data",
            "run_2": "no data",
            "run_3": "no data",
            "final": "1"
        }
    ]
}
```

## Get All Results For a Particular Division For a Particular Event:

| GET /api/v1/events/:eventId/division/:divId/results |
|--------------------|

*This will return a list of all available results for a particular division for a particular event. For example, if you wanted all results for the Halfpipe division of the 2018 PyeongChang Olympics.*

*Note: Don't forget to include your token in the headers!*

Response:
```
{
    "status": "success",
    "results": [
        {
            "id": 25,
            "event_id": 1,
            "division_id": 8,
            "rider_id": 25,
            "run_1": "no data",
            "run_2": "no data",
            "run_3": "no data",
            "final": "1"
        },
        {
            "id": 26,
            "event_id": 1,
            "division_id": 8,
            "rider_id": 26,
            "run_1": "no data",
            "run_2": "no data",
            "run_3": "no data",
            "final": "2"
        },
        'etc...'
    ]
}
```

## Query The Media Endpoint For All Of The Media For A Particular Rider:

| GET /api/v1/media/?rider=rider_id |
|--------------------|

*This will return a list of all media for a certain rider. For example: if you wanted all of the media for Shaun White you would use the endpoint /api/v1/media?rider=25*

*Note: Don't forget to include your token in the headers!*

Response:
```
{
    "status": "success",
    "media": [
        {
            "id": 3,
            "event_id": 1,
            "division_id": 8,
            "rider_id": 25,
            "result_id": 25,
            "media_url": "youtube.com/test_url"
        }
    ]
}
```

## Post a Result:

| POST /api/v1/results |
|--------------------|

*This will add a new result to the database*

**YOU WILL ONLY BE ABLE TO ACCESS THIS ENDPOINT IF YOU HAVE ADMIN ACCESS**

*Note: Don't forget to include your token in the headers!*

Request body key-value pairs:

| Key       | Value           | Required? |
| ------------- |-------------|-----------|
| event_id      | integer  | **YES** |
| division_id      | integer | **YES** |
| rider_id | integer | **YES** |
| run_1 | string | *optional* |
| run_2 | string | *optional* |
| run_3 | string | *optional* |
| final | string | *optional* |

Response:
```
{
    "status": "Success! Your result has been added.",
    "resultId": 54
}
```

## Post Media:

| POST /api/v1/media |
|--------------------|

*This will add new media to the database*

**YOU WILL ONLY BE ABLE TO ACCESS THIS ENDPOINT IF YOU HAVE ADMIN ACCESS**

*Note: Don't forget to include your token in the headers!*

Request body key-value pairs:

| Key       | Value           | Required? |
| ------------- |-------------|-----------|
| event_id      | integer  | **YES** |
| division_id      | integer | **YES** |
| rider_id | integer | **YES** |
| result_id | integer | **YES** |
| media_url | string | **YES** |

Response:
```
{
    "message": "Success! Your media has been added.",
    "mediaId": 3
}
```

## Delete Media:

| DELETE /api/v1/media/:id |
|--------------------|

*This will delete media from the database*

**YOU WILL ONLY BE ABLE TO ACCESS THIS ENDPOINT IF YOU HAVE ADMIN ACCESS**

*Note: Don't forget to include your token in the headers!*

Response:
```
{
    "message": "Success! Media ID #2 had been removed."
}
```

## Delete a Result:

| DELETE /api/v1/results/:id |
|--------------------|

*This will delete a result from the database*

**YOU WILL ONLY BE ABLE TO ACCESS THIS ENDPOINT IF YOU HAVE ADMIN ACCESS**

*Note: Don't forget to include your token in the headers!*

Response:
```
{
    "message": "Success! Result ID #55 had been removed."
}
```

## Update a Result:

| PATCH /api/v1/results/:id |
|--------------------|

*This will allow you to change data for a result stored in the database*

**YOU WILL ONLY BE ABLE TO ACCESS THIS ENDPOINT IF YOU HAVE ADMIN ACCESS**

*Note: Don't forget to include your token in the headers!*

**Body MUST include a key of `result` with a value of an object containing the key-value pairs of the column you want to update and its updated value. For example:**
```
{
    "result": {
      "run_1": "47", 
      "run_2": "49"
    }
}
```

Result object key-value pairs:

| Key       | Value           | Required? |
| ------------- |-------------|-----------|
| run_1 | string | *optional* |
| run_2 | string | *optional* |
| run_3 | string | *optional* |
| final | string | *optional* |

Response:
```
{
    "status": "success",
    "updatedResults": {
        "run_1": "47",
        "run_2": "49"
    }
}
```

## Update a Rider:

| PATCH /api/v1/riders/:id |
|--------------------|

*This will allow you to change data for a rider stored in the database*

**YOU WILL ONLY BE ABLE TO ACCESS THIS ENDPOINT IF YOU HAVE ADMIN ACCESS**

*Note: Don't forget to include your token in the headers!*

**Body MUST include a key of `rider` with a value of an object containing the key-value pairs of the column you want to update and its updated value. For example:**
```
{
    "rider": {
      "img": "https://image.test"
    }
}
```

Result object key-value pairs:

| Key       | Value           | Required? |
| ------------- |-------------|-----------|
| name | string | *optional* |
| gender | string | *optional* |
| img | string | *optional* |
| country | string | *optional* |

Response:
```
{
    "status": "success",
    "updatedRiderInfo": {
        "img": "https://image.test"
    }
}
```