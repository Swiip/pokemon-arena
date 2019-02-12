# Pokemon Arena

This is a code base especially created to illustrate a talk about React Fiber.

[You can find the slides here](https://docs.google.com/presentation/d/e/2PACX-1vSFFd9b-Z8moHPtRaB1dWZWRIXpc3RYsBsZpYBxvYm7xoyBxe62D-ZXSyR-tssLZkqx9WIaFtk57q97/pub?start=false&loop=false&delayms=3000)

The talk and the code were done by @mfrachet, @fberthelot and myself.

## Branches

You can find the "target" code in the `master` branch. We try to keep it updated with each React releases.

The `livecoding` branch is where the code is changed to an "older" style in order to be improved with last React features.

## Livecoding steps

This chapter is about to describe and keep a script of the livecoding changes in order to update the code from the `livecoding` branch to the `master`.

### Step 1: Fragments

Focusing on the `src/components/arena/choice/pokemon-input.js` file. It's a typical component used in a loop but which contains two children which has no need of a parent.

- Replace the unused div by an array.
- Replace the array by a `Fragment`.
- Replace the `Fragment` with the new notation `<>`.

### Step 2: Errors boundaries

The subject is to generate an error in the Title component.

- In `src/components/design-system/title.js` create an `ErrorTitle` component which throw an error. Replace the default export to the new component.
- http://localhost:3000/arena/choice should fail
- Create from scratch or describe `src/components/design-system/errors.js`.
- Use `ErrorHandler` in `src/components/arena/choice/choice.js` around the title. **Beware of create-react-app overlay**, you can't disable it but you can remove it with escape.
- Remove `ErrorHandler` from `src/components/arena/choice/choice.js`, add it in `src/index.js`.
- Use back the normal `Title` component to get the app works again.

### Step 3: Suspense

Suspense by itself can't be illustrated so, step 3 is more like a placeholder.

### Step 4: lazy

We will load the chart library called `Victory` lazily.

- In `src/components/stats/stats.js`, add imports for `Suspense` and `lazy`.
- Load the `Chart` component with `lazy` and the new `import()` syntax. Add a timeout to the loading function to be able to see the loader.
- Surround the `Chart` component with `Suspense`, use `Loader` as fallback.

### Step 5: cache

We're getting back at the choice page. We will seek to load the data with the new cache API.

- In `src/components/arena/choice/form.js`, remove the `componentDidMount` method from the component and the pokemon property from the state.
- import `createResource` from the `react-cache` local copy in `src/vendor/react-cache.development.js`. Instanciate a resource using the existing `fetchApi` function.
- In the render method, use the `read` method of the resource to get the data. Use this data in place of the one from the state.
- In the `src/components/arena/choice/choice.js`, surround the `Form` component with a `Suspense` component.

### Step 6: time slicing

No livecoding, just a démo. Go the stat page.

- Present the debug tool.
- Present the `src/index.js` with the two ways to start React.
- Present the `src/components/stats/chart.js` with the two ways to update the state.
- Activate the CPU throtling feature of Chrome Dev Tools (Performance tab).
- In standard mode, the rendering freeze clickly and several numbers are lost.
- In concurrent mode, the rendering is slow but no number is lost

### Step 7: hooks!

Once again, back to the choice page.

- Start a new function component `FormHook` under the other one. Copy the content of the `render` method in the function body.
- Import the `useState` hook from `react`.
- Use the `useState` hook to create `first` and `second` states variable.
- Define `handleFirst` and `handleSecond` handlers which set the respective state.
- Define the `handleSubmit` handler with the body of the previous
- Replace all pointers removing all `this`... Tada :)

### Step 8: custom hooks

The very heart of the hooks are custom hooks. Let's factorize the logic.

- Create a custom hooks factoring state and handler named `useField`.

### Step 9: going further

No livecoding, just looking at the code of the battle.

- Present the `useEffect` hook used to start the fight.
- Present the `useReducer` hook to handle the battle logic.
- Present the whole code of the component containing any logic code.
- Present the data section.
- Present the logic section, doesn't it look at Redux? Still there is no Redux here! **Beware, this reducer is limited to the component state**, it's not a global state like Redux (tips: but there is a `useContext` hook).
