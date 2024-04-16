### Make an error

```
yarn make:error MyNewError
```

### Make a new branded primitive

```
yarn make:brand MyName -t string # creates a branded string
yarn make:brand MyAge -t number # creates a branded number
```
### Make a new branded primitive under specific domain
We have several domains for types: nlp, vectorDB, ranking

```
yarn make:brand MyName -t string -d nlp # creates a branded string under nlp
```