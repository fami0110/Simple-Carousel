# Simple-Carousel
Simple Carousel is a library that can generate a simple carousel for your page. This carousel will fit to your jumbotron section. Because the width and height is relative to your viewport, which mean the carousel size will fill the entire screen.

**Available Features :**
1. Slider - Arrow button to navigate the carousel items.
2. Dots - An indicator for active carousel item, and also can be used as navigator.
3. Auto Slide - This carousel can automaticly slide itself.

## Installation
Download the [css]() and [js]() file to install Simple Carousel.

## Usage
1. Attach the css and js file on your html file.

```html
<!-- Place this <link> tag inside the <head> tag -->
<link rel="stylesheet" href="path_to/simple-carousel.css">

<!-- Place this <script> tag at the end of your <body> tag -->
<script src="path_to/simple-carousel.js"></script>
```

2. Make a carousel container with an id that contains the <img> as the carousel items.
```html
<div id="example">
  <img src="path_to/your_image_1.jpg">
  <img src="path_to/your_image_2.jpg">
  <img src="path_to/your_image_3.jpg">
  <img src="path_to/your_image_4.jpg">

  <!-- Add more image if you want -->
</div>
```

3. Initialize the carousel
```html
<!-- Make sure to place this script bellow the simple-carousel.js script -->
<script>
  let myCarousel = new Carousel('myCarousel');
</script>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
