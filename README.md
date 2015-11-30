# react-split

Playground like experimental project to separate/split Flux cycles.

## start/dev

```
npm i
npm run dev
```

## goal

Having Component/Container specific stores beside the usual app level one.  

**Why?**  
I don't like the idea of storing short living page specific resources in a global store then invalidating them.  

Imagine a detail page of a cat:  /cats/:catId  
That single cat's data could go to a container level store and disappear after we navigated to an other page.

I believe that in most cases caching should be controlled by request headers instead of JS code.

### global store

Like in ~Redux:  
```js
const containerReducer = function (prevState, event) {
  if (event.type === 'SET_FOO') {
    return {
      foo: 'much'
    }
  }

  return prevState
}

export default connect(MySmartContainer, selectProps)
```

### container level store

```js
const containerReducer = function (prevState, event, globalState) {
  if (event.type === 'SET_FOO') {
    return {
      foo: 'wow'
      such: globalState.name + ' so'
    }
  }

  return prevState
}

export default connect(MySmartContainer, selectProps, new Store(localReducer))
```
