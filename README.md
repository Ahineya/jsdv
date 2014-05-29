jsdv
====

JavaScript forms validator. Created for html attributes validation declarations

Demo: http://evsegneev.pp.ua/jsdv

Browser Support:
* IE8+
* Opera 10.6+ (maybe earlier, don't know)
* Safari 4.0+
* Firefox 3.0+
* Chrome 14+ (maybe earlier, don't know)

How it works?

1. Include validator.js and validator.css to your html.


2. Declare your validation:
  ```html
  <input type="text" validate='digits' validate-message='Digits only'>
  <textarea validate='letters'></textarea>
  ```

3. Initialize validator:
 ```html
 var v = new JSDV();
 //here you can add your own validation rules
 v.init();
 ```

That's all!

To check that all fields on page is valid, use ```javascript v.isValid();```

You can pass id of your own error container:

```html
<input type="text" validate='letters' validate-message='Letters only'  validate-error-id='my-error'>
<div id="my-error" style="..."></div>
```

Now there are validators:
* digits
* letters
* email
* url
* length-min
* length-max
* same

Length-min and length-max validate needs an extra attributes: validate-length-min and validate-length-max:

```html
<input  type="text" validate="length-min" validate-length-min="10" validate-message="Minimal length is 10 symbols">
<input  type="text" validate="length-max" validate-length-max="10" validate-message="Maximal length is 10 symbols">
```

Same validator an requires extra-attributes: validate-with and validate-on.
To use it, you only need to declare it on one of the compared elements
 ```html
<input id="pass-first" validate="same" validate-with="pass-second" validate-on="pass-first keyup, pass-second keyup" validate-error-id="same-test" validate-message="Passwords do not match" type="password">
<input id="pass-second" type="password">
 ```

Validate-on attribute defines an events that fires validation.
First word is id of the element, and second - event without leading "on".
Separate different events by comma.
Next declaration tolds that validation will be executed after "onkeyup" event on elements
with id="pass-first" and id="pass-second":
```html
validate-on="pass-first keyup, pass-second keyup"
html

You can put more than one validator on form input:

```html
<textarea validate='length-max length-min letters' validate-length-max="15" validate-length-min="10" validate-message='Message length must be between 10 and 15 letters'></textarea>
```

If you want to add custom validator, you need to use an extend function.
Function extend accepts an object. Object must contain two properties:
* f - validation function
* name - name of the validation function
In context of the validation function, o is an html element that we wants to validate.
validation function must return boolean value. If it returns true, validation passed.
Else - validation not passed.

```javascript

var v = new JSDV;

v._extend({
        f: function(o) {
            var length = o.getAttribute('validate-length-min');
            return (o.value.length >= length);
        },
        name: 'length-min'
    });

v.init();

console.log();
```