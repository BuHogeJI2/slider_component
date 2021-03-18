## Slider Web Component

### Step to connect Slider Component: 
- Import Slider module into your `index.js` file (import './components/Slider/Slider')
- In your `index.html` file create tag `<custom-slider>` `</custom-slider>`
- Inside `<custom-slider>` create tags `<slide>` `</slide>` with some data inside

### Tag `<custom-slider>` takes following attributes:
- `slides` - number, which shows number of slides on the screen (_from 1 to 5_)
- `type` - type/size of slides to render (_common, middle, narrow, wide_)

## Tasks

### Global:
- [X] Setup webpack;
- [X] Create carousel component that works on mobile and desktop;
- [ ] Make useful readme (tell how to set up the app);

### Requirements:
- [X] Work on mobile and desktop;
- [X] Support swipes;
- [ ] Work for any HTML content;
- [X] Animated (finger following swipes);

### Advantages: 
- [X] Multiple slides on the screen;
- [ ] Infinite option;
- [ ] Adaptive;