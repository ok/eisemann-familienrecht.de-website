# 11ty / Bulma / Contentful template

## Site Setup

Website template using [Contentful](https://www.contentful.com/) as CMS, [Bulma](https://bulma.io/) for styles, and [Eleventy](https://www.11ty.dev/) for SSR.

- script/contentful.js exports the data into \_data, bundled by the categories in the CF collections
- \_data/_.js provide processed global data to 11ty from cf-_.json
- \_includes contains partials and layouts
- postcss purges CSS from /css/index.css to /dist/css/main.min.css

## Getting Started

- `npm run build` to integrate CMS content and render pages.
- `npm run start` run build and start live server
- `npm run debug` to run 11ty with debug output
