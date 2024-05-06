# Target Use case

## User case 1: Global ranking for a keyword

### Input
a keyword (e.g., "sports") and a weight array

```JSON
[
    {
        "contentId": "content-1...",
        "weight": 10
    },

    {
        "contentId": "content-2...",
        "weight": 0
    },

    {
        "contentId": "content-3...",
        "weight": 50
    },

]
```

### Output
a ranking and scores
```
["content-3", "content-1"]
[score(3), score(1)]
```

## Content Objects - we have several object having these properties
```JSON
[
    {
        "contentId": "content-1...",
        "attributes": {
            "sports": 1000,
            "soccer": 50,
            "cleats": 500,
            "baseball": 0,
        }
    },
    {
        "contentId": "content-2...",
        "attributes": {
            "sports": 10,
            "soccer": 0,
            "cleats": 0,
            "baseball": 10,
            "baseball cap": 200
        }
    },
]
```


## User 1
User 1 is more about soccer

## User 2
User 2 is more about baseball

## Ranking for User 1
[content-1, content-2]

## Ranking for User 2
This is interesting because the content based filtering is overridden by the staking.
[content-1, content-2]


### Ranking issues

1. If we average the embeddings for each content first and then find the score, we cannot tell what the score means and cannot ensure weighting is done on the target words.
2. If we score each keyword first against the user embedding, then we can apply weights on each keyword score. That will give us better ranking on keywords.


# requirements

1. the eigen.js integratation (muktadir)
2. co-occurance based ranking (ayush and muratcan)
3. user preference embedding (ayush and muktadir)
4. The whole co-occurance matrix is calculated on browser based on their history. So, different users will actually have different co-occurance matrix.

So, one user may have this:

["epl", "la liga", "sports", "soccer", "ice cream", "soccer-ball"]

But another may have this:

["ice cream", "cloths", "perfume"]

As a content owner, I am looking for users interested in buying a soccer ball.

Some users love to watch soccer, but they don't have the "soccer ball" in their representation vector. But, with cooccurance representation, it might be possible to relate "soccer ball" to soccer and so


["epl", "la liga", "sports", "soccer", "ice cream", "soccer-ball"]

user: [1, 0, 1, 1, 1, 0]
keyword-OH: [0, 0, 0, 0, 0, 1]
keyword-co: [0.1, 1, 1, 1, 0, 1]

