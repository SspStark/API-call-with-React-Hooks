# Making API Call with Hooks

- Avoiding Unnecessary API Calls
  - Using Dependency Array
- Handling API Response
  - Updating Object in State using Spread operator
  
In Function Component, we can use Effect Hook to make an API Call after the component render.

API Call using the fetch() method works asynchronously, so we need to write the API Call logic in an async function.

### Effects should be Synchronous
It's not a good practice to make an effect asynchronous because it may lead to unexpected results.
```jsx
useEffect(async() => {
  await fetch(url, options)
  ...
})
```
If you need an asynchronous function, define and call the async function inside the Effect

```jsx
useEffect(() => {
  const funName = async() => {
    await fetch(url, options)
    ...
  }
  funName()
})
```

