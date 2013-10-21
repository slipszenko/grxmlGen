grxmlGen
========

Small Javascript GRXML generator, not fully featured, just capable of specifying commands for a webkitSpeechRecognition, primarily for my audioNav project.

This array:

```javascript
["Hello", [
    "how are you",
    "what are you doing"
]],
["What", [
    "is the meaning of life",
    "do you want to do today"
]],
["How", [
    "do you", [
        "dance",
        "fight",
        "sleep at night"
    ],
    "are you"
]]
```

should generate a grammar which accepts:
* "Hello how are you"
* "Hello what are you doing"
* "What is the meaning of life"
* "What do you want to do today"
* "How do you dance"
* "How do you fight"
* "How do you sleep at night"
* "How are you"