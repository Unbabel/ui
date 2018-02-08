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

**Or** if you only need the colours for your styles, you can import the .scss file using:
```
@import '~@unbabel/ui/src/colors';
```

## Components
- Button
- Card (example component that imports another component)
- Modal

## Development
To develop or add new components, install the dependencies and launch the [Storybooks](https://storybook.js.org/basics/guide-vue/) server to preview your components:

```
$ npm install
$ npm run storybooks
```