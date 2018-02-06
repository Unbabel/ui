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

## Development
To develop or add new components, install the dependencies using the standard way `npm install` and launch the Storybooks to preview your components.

### Storybooks
[Storybooks](https://storybook.js.org/basics/guide-vue/) lets you easily see the rendered components, its variations, and change its properties.

Start the [Storybooks](https://storybook.js.org/basics/guide-vue/) server using:
```
npm run storybooks
```

### Testing
_Coming soon..._