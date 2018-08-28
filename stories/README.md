The overall idea is to mimic the same structure as the `/src/` folder.

If a component story is simple enough, we can have a single file named `${component}.js`.

If a component story is more complex and needs custom samples, you may create a folder with the component name `/stories/components/${component}/` and then add an index file inside together with all the required files.

Finally import the new component in the index file.
