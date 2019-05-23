[![Build Status](https://travis-ci.org/Gavant/ember-shopify-draggable.svg?branch=master)](https://travis-ci.org/Gavant/ember-shopify-draggable)
[![npm version](https://badge.fury.io/js/ember-shopify-draggable.svg)](https://badge.fury.io/js/ember-shopify-draggable)
[![Ember Observer Score](http://emberobserver.com/badges/ember-shopify-draggable.svg)](http://emberobserver.com/addons/ember-shopify-draggable)

ember-shopify-draggable
==============================================================================

Addon for using [@shopify/draggable](https://github.com/Shopify/draggable) in ember projects.

![Doggie](https://media1.tenor.com/images/237857b4502f6d15cccbd58c5ca05257/tenor.gif?itemid=3501646)

- [X] Easy to use
- [X] FastBoot Compatible
- [X] Easily Extendable

Demo
------------------------------------------------------------------------------
https://gavant.github.io/ember-shopify-draggable/#/sortable


Installation
------------------------------------------------------------------------------

```
ember install @gavant/ember-shopify-draggable
```


Usage
------------------------------------------------------------------------------

ember-shopify-draggable contains ember components for all of the @shopify/draggable modules (`Swappable`, `Sortable`, `Droppable`, and `Draggable`).

### Sortable
This addon allows you to pass in a list object to the container component, and an item object to the item component.
This will give you the ability to keep track of the underlying JS list automatically. You can see an example of this below.

Here we pass in list which is an array of js objects, and give `item` to each `container.item`. When any action is performed the `group.container` component sends an action and you can just have it mutate the list. So each time the list is modified by drag/drop your passed in list will be updated with those changes!

```handlebars
{{#sortable-group
    sortableActions=(hash
        start=(action "sortableStart")
        sort=(action "sortableSort")
        sorted=(action "sortableSorted")
        stop=(action "sortableStop")
    )
    dragActions=(hash
        start=(action "dragStart")
        move=(action "dragMove")
        over=(action "dragOver")
        out=(action "dragOut")
        stop=(action "dragStop")
    )
    as |group|
}}
    {{#group.container list
        itemReordered=(action (mut list))
        itemAdded=(action (mut list))
        itemRemoved=(action (mut list)) as |container|}}
            {{#each container.items as |item|}}
                {{#container.item item}}
                    {{item.name}}
                {{/container.item}}
            {{else}}
                Im empty
            {{/each}}
    {{/group.container}}
    {{#group.container listTwo
        itemReordered=(action (mut listTwo))
        itemAdded=(action (mut listTwo))
        itemRemoved=(action (mut listTwo)) as |container|}}
            {{#each container.items as |item|}}
                {{#container.item item}}
                    {{item.name}}
                {{/container.item}}
            {{else}}
                Im Empty
            {{/each}}
    {{/group.container}}
{{/sortable-group}}
```

Angle bracket component style (Ember v3.4+)
```handlebars
<SortableGroup
    @sortableActions={{hash
        start=(action "sortableStart")
        sort=(action "sortableSort")
        sorted=(action "sortableSorted")
        stop=(action "sortableStop")
    }}
    @dragActions={{hash
        start=(action "dragStart")
        move=(action "dragMove")
        over=(action "dragOver")
        out=(action "dragOut")
        stop=(action "dragStop")
    }}
    as |Group|
>
    <Group.container
        @items={{this.list}}
        @itemReordered={{action (mut list)}}
        @itemAdded={{action (mut list)}}
        @itemRemoved={{action (mut list)}}
        as |Container|
    >
        {{#each Container.items as |item|}}
            <Container.item @item={{item}}>
                {{item.name}}
            </Container.item>
        {{else}}
            Im empty
        {{/each}}
    </Group.container>
    <Group.container
        @items={{this.listTwo}}
        @itemReordered={{action (mut listTwo)}}
        @itemAdded={{action (mut listTwo)}}
        @itemRemoved={{action (mut listTwo)}}
        as |container|
    >
        {{#each Container.items as |item|}}
            <Container.item @item={{item}}>
                {{item.name}}
            </Container.item>
        {{else}}
            Im Empty
        {{/each}}
    </Group.container>
</SortableGroup>
```

#### Events
You can listen to the Sortable's base interaction events by adding actions to the `{{#sortable-group}}` component. See the above examples for the correct action names and structure.

Possible events for Sortable can be found at [Sortable Events](https://github.com/Shopify/draggable/tree/v1.0.0-beta.8/src/Sortable#events)

### Swappable
**NOTE:** Currently only works with one container

```handlebars
{{#swappable-group
    swappableActions=(hash
        start=(action "swappableStart")
        swap=(action "swappableSwap")
        swapped=(action "swappableSwapped")
        stop=(action "swappableStop")
    )
    dragActions=(hash
        start=(action "dragStart")
        move=(action "dragMove")
        over=(action "dragOver")
        out=(action "dragOut")
        stop=(action "dragStop")
    )
    as |group|
}}
    {{#group.container list
        itemReordered=(action (mut list))
        as |container|}}
            {{#each container.items as |item index|}}
                {{#container.item item index=index}}
                    {{item.name}}
                {{/container.item}}
            {{else}}
                Im empty
            {{/each}}
    {{/group.container}}
{{/swappable-group}}
```

Angle bracket component style (Ember v3.4+)
```handlebars
<SwappableGroup
    @swappableActions={{hash
        start=(action "swappableStart")
        swap=(action "swappableSwap")
        swapped=(action "swappableSwapped")
        stop=(action "swappableStop")
    }}
    @dragActions={{hash
        start=(action "dragStart")
        move=(action "dragMove")
        over=(action "dragOver")
        out=(action "dragOut")
        stop=(action "dragStop")
    }}
    as |Group|
>
    <Group.container
        @items={{this.list}}
        @itemReordered={{action (mut list)}}
        as |Container|
    >
        {{#each Container.items as |item index|}}
            <Container.item @item={{item}} @index={{index}}>
                {{item.name}}
            </Container.item>
        {{else}}
            Im empty
        {{/each}}
    </Group.container>
</SwappableGroup>
```

#### Events
You can listen to the Sortable's base interaction events by adding actions to the `{{#swappable-group}}` component. See the above examples for the correct action names and structure.

Possible events for Swappable can be found at [Swappable Events](https://github.com/Shopify/draggable/tree/v1.0.0-beta.8/src/Swappable#events)

### Droppable

Droppable can be used via a similar set of components, but with the addition of a `dropzone` component, which has the restriction that only a single draggable item may occupy a dropzone at any given time.

```handlebars
{{#droppable-group
    dragActions=(hash
        start=(action "dragStart")
        move=(action "dragMove")
        over=(action "dragOver")
        out=(action "dragOut")
        stop=(action "dragStop")
    )
    droppableActions=(hash
        dropped=(action "droppableDropped")
        returned=(action "droppableReturned")
    )
    as |group|
}}
    {{#group.container as |container|}}
        {{#container.dropzone as |dropzone|}}
            {{#dropzone.item}}Item 1{{/dropzone.item}}
        {{/container.dropzone}}
        {{#container.dropzone as |dropzone|}}
            {{!-- dropzone is starting out empty --}}
        {{/container.dropzone}}
    {{/group.container}}
{{/droppable-group}}
```

Angle bracket component style (Ember v3.4+)
```handlebars
<DroppableGroup
    @dragActions={{hash
        start=(action "dragStart")
        move=(action "dragMove")
        over=(action "dragOver")
        out=(action "dragOut")
        stop=(action "dragStop")
    }}
    @droppableActions={{hash
        dropped=(action "droppableDropped")
        returned=(action "droppableReturned")
    }}
    as |Group|
>
    <Group.container as |Container|>
        <Container.dropzone as |Dropzone|}}
            <Dropzone.item>Item 1</Dropzone.item>
        </Container.dropzone>
        <Container.dropzone as |Dropzone|>
            {{!-- dropzone is starting out empty --}}
        </Container.dropzone>
    </Group.container>
<DroppableGroup>
```

#### Events
You can listen to the Droppable's base interaction events by adding actions to the `{{#droppable-group}}` component. See the above examples for the correct action names and structure.

Possible events for Droppable can be found at [Droppable Events](https://github.com/Shopify/draggable/tree/v1.0.0-beta.8/src/Droppable#events)

### Draggable

Draggables are the base module from which all the others extend from, so on its own it doesn't offer much functionality. However, it can still be useful if you need the lower-level primitive to build on top of.

```handlebars
{#draggable-group
    dragActions=(hash
        start=(action "dragStart")
        move=(action "dragMove")
        over=(action "dragOver")
        out=(action "dragOut")
        stop=(action "dragStop")
    )
    as |group|
}}
    {{#group.container as |container|}}
        {{#container.item}}Item 1{{/container.item}}
        {{#container.item}}Item 2{{/container.item}}
        {{#container.item}}Item 3{{/container.item}}
    {{/group.container}}
{{/draggable-group}}
```

Angle bracket component style (Ember v3.4+)
```handlebars
<DraggableGroup
    @dragActions={{hash
        start=(action "dragStart")
        move=(action "dragMove")
        over=(action "dragOver")
        out=(action "dragOut")
        stop=(action "dragStop")
    }}
    as |Group|
>
    <Group.container as |Container|>
        <Container.item>Item 1</Container.item>
        <Container.item>Item 2</Container.item>
        <Container.item>Item 3</Container.item>
    </Group.container>
</DraggableGroup>
```

#### Events
You can listen to the Draggable's base interaction events by adding actions to the `{{#draggable-group}}` component. See the above examples for the correct action names and structure.

Possible events for Draggable can be found at [Draggable Events](https://github.com/Shopify/draggable/tree/v1.0.0-beta.8/src/Draggable#events)

### Common Options
You can customize several of the underlying `Sortable`, `Swappable`, `Droppable`, or `Draggable` instances' options by passing in additional properties to the `{{sortable-group}}`, `{{swappable-group}}`, `{{droppable-group}}` and `{{draggable-group}}` components.

* `delay` - (default: `100`) adds a delay to the drag interaction when a sortable item is clicked.
* `handle` - (default: `null`) a CSS selector for a handle element within the sortable item elements if you don't want to allow dragging from anywhere on the entire item element.
* `mirrorOptions` - (default: `{constrainDimensions: true}`) a hash of options that are used to customize the behavior and appearance of the "mirror" element that gets created when dragging

For more details on these options see:  
https://github.com/Shopify/draggable/tree/v1.0.0-beta.8/src/Draggable#options  
https://github.com/Shopify/draggable/tree/master/src/Draggable/Plugins/Mirror#options

**NOTE:** These options do not support dynamically changing values, and will only respect the initial value that is passed in when the component is first rendered.


### Plugins

The ember components for each of the modules also support enabling the plugins that are provided by @shopify/draggable.

#### ResizeMirror
https://github.com/Shopify/draggable/tree/v1.0.0-beta.8/src/Plugins/ResizeMirror  

Enable by setting `resizeMirror=true` on the top level `*-group` components. This plugin is supported by all components.  

#### Snappable
https://github.com/Shopify/draggable/tree/v1.0.0-beta.8/src/Plugins/Snappable  

Enable by setting `snappable=true` on the top level `*-group` components. This plugin is supported by all components.  

The Snappable plugin also exposes some additional events that can be listed to via actions on the supported group components:
```handlebars
snapActions=(hash
    in=(action "snapIn")
    out=(action "snapOut")
)
```
Possible events for Snappable can be found at [Snappable Events](https://github.com/Shopify/draggable/tree/v1.0.0-beta.8/src/Plugins/Snappable#events)

#### SwapAnimation
https://github.com/Shopify/draggable/tree/v1.0.0-beta.8/src/Plugins/SwapAnimation  

Enable by setting `swapAnimation=true` on the top level `*-group` component. It is currently only supported by `{{sortable-group}}`.

An additional option property, `swapAnimationOptions` is provided on the supported group components. (see [options](https://github.com/Shopify/draggable/tree/v1.0.0-beta.8/src/Plugins/SwapAnimation#options) documentation)

#### Collidable
https://github.com/Shopify/draggable/tree/v1.0.0-beta.8/src/Plugins/Collidable  

Enable by setting `collidable=true` on the top level `*-group` components. It is currently supported by `{{sortable-group}}`, `{{swappable-group}}` and `{{droppable-group}}`.  

An additional option property, `collidables` is provided on the supported group components (see [options](https://github.com/Shopify/draggable/tree/v1.0.0-beta.8/src/Plugins/Collidable#options) documentation)

The Collidable plugin also exposes some additional events that can be listed to via actions on the supported group components:
```handlebars
collidableActions=(hash
    in=(action "collidableIn")
    out=(action "collidableOut")
)
```
Possible events for Collidable can be found at [Collidable Events](https://github.com/Shopify/draggable/tree/v1.0.0-beta.8/src/Plugins/Collidable#events)

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
