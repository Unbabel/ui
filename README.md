# Unbabel UI
This is the Unbabel UI (Vue.js) component library.

## Usage
Import the components into your app using:

```
import { CoolButton } from '@unbabel/ui';
```

And set it as a component:
```
components: {
	...
	coolButton: CoolButton,
},
```

So you can use it in your templates:
```
<cool-button>Click me!</cool-button>
```

## Components
- CoolButton (example component)
- Card (example component that imports another component)

## Development
To develop or add new components, install the dependencies and launch the [Storybooks](https://storybook.js.org/basics/guide-vue/) server to preview your components:

```
$ npm install
$ npm run storybooks
```