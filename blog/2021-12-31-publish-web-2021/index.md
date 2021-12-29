---
title: How I publish on the web in 2021
description: Web publishing, pre-web3
authors: [eric]
tags: [tutorial]
---

Hello, world! I'd love to jump into the crypto-blockchain-web3-metaverse, but before I do, let's see what it is like to publish content with mainstream web technologies.


### Publishing Goals

My goal is to publish content on the web that is entirely under my control, and costs me nothing.

Unfortunately, these goals are inherently at odds. It always costs server resources to save and distribute content. Fortunately, content websites are very affordable if you don't publish large videos or files. If you're willing to give up some control, you can get a website that is entirely free. And if you're willing to spend about $10/month to a variety of providers, you can create a website that is entirely under your control.

Today we can make some minor compromises to strike a nice balance: we will only pay for a domain name (At a cost of ~$10/year), so we keep full control of our web presence, but we will rely on proprietary services to host our code, run builds, and host public web files. We will demonstrate using the free plans provided by GitHub and Netlify.


### Tech Choices, oh my!

What principles do we use to decide on our tech stack?

First of all, I would never encourage you to get stuck on a proprietary service that tries to seize control of your content and web presence. Although I will occasionally reccomend proprietary service providers, I always try to choose providers that build upon open technology and allow relatively easy migratations to other services.

As with any web site, we will be building on HTTPS, HTML, CSS, and Javascript. Generally I use TypeScript because it provides additional robustness and clarity over Javascript. And I use React because it provides a powerful component system that works on all platforms including mobile apps. Once you're familiar with TypeScript and React, you can use the component ecosystem to quickly build apps on any platform.


### Our Requirements

Before we decide on the technology, we first need to specify the requirements clearly.

- Publish Markdown content to the web with *minimal hassle*
- Support client-side React components
- Publish custom static files
- Service providers should be free or almost free
- Widely-supported open-source technology

So our needs are oriented towards static content publishing, rather than a full-blown dynamic application.

### The Solution

