# SimplePopup
A very simple way of generating very simple pop-up messages in pure Javascript. 

```
<html>
  <head>
    <link rel="stylesheet" href="SimplePopup.css">
    <script src="SimplePopup.js"></script>
  </head>

  <body>
    <h1>This is a heading</h1>
    <div id="simplepopup"><!-- Pop-up messages go here --></div>
    <h2>This is a sub-heading</h2>
    <p>
      [...]
    </p>
  </body>

  <script>
    SimplePopup("div#simplepopup",         // This is the element to insert the pop-up after
                ["error",],   // A list of optional classes to apply to the popup
                "This is an error-message",  // The (HTML) content to place into the popup
                5000,         // Automatically remove the popup after this many milliseconds (optional, defaults to 5000)
                false)        // Remove all other popups in the same position before displaying this (options, defaults to false)
  </script>
</html>
```

It has a few neat features:-
- Multiple pop-ups at the same position (i.e. inserted after the same element on the page) will stack up vertically by default
- Respects the browser "prefer reduced motion" option to disable animations
- Popups can be clicked on to dispose of them sooner than the scheduled automatic timeout (if any)
- Hovering over a popup prevents it from disappearing automatically. Moving the mouse away from the popup restarts the countdown
- If the container specified for the popups isn't found, a temporary one is created and popups are displayed in the middle(ish) of the screen
- There is a ClearSimplePopups() function which will immediately (i.e. with no animations) purge all popups from the container

```
ClearSimplePopups("div#simplepopup")
```


### Configuration
The popups themselves have minimal styling. The idea is that you can style them by applying custom classes.  There are a few pre-defined ones:-
- info
- warning
- error

Redefine or ignore these as you see fit, or create entirely new ones.

### TODO
- Accessibility


