# modal 


## slots 
- `title` You can pass the title as a slot or as a prop 

- `content` You can pass the content as a slot or as a prop 

- `footer` null 

## props 
- `active` ***Boolean*** (*optional*) `default: false` 
- `content` ***String*** (*optional*) `default: 'Default Modal content'` 
- `title` ***String*** (*required*) `default: 'Default Modal Title'` 
- `close-icon` ***Boolean*** (*optional*) `default: false` 
- `close-on-outside-click` ***Boolean*** (*optional*) `default: false` 
- `close-on-escape-press` ***Boolean*** (*optional*) `default: false` 
- `show-overlay` ***Boolean*** (*optional*) `default: true` 

## computed properties 
- `hasFooter` Hide the footer if nothing is passed to the slot 
 *dependencies:* `$slots` 

- `modalRole` 
 *dependencies:* `hasFooter` 

- `cssClasses` 
 *dependencies:* `active` `hasFooter` 

## events 
- `closed` undefined 

## methods 
- `clickedOnClose()` 

- `clickedOnOutside()` 

- `pressedKey(event)` 


