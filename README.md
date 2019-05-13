# Cookie message 

A simple snippet of HTML and JavaScript to manage the cookie message that is required by EU Cookie Law. This is inspired
by the GOV.UK site that simply displays a message and then hides it on the next page request.

This uses localStorage to store the user's preferences, not a cookie, which is more useful for sites that use full-page
caching (and it's somewhat ironic to set a cookie to say you accept cookies!).

## What you need to do

We recommend the minimum requirement is to have a Cookie Policy clearly explaining your usage of cookies. You can see an example
of a cookie policy in the file [cookie-policy.html](cookie-policy.html)

Optionally, you can also have a cookie message displaying at the top of your website. 

## Usage

See test file at `test.html` to illustrate usage.

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
<script async src="cookie-message.js"></script>
```

### Extending lifetime

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
