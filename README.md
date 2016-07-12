# Cookie message 

A simple snippet of HTML and JavaScript to manage the cookie message that is required by EU Cookie Law. This is inspired
by the GOV.UK site that simply displays a message and then hides it on the next page request.

The Information Commissioner's Office (ICO) state that implied consent is OK for things like Google Analytics. Quite 
honestly they wouldn't work without them! The main requirement is for UK websites to display clear information about cookies to their users, 
which is a good idea in any case.

## What you need to do

We recommend the minimum requirement is to have a Cookie Policy clearly explaining your usage of cookies. You can see an example
of a cookie policy in the file [cookie-policy.html](cookie-policy.html)

Optionally, you can also have a cookie message displaying at the top of your website. 

## Usage

Add the cookie message HTML at the top of your page. You can add whatever message you like and include a link to your 
cookie or privacy policy. There's no close link.

```html
<div id="cookie-message">
    <p>
        Your cookie message goes here
    </p>
</div>
```

Add this JavaScript after the body tag to instantly apply the js_enabled class. This ensures the cookie message is hidden without a flash of content.

```html
<script>
    // Detect JS support
    document.body.className = document.body.className + " js_enabled";
</script>
```

You need this CSS to ensure the cookie message is initially hidden if JavaScript is supported. Without this there will be 
a flash of content as the cookie message appears and then is hidden after the DOM has loaded.

```css
.js_enabled #cookie-message {
    display: none;
}
```

Load this JavaScript at the bottom of the page to hide the cookie message after the first view (yes, this sets a cookie to hide the cookie message).

```html
<script src="cookie-message.js"></script>
```

### Changing the cookie path

By default the cookie to hide the message is set across the entire current domain. If you want to set the cookie on a sub-folder 
path only, for example if you have a set of sub-sites and you want the cookie warning to appear for each one, then you can 
set the cookie path via the `data-cookie-path` attribute. 

```html
<div id="cookie-message" data-cookie-path="/my-site">
    ...
</div>
``` 

Please note if you set a cookie warning on both the domain root and a sub-path, the cookie saved to the domain root will stop
the cookie message displaying on sub-path pages.

### Extending cookie lifetime

By default the cookie message is displayed once, a cookie is then set to hide it for 30 days. If the user does not visit 
the site again in over 30 days then they will see the cookie message once more the next time they visit. Each time the user 
visits the site the cookie is updated and the 30 day expiry reset.

You can extend the cookie lifetime via the `data-cookie-expiry` data attribute, for example:

```html
<div id="cookie-message" data-cookie-expiry="60">
    ...
</div>
```

## More information

We wrote an article on the [Cookie Law](http://www.studio24.net/blog/clarification-on-cookie-law/) which you can read on our website.

You can also find out more from the [Information Commissioner's Office](https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies/).
 
## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## Credits

- [Simon R Jones](https://github.com/simonrjones)
