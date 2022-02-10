## Some bugs caused by the API

- The API throws a bad request error when you try to update or delete a user with an ID above 10 because it has just 10 objects. That is why I added the dispatch code in the catch block for only these users for a seamless experience.
- It also throws a bad request when you try to create a user with an id less than or equal to 10. I fixed this by starting the id of new users from 11.
