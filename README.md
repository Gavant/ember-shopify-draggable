ember-shopify-draggable
==============================================================================

Addon for using @shopify/draggable in ember projects.

-[x] Easy to use 
-[x] Fastboot Compatible (doesn't run in fastboot)
-[x] Easily Extendable

Installation
------------------------------------------------------------------------------

```
ember install ember-shopify-draggable
```


Usage
------------------------------------------------------------------------------

Right now this addon contains ember components for `swappable` and `sortable`. We hope to have full parity with all features of @shopify/draggable soon.

Swappable functionality
```
{{#swappable-group swapped=(action 'swapped') as |group|}}
    {{#group.container as |container|}}
        {{#each list as |item|}}
            {{#container.item}}
                {{item.name}}
            {{/container.item}}
        {{/each}}
    {{/group.container}}
    {{#group.container as |container|}}
        {{#each listTwo as |item|}}
            {{#container.item}}
                {{item.name}}
            {{/container.item}}
        {{/each}}
    {{/group.container}}
{{/swappable-group}}
```

Possible events for swappable can be found at `https://shopify.github.io/draggable/docs/identifiers.html#swappable-swappableevent`
You can see an example of the `swapped` event being used above.

Sortable functionality
```
{{#sortable-group sorted=(action 'sorted') as |group|}}
    {{#group.container as |container|}}
        {{#each list as |item|}}
            {{#container.item}}
                {{item.name}}
            {{/container.item}}
        {{/each}}
    {{/group.container}}
    {{#group.container as |container|}}
        {{#each listTwo as |item|}}
            {{#container.item}}
                {{item.name}}
            {{/container.item}}
        {{/each}}
    {{/group.container}}
{{/sortable-group}}
```

Possible events for sortable can be found at `https://shopify.github.io/draggable/docs/identifiers.html#sortable-sortableevent`
You can see an example of the `sorted` event being used above.

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-shopify-draggable`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
