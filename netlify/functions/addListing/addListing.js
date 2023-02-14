const { MongoClient } = require('mongodb');
require('dotenv').config();

// database connection
const mongoClient = new MongoClient(
  'mongodb+srv://jadtaha:8JlOTrtdfH1u@cluster0.imrf7.mongodb.net/listingsDB?retryWrites=true&w=majority'
);
const clientPromise = mongoClient.connect();

const handler = async (event) => {
  try {
    const database = (await clientPromise).db('listingsDB');
    const Listings_collection = database.collection('Listings');
    const listing = JSON.parse(event.body);
    await Listings_collection.insertOne(listing);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Listing added successfully',
        result: JSON.stringify(listing),
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error adding listing',
        result: error.toString(),
      }),
    };
  } finally {
    mongoClient.close();
  }
};

module.exports = { handler };
