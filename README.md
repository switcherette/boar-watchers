# Boar Watchers: wild boar tracker :boar:
This SPA allows users to report any unusual boar sightings.

*Why would somebody need to do that?*
The wild boar (Sus scrofa) is a native species in Catalonia. In recent years, it has proliferated to the point that we have seen an increase in incidents caused by their presence in several populated areas around Collserola, including Barcelona. Urban food sources (troughs, food for cats, waste, etc.) are the reason that boar are colonising the urban environment in a process of adaption that has been evolving over several generations; however, wild boars are not an urban species and should therefore not be in the urban environment, because of the risks they bring and because they cannot be re-introduced into the wild afterwards.

Work must be done to keep them native to the natural environment and to remove them from the city, and being able to locate them and their urban food sources is the first step towards it.

# What you need to know

1. [Get started](#setup)
1.1 [Dependencies](#dependencies)
1.2 [Development](#development)
2. [Database schema](#database)
3. [API routes plan](#API-routes)
4. [Full stack architecture](#architecture)

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- Navigate into the app folder `cd client` and run `npm install`. This will install client dependencies (React).

This project requires several additional libraries to be installed:
- React router `"https://reactrouter.com/"`
- Mapbox GL JS `"https://docs.mapbox.com/mapbox-gl-js/guides/"`
- react-map.gl Geocoder `"https://github.com/visgl/react-map-gl"`
- Noty `"https://ned.im/noty/#/"`
- react-super-responsive-table `"https://github.com/coston/react-super-responsive-table"`
- Bootstrap `"https://getbootstrap.com/"`


### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called boartracker: `create database boartracker`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=boartracker
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table called 'sightings' in your database.


### Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.


Happy coding!


## Database schema

Database "boartrackers", 1 table ("sightings"):

| FIELD            | DATA TYPE                    |
|------------------|------------------------------|
| id               | integer (key, autogenerated) |
| timestamp        | timestamp                    |
| latitude         | float                        |
| longitude        | float                        |
| adults           | integer                      |
| piglets          | integer                      |
| humanInteraction | tinyint                      |
| comments         | varchar(255)                 |
