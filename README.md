Jun Wei's URL Shortener
===


## Getting Started

Try it out on https://kippy.herokuapp.com/

## API

If you prefer to use Postman, you can make a POST request to:

https://kippy.herokuapp.com/api/shortener/shorten

an example JSON body:
```json
{
    "url": "https://www.google.com",
    "readableUrl": true | false
}
```

Example cURL
```
curl -H "Content-Type: application/json" -X POST -d '{"url":"https://www.google.com","readableUrl":true}' https://kippy.herokuapp.com/api/shortener/shorten
```

## How does it work?

The URL given is hashed using SHA-512 to a hash of 128 characters. The first 8 characters of the hash is taken as the short URL path, which will be saved into MongoDB.
With 8 characters, there are roughly 16^8 ≈ 4 billion permutations for my short URLs.

For the readable URL feature, I used a random word generator package to generate an adjective and an animal, combining it to get the short URL path.
The package has more than 1400 adjectives and 350 animals, so that is roughly 1400*350 ≈ 500,000 combinations

Note that the same URL is mapped to the same short URL. This is a feature, not a bug.




## Installing the code 

Simple fork the repository or clone it and run

```
npm install
```

To use mongoDB, create a .env file and place your Cluster URL inside
```
CLUSTER_URL=foobar
```

To run the local server, run
```
npm run start
```

To execute the tests
```
npm run test
```

## Possible improvements in the future

- create tests for the API endpoints using supertest
- Option to have an expiration on the short URLs generated
- Although out of scope, perhaps a QR code generator can be considered

