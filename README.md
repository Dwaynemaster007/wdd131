# WDD 131: Dynamic Web Fundamentals

JavaScript, HTML and CSS coursework for **WDD 131 at BYU-Idaho** by Thubelihle Dlamini. The final project is **The First Paycheck**, a personal finance guide for young professionals.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

## Projects

| Project | Files | Description |
| --- | --- | --- |
| 💰 **The First Paycheck** (final project) | [`project/`](project/) | A personal finance basics site with a JavaScript **budget calculator**, a basics guide, references and a site plan |
| 🛕 **Filtered Temple Album** | [`filtered-temples.html`](filtered-temples.html) | A responsive gallery built from an array of temple objects, filtered by Old, New, Large and Small, with lazy-loaded WebP images |
| 🇸🇿 **Eswatini place page** | [`place.html`](place.html) | Country facts with a wind-chill calculation done in JavaScript |
| 📝 **Product review form** | [`form.html`](form.html) → [`review.html`](review.html) | A form with options populated from JavaScript, plus a `localStorage` counter of reviews submitted |
| 🖼️ **Temple album** | [`temples.html`](temples.html) | A responsive image grid with a hamburger menu |
| Weekly activities | [`week02/`](week02/), [`week03/`](week03/) | Debugging, media queries, responsive images and design principles |

The [course home page](index.html) links to everything.

## Concepts practised

- DOM selection, manipulation and event handling
- Arrays of objects with `filter`, `map` and `forEach`
- Responsive design with media queries, CSS Grid and a mobile hamburger menu
- `localStorage`, form handling and query strings
- Image optimisation with WebP, `srcset` and `loading="lazy"`

## Run locally

It's a static site, so there's nothing to install:

```bash
git clone https://github.com/Dwaynemaster007/wdd131.git
cd wdd131
npx serve .
```

### Helper script

[`convert_temple_images.py`](convert_temple_images.py) downloads each temple photo and saves a 400px-wide WebP copy in `images/`. It needs `pip install pillow requests`.

## Author

**Thubelihle Dlamini**, [GitHub](https://github.com/Dwaynemaster007) · [LinkedIn](https://linkedin.com/in/thubelihledlamini)
