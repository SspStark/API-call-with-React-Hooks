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
If you need an asynchronous function, define and call the async function inside the Effect.

```jsx
useEffect(() => {
  const funName = async() => {
    await fetch(url, options)
    ...
  }
  funName()
})
```
### Display different views
While making an API call, we need to display different views like Loading View, Success View, and Failure View.

For displaying these views, we need to maintain the following values in the state.

- Status
- Data
- Error Message

We use a single state variable with an object as an initial value to store these values as they tend to change together.
```jsx
const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null
  })
  ...
  return (...)
```
### Avoiding Unnecessary API Calls
Effect execute multiple times, due to upadating status in state and many API Calls are made.\
```jsx
useEffect(() => {
  const funName = async() => {
  setApiResponse({Status:apiStatusConstants.inProgress,data:null,errorMsg:null})
    await fetch(url, options)
    ...
  }
  funName()
})
```
The Effect should execute, and an API call should be made only once, so pass ***empty dependency array*** as a second argument to the useEffect.
```jsx
useEffect(() => {
  const funName = async() => {
  setApiResponse({...})
    await fetch(url, options)
    ...
  }
  funName()
},[])
```
### Updating Object in the State
Class Components
- The Object provided to the `setState()` will ***merge*** into the current state object.
- The newly created object contains all the keys and values.

Function Components
- The Object provided to the setter function will ***replace*** the current state object.
- The newly created object may not contain all the keys and values.

To Avoid this problem\
While updating the state, use callback function and ***spread operator*** to get all the key values from the current state object.
```jsx
setApiResponse((prevApiResponse) => ({
          ...prevApiResponse,
          status: apiStatusConstants.success,
          data: responseData
        }))
```



