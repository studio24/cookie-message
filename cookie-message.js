(function() {

    var storageNamespace = 'CookieMessage__';
    var seenStorageKey = storageNamespace + 'seen_message';
    var expiryStorageKey = storageNamespace + 'expiry';

    /**
     * Test whether local storage is available
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
     * @param type
     * @returns {boolean|boolean|*}
     */
    function storageAvailable(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                    // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    /**
     * Set localStorage to note user has seen cookie message
     *
     * @param expiryDays
     */
    function set(expiryDays = 30) {
        expiry = Date.now();
        expiry += (expiryDays * 24 * 60 * 60 * 1000);

        localStorage.setItem(seenStorageKey, 'yes');
        localStorage.setItem(expiryStorageKey, expiry);
    }

    /**
     * Check whether user has seen cookie message via localStorage
     *
     * @returns {boolean}
     */
    function check() {
        var seenMessage = localStorage.getItem(seenStorageKey);
        var expiry = localStorage.getItem(expiryStorageKey);

        if (!seenMessage) {
            return false;
        }

        if (expiry !== false) {
            now = Date.now();
            if (expiry <= now) {
                clear();
                return false;
            }
        }

        if (seenMessage === 'yes') {
            return true;
        }

        return false;
    }

    function clear() {
        localStorage.removeItem(seenStorageKey);
        localStorage.removeItem(expiryStorageKey);
    }

    var cookieMessage = document.getElementById('cookie-message');
    if (cookieMessage == null) {
        return;
    }

    if (storageAvailable('localStorage')) {

        if (check()) {
            cookieMessage.style.display = 'none';

        } else {
            cookieMessage.style.display = 'block';

            var expiryDays = cookieMessage.getAttribute('data-cookie-expiry');
            if (expiryDays == null) {
                expiryDays = 30;
            }
            set(expiryDays);
        }
    }

})();