Given these requirements, [Docusaurus](https://docusaurus.io/) is the best fit, although my opinion here is biased because I helped create it when I worked on the Open Source team at Facebook.

Usually I'd use Next.js for web projects, and Remix is an exciting new framework in the React ecosystem. However, Docusaurus is meant to get out of your way so you can focus on content, without spending hours on CSS and configuration. Considering the emphasis on Markdown and considerable out-of-the-box functionality, I think it is the best choice when you need to quickly publish written content on the web.

Lets get started!

### Pre-Requisites

If you want to follow along, install [NodeJS](https://nodejs.org/en/) and [git](https://github.com/git-guides/install-git) on your computer.

> For those watching the video: jump into the linked post so you can click links and copy commands.

I use [VSCodium](https://vscodium.com/) to work on my code, the open source version of VSCode. You'll need some tool like this to edit your code, and you'll want to use this to help you commit with git.

You'll also want a [GitHub](https://github.com) account. I reccomend setting up [SSH authentication](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) by [creating a key pair on your computer](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) and [adding it to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

For our web identity we will need to buy a domain name, and use a domain name (DNS) server host such as CloudFlare. Usually DNS is provided for free by your domain registrar. For this project, my domain is hosted on [Gandi.net](https://gandi.net), and I will use CloudFlare as my DNS provider.


### Docusaurus getting started

I'll start with [the getting started](https://docusaurus.io/docs/installation) guide from [docusaurus.io](https://docusaurus.io/). This uses the [npx](https://docs.npmjs.com/cli/v7/commands/npx) command line tool that comes with NodeJS/npm.

```sh
npx create-docusaurus@latest my-project-name classic
```

Now we can jump in to our project and open it in VSCodium. It has created a bunch of files: some example content, and some configuration.

```sh
cd my-project-name
codium .
```

To see this in web form, lets run `npm run start`. Now it opens up in our browser and we can compare the source files to the web site it creates.


### git started

Within VSCodium's git tab, click on "Initialize Repository"

Add all the files and hit commit. Now you can make any change and have confidence that you can restore back to a working version.


### Docusaurus Experimentation

Generally we can edit the files to see changes in the web app. But occasionally we might break things.

For example, if we rename `docs/intro.md` to `docs/hello.md`, the site will break. To troubleshoot we can open the browser's dev tools to read the error. 

Sometimes the site breaks (like when renaming or deleting files). This can usually be fixed by quitting the dev server (with Ctrl-C) and re-running it (with `npm start`).


### Home Page

Edit `src/pages/index.js` to change the source code of the home page. I'll start by cleaning up the component that is not used.


#### Name & Logo

The name and basic site info are customized from the `docusaurus.config.js` file.

All files within `static/` are published directly to the web. So the images in `static/img/` should be replaced with your own images.

After adding the new logo SVG file, I made the following changes to the header configuration. An empty title make sense because the logo contains the wordmark.

```
navbar: {
    title: '',
    logo: {
        alt: 'Code Eric',
        src: 'img/codeEric.svg',
    },
```


### Page Titles & Descriptions

Each page defines its own title and description. Markdown (`.md`) pages do that with "frontmatter":

```md
---
title: Titles look like this
description: Descriptions are used for meta-info
---

# Markdown Content
```

JS pages such as "index" do it like this:

```tsx
<Layout
  title={'Welcome Home!'}
  description="code(Eric) is here to experiment with the web!">
...
```

Also replace `static/img/favicon.ico`


### Site Color

By default the color theme is green because of the values in `src/css/custom.css`. Our classic instance of Docusaurus uses a style framework called [Infima](https://infima.dev/).

[This Docusaurus page](https://docusaurus.io/docs/styling-layout) explains how to change the color theme of the site, and it provides a tool that outputs new color values for you to put in the CSS. For example our light blue theme:

```css
:root {
  --ifm-color-primary: #2e90ef;
  --ifm-color-primary-dark: #1482ed;
  --ifm-color-primary-darker: #117be1;
  --ifm-color-primary-darkest: #0e65b9;
  --ifm-color-primary-light: #489ef1;
  --ifm-color-primary-lighter: #56a5f2;
  --ifm-color-primary-lightest: #7dbaf5;
  --ifm-code-font-size: 95%;
}
```


#### Docs

Docs are meant to be publicly editable pages, that have a version number, which can easily link to eachother. Each doc is a markdown file in `docs/`, which hhas a corresponding URL.

A sidebar is automatically created to list all docs, it can be configured with a [sidebar file](https://docusaurus.io/docs/sidebar).


#### Pages

Pages are simple documents within `src/pages` that directly correspond to the URL. They can be `.md` files or `.js`.

For example the site comes with `src/pages/index.js` which is a React component JS file to define the home page. We can replace it with an index.md if we're ok with a simple page and don't want to bother writing code.


#### Header & Footer

Modify `docusaurus.config.js` to adjust the links and text in the header and the footer.


#### Blog

Blog posts are markdown files with special formatting.

Authors can be listed which correspond with an authors file, in `blog/authors.yml` It takes the following format:

```
eric:
  name: Eric Vicenti
  title: Software Creator
  url: https://eric.vicenti.net/
  image_url: https://github.com/ericvicenti.png
```

Now your blog posts can use the author front matter:

```md
---
title: My Blog Post
authors: [eric]
tags: [tutorial, cringe]
---
```

Also note that blog posts support tags.


### Preview

Before we go live with our site, we can double check that it looks good even after the build step.

From the terminal in our project directory:

`npm run build`

It should output all the static web files in the `build/` directory, or give you a descriptive error.

To test the production build on your computer, run:

`npx serve ./build`

Now we can follow the printed URL and preview this in our web browser. And we can review the files and verify the correct markup is generated for each page. We should ensure everything looks as good as it did in dev mode.


### Code Hosting

We can publish our source code on GitHub, and we may as well make it public, because the web site itself is public.

To get started, create a new repository on GitHub. From the command line I will run the following commands to name the main branch, set the origin URL to github, and push the code:

```
git branch -M main
git remote add origin git@github.com:ericvicenti/code-eric.git
git push -u origin main
```

Now the repository is publicly visible on GitHub, including the complete commit history.


### Domain Registrar and Host

Before we can publish to the web we will need a domain name. Fortunately most domains cost about a dollar a month.

You can register a domain on a variety of Domain Registrars, and I reccomend Cloudflare. I also use [Gandi.net](https://gandi.net) and I already have a domain there.

You'll also need a DNS host, and I'm using Cloudflare. So even though my domain is registered with Gandi, I use Cloudflare's Domain Nameservers.


### Deployment

To put this site on the web, we need to publish the built files to a host who will serve them over http. Docusaurus [has a wide variety](https://docusaurus.io/docs/deployment) of deployment options. There are practically unlimited hosting options because Docusaurus outputs static files that simply need to be served over HTTPS.

Netlify is a great choice because they offer free hosting on a custom domain, and also free builds. There is a connection to GitHub so all you need to do is change the code in git, and Netlify will automatically build and deploy the new site.

So we log in to Netlify and create a new site by finding the repository that we already created in Github. Then we configure it to build and serve the site. Actually the defaults are already correct! We click deploy, then Netlify builds and publishes our site to a sample URL.

Finally we can add a custom domain to Netlify. Then we modify our domain's DNS record by adding a CNAME that points to the new Netlify app. The new URL starts working right away! And after two minutes and a few refreshes, HTTPS is also set up, so users are reassured with the lock.


### Wrap-Up

Ok! Without too much pain, we published something to the web, on our own domain! The hardest part was writing the blog post, which is exactly the advantage of Docusaurus- it demands focus on the content.


#### Web1/Web2.0 takeaway

Importantly, we have complete control over our web presence. We do rely on free service providers to host our DNS, our code, and our web files. But we can easily move away if any of these services misbehave. Or we can run our own infrastructure, if we are willing to pay. The only required expense is the domain name, for only about $10/year.

With existing web technologies, it is incredibly affordable and easy to publish content under your control.


#### web3 to the future!

I'm not sure what the web is evolving into, with the advent of crypto and web3 and the "metaverse". I am optimistic that there is an ethical path to explore these technologies, although I am highly skeptical and concerned about the current hype. Recently I've seen the web3 community get incredibly hyped on tech (and scams), without much focus on the problems that need to get solved. code(Eric) is an attempt to course-correct, and address the biggest problems facing the web.

Hopefully we can share a journey of upgrading this simple website into a bustling crypto metaverse. Maybe we can add social features to this site, or we could make it easy to audit and fork. Maybe we will deploy our site in an entirely new way, or maybe we can incrementally incorporate web3 features.

I need your help to identify the biggest problems with the web, so we can adopt or create a generation of technology that improves equity and global prosperity. I'd tell you to join me here at [eric.vicenti.net](https://eric.vicenti.net), but there is no way to interact yet! So please 'at' me on Twitter and jump into the YouTube comments. Let me know what you want me to explore next!
