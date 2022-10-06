writeCode

Insert the data present in users.json into local mongodb database using `mongoimport` into a database called sample and collection named as users.

Write aggregation queries to perform following tasks.

1. Find all users who are active.

db.users.aggregate([{$group: {_id: "$isActive", count: {$sum: 1}}}])

2. Find all users whose name includes `blake` case insensitive.

db.users.aggregate([
  {
    $match: {
      "name": {
        $regex: "blake",
        $options: "i"
      }
    }
  }, {
    $group: {
      _id: $name,
      count: { $sum: 1 },
    },
  }
  ])

3. Find all males.

db.users.aggregate([{$match: {gender: "male"}}, {$group: {_id: "male", count: {$sum: 1}}}])

4. Find all active males.

db.users.aggregate([{$match: {gender: "male", isActive: true}}, {$group: {_id: "male and active", count: {$sum: 1}}}])


5. Find all active females whose age is >= 25.

db.users.aggregate([{$match: {gender: "female", isActive: true, age: {$lt: 26} }}, {$group: {_id: "female and active under 25", count: {$sum: 1}}}])



6. Find all 40+ males with green eyecolor.

db.users.aggregate([{$match: {gender: "male", eyeColor: "green", age: {$gt: 40}}}, {$group: {_id: "40+ male and green eye color", count: {$sum: 1}}}])

7. Find all blue eyed men working in 'USA'.

db.users.aggregate([{$match: {gender: "male", eyeColor: "blue", age: {$gt: 18}, "company.location.country": "USA"}}, {$group: {_id: "working male blue eye color in USA", count: {$sum: 1}}}])

8. Find all female working in Germany with green eyes and apple as favoriteFruit.

db.users.aggregate([{$match: {gender: "male", eyeColor: "green", age: {$gt: 18}, "company.location.country": "Germany", favoriteFruit: "apple" }}, {$group: {_id: "working female green eye color in Germany with Apple fav", count: {$sum: 1}}}])


9. Count total male and females.


db.users.aggregate([
  {
    $group: {
      _id: "$gender",
      count: { $sum: 1 },
    },
  },
]);

10. Count all whose eyeColor is green.

db.users.aggregate([{$match: {eyeColor: "green"}}, {$group: {_id: "eye color green", count: {$sum: 1}}}])




11. Count all 20+ females who have brown eyes.

db.users.aggregate([{$match: {eyeColor: "brown", gender: "female", age: {$gt: 20}}}, {$group: {_id: "eye color brown 20+ female", count: {$sum: 1}}}])


12. Count all occurences of all eyeColors.

db.users.aggregate([
  {
    $group: {
      _id: "$eyeColor",
      count: { $sum: 1 },
    },
  },
]);
    Something like:-

    

```
blue -> 30
brown -> 67
green -> 123
```

13. Count all females whose tags array include `amet` in it.



14. Find the average age of entire collection

db.users.aggregate([
  {
    $group: {
      _id: "$gender",
      avg_age: { $avg: "$age" },
    },
  },
]);

15. Find the average age of males and females i.e. group them by gender.

db.users.aggregate([
  {
    $group: {
      _id: "$gender",
      avg_age: { $avg: "$age" },
    },
  },
]);

16. Find the user with maximum age.


db.users.find().sort({age: -1}).limit(1)

or 

db.users.aggregate([
  {
    $group: {
      _id: null,
      maxAge: { $max: "$age" },
    },
  },
]);





17. Find the document with minimum age.

db.users.aggregate([
  {
    $group: {
      _id: null,
      mixnge: { $min: "$age" },
    },
  },
]);


or db.users.find().sort({age: 1}).limit(1)




18. Find the sum of ages of all males and females.

db.users.aggregate([
  {
    $group: {
      _id: null,
      ageSum: { $sum: "$age" },
    },
  },
]);


19. Group all males by their eyeColor.

db.users.aggregate([
  {$match: {"gender": "male"}},
  {$group: {
    _id: "$eyeColor",
    count: {$sum: 1}

  }}
]);

20. group all 30+ females by their age.

db.users.aggregate([
  {$match: {"gender": "female", "age": {$gt: 30}}},
  {$group: {
    _id: "$age",
    count: {$sum: 1}
  }}
]);

21. Group all 23+ males with blue eyes working in Germany.

db.users.aggregate([
  {$match: {gender: "male", age: {$gt: 23}, eyeColor: "blue"}},
  {$group: {
    _id: "$company.location.country",
    count: {$sum: 1}
  }}
]);



22. Group all by tag names i.e. use \$unwind since tags are array.

db.users.aggregate([
  {$unwind: "$tags"},
  {$group: {
    _id: "$tags",
    count: {$sum: 1}
  }}
]);

23. Group all males whose favoriteFruit is `banana` who have registered before 2015.

db.users.aggregate([
  {$match:{$and: [{gender: "male", registered: {$lte: ISODate("2015-01-01T00:00:00.000Z")}}]}},
  {$group: {
    _id: "$favoriteFruit",
    count: {$sum: 1},
  }}
]);



24. Group all females by their favoriteFruit.

db.users.aggregate([
  {$match: {gender: "female"}},
  {$group: {
    _id: "$favoriteFruit",
    count: {$sum: 1}
  }}
]);


25. Scan all the document to retrieve all eyeColors(use db.COLLECTION_NAME.distinct);

db.users.distinct("eyeColor")

26. Find all apple loving blue eyed female working in 'USA'. Sort them by their registration date in descending order.


db.users.aggregate([{$match: {eyeColor: "blue", gender: "female", favoriteFruit: "apple"}}, {$sort: {registered: -1}}])


27. Find all 18+ inactive men and return only the fields specified below in the below provided format

db.users.aggregate([{$match: {isActive: false, gender: "male", age: {$gt: 18}}}, {$project: 
{
  name: 1,
  email: 1,
  identity: {
    eyeColor: "$eyeColor",
    location: "$company.location"
  }
}
}])




```js
{
  name: "",
  email: '';
  identity: {
    eye: '',
    phone: '',
    location: ''
  }
}
```
