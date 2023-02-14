const { MongoClient } = require('mongodb');
require('dotenv').config();

// database connection
const mongoClient = new MongoClient(
  'mongodb+srv://admin1:3#r3AysG&f^d4$*M@cluster0.imrf7.mongodb.net/RATS?retryWrites=true&w=majority'
);
const clientPromise = mongoClient.connect();

const handler = async (event) => {
  try {
    const database = (await clientPromise).db('RATS');
    const Listings_collection = database.collection('listings');
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
