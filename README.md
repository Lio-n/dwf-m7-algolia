# **Challenges**

We propose you to program a REST API with the following endpoints:

## **POST** /shops

Receive:

```javascript
{
 email: string,
 category: string,
 address: string,
 lat: float,
 lng: float,
}
```

## **GET** /shops

## **GET** /shops/:id

## **PUT** /shops/:id

## **GET** /shops-nearby?lat&lng

The API **should allow you to register and list different stores** with the data you want, including geodata (locate the stores where you like).

In addition, **you must create a web search engine using [Mapbox](https://www.mapbox.com/)**. For this, you have to register and, after confirming your account, go to **[this tutorial](https://www.mapbox.com/install/js/cdn-install/)**.

You can **guide yourself with [this code base](https://gist.github.com/zapaiamarce/40a210634d06b62d7e2dc4fc4eaacb43)**. In the MAPBOX\*TOKEN variable (index.js), you have to put \*\*\*[your token](https://account.mapbox.com/access-tokens/)\_\*\*.
