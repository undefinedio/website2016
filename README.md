Undefine website 2016
==================

Run
----

```console
$ # Install deps
$ npm install
$ # Do an initial build
$ gulp build
$ # Launch the dev server
$ gulp
```

Html data attributes
----

Play audio from sprite file
```html
<section data-play="taalunie">
```

Stop audio file
```html
<section data-stop="taalunie">
```

Set a class to the background
```html
<section data-class="classname">
```

Lazy loading of media
```html
<img data-src="assets/images/image.gif">
<iframe data-src="http://lepel.nl"></iframe>
<video>
    <source data-src="video.webm" type="video/webm" />
    <source data-src="video.mp4" type="video/mp4" />
</video>
```


Audio Sprites
----

Run following command to generate new audio sprite

```console
$ gulp audio
```

Requirements
```console
$ brew reinstall ffmpeg --with-theora --with-libogg --with-libvorbis
```
