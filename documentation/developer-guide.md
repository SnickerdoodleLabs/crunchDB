# Code Organization

We have three domains currently: {nlp, ranking, vectorDB}.

```
src
    - implementations
        - nlp
        - ranking
        - vectorDB
    - interfaces
        - nlp
        - ranking
        - vectorDB
    - objects
        - business
            - nlp
            - ranking
            - vectorDB
        - enum
        - error
        - primitive
```

# Conventions
1. Interface-oriented design: most of the interfaces have multiple implementations.
2. Error: javascript complied code loses types. So, error objects needs a code for identification
3. Dependency Injection: all the dependencies are injected through constructor or function calls.
4. Branded types: branded types are aliases. (Age is a number)
5. Clean Code (Robert C. Martin)
6. Strict SOLID principles
7. Peer reviews and automated tests before merging
8. No side-effects in public classes. [More](https://medium.com/storyblocks-engineering/these-four-clean-code-tips-will-dramatically-improve-your-engineering-teams-productivity-b5bd121dd150)


# Code Generator

We have a code generator (**maker**) to help you with boiler plates. It's a CLI application that generates code and places them to the right place. You need to build the maker first.

## Installation

```
yarn build-maker
```

## Error Generation
Error directory is flat. 
```
yarn make:error MyNewError
```
This operation does several things
1. Generates a error code 'MyNewError' and adds the code to '/src/object/error/errorCodes.ts'
2. Generates a new class 'MyNewError' and creates a new file at '/src/object/error/MyNewError.ts'
3. Adds the "export" of the new class to '/src/object/error/index.ts'

## Object Type Generation
Object types have a name, a type (-t), and optionally a domain (-d). If the types are non-primitives, we will need to manually fix the import after generation. Current domains are {nlp, ranking, vectorDB}

### Brand Generation

The following creates a brand with **unknown** type under '/src/object/primitive/'

#### No type, no domain
```
yarn make:brand MyUnknownBrand 
```

#### Primitive type, no domain

The following creates a brand with number type under '/src/object/primitive/'

```
yarn make:brand Age -t number 
```
#### Non-Primitive type, no domain

The following creates a brand with Age type under '/src/object/primitive/'

```
yarn make:brand IceAge -t Age 
```

Now as IceAge is an alias for Age (a non-primitive), we need to fix the import at '/src/object/primitive/IceAge.ts'

#### With domain
The following creates a brand with Age type under '/src/object/business/ranking'
```
yarn make:brand SimilarityScore -t number -d ranking 
```


## Interface Generation
It follows the same patterns as Object Generation. There should not be any root level interfaces though it's possible to create one.

#### With domain
The following creates an interface under '/src/interfaces/nlp'
```
yarn make:interface IVectorizer -d nlp
```


#### Without domain
The following creates an interface under '/src/interfaces'
```
yarn make:interface IVectorizer
```


