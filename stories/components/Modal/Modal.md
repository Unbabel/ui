<p>The simplest Modal shows a message and a button for user acknowledgement.</p>
<b>Variations</b>
<p>It supports longer texts that trigger scrollbars, having a close button on the top-right corner and having a form inside. You can put whatever elements you want on the bottom.</p>
<b>Accessibility</b>
<p>By default it has the least destructive option selected (in this examples' case, the Cancel button). It is also possible to make *any* element automatically focused for text-reader purposes by adding the attribute <em>data-autofocus</em> (note that it is not possible to use the <em>autofocus</em> attribute on non input elements such as <em>p</em>).</p>
<p>Keyboard users will get the tabbing navigation trapped within the modal once it opens. Focusing out of it then tabbing will retrap the focus.</p>
