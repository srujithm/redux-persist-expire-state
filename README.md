# redux-persist-expire-state

## Installation

```javascript
yarn add redux-persist-expire-state
```

or

```javascript
npm install redux-persist-expire-state
```

## Usage

```javascript
import { persistReducer, persistStore } from 'redux-persist';
import expireReduxState from 'redux-persist-expire-state';

const config = {
  expireSeconds: 10 * 60 * 60, // Expiration time of 10 hours, defaults to null
  expireKey: 'persistedAt', // key to be used in the state, defaults to persistedTimestamp
  expireState: { error: null, data: []} // state to be used after persisted state expires, defaults to {}
};

const persistedReducer = persistReducer({
  transforms: [expireReduxState('reducer', config)] // reducerKey for which expiry is being set, add as many reducers as required
}, rootReducer);

const store = createStore(persistedReducer);
const persistedStore = persistStore(store);
```

## Examples

```javascript
// Reset `user` to empty object if not updated for 30 mins
expireReducer('user', {
    expireSeconds: 1800
})
```
