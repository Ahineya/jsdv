jsdv
====

JavaScript forms validator. Created for html attributes validation declarations

Demo: http://evsegneev.pp.ua/validator

How it works?

1. Include validator.js and validator.css to your html.


2. Declare your validation:
  ```html
  <input type="text" validate='digits' validate-message='Digits only'>
  <textarea validate='letters'></textarea>
  ```

3. Initialize validator:
 ```html
 var v = new JSDV(); //v have an isValid() method
 //here you can add your own validation rules
 v.init();
 ```

That's all!

You can pass id of your own error container:

```html
<input type="text" validate='letters' validate-message='Letters only'  validate-error-id='my-error'>
<div id="my-error" style="..."></div>
```

Now there are three main validators:
* Digits
* Letters
* Email
So, you can use validate='digits', validate='letters' or validate='email'.

Other useful functions are added through extend function.
There are:
* url
* length-min
* length-max
Length-min and length-max validators needs an extra attributes: validator-length-min and validator-length-max:

```html
<input  type="text" validate="length-min" validator-length-min="10" validate-message="Minimal length is 10 symbols">
<input  type="text" validate="length-max" validator-length-max="10" validate-message="Maximal length is 10 symbols">
```

You can put more than one validator on form input:

```html
<textarea validate='length-max length-min letters' validator-length-max="15" validator-length-min="10" validate-message='Message length must be between 10 and 15 letters'></textarea>
```

If you want to add custom validator, you need to use an extend function:

```javascript

var v = new JSDV;

/*
Function extend accepts two parameters:
function(o) - validation function
and name of the rule.
You need to pass "o" object in validation function - the reference on your form input
*/
v.extend(function(o) {
    var length = o.getAttribute('validator-length-min');
    return (o.value.length >= length); //If valid - returns true, else - false.
}, 'length-min'); //second parameter is a rule name

v.init();

console.log(v.isValid());
```