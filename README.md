# Figma Content Requester

![62862431-71537f00-bd0e-11e9-85db-d97c0fb729a4](https://user-images.githubusercontent.com/16322616/62862692-46b5f600-bd0f-11e9-93b0-75955d1de8f3.png)

## Overview

Figma Content Requester is a figma plugin written in ReactJS. This plugin allows designers to enter a website URL,
which will then retrieve and categorize general content from the website, allowing them to swap content by selecting 
a content element from the design, such as a heading or piece of text, and then selecting one of the returned 
content entries from the website. The content will then be replaced with the selected content entries.

<p align="center">
    <img src="./img/initial-screenshot.png" alt="Figma Interface with Figma Content Requester Plugin" width="738" />
</p>

### Step 1 - Enter URL

<p align="center">
<img src="./img/input-filled-screenshot.png" alt="Figma Content Requester Plugin Filled Search Input" width="738" />
</p>

### Step 2 - Search

<p align="center">
<img src="./img/request-in-progress-screenshot.png" alt="Figma Content Requester Plugin Filled Search Input" 
width="738" />
</p>

### Step 3 - Review Available Content

<p align="center">
<img src="./img/results-expanded-screenshot.png" alt="Returned Selectable Content Accordions" 
width="738" />
</p>

### Step 4 - Select Content to replace

<p align="center">
<img src="./img/action-intermediate.png" alt="Selected figma text element." 
width="738" />
</p>

### Step 5 - Replace Content

<p align="center">
<img src="./img/action-complete.png" alt="Updated figma text element with new content." 
width="738" />
</p>

### History

Additionally, users will be provided with a history of recent search URLs, which are clickable to search content for 
that website again.

<p align="center">
<img src="./img/history-screenshot.png" alt="Figma Content Requester History Panel" 
width="738" />
</p>

[comment]: <> (This template contains the react example as shown on [Figma Docs]&#40;https://www.figma.com/plugin-docs/intro/&#41;, with some structural changes and extra tooling.)

## Quickstart
* Run `yarn` to install dependencies.
* Run `yarn build:watch` to start webpack in watch mode.
* Open `Figma` -> `Plugins` -> `Development` -> `New Plugin...` and choose `manifest.json` file from this repo.

## Toolings
This repo is using:
* React + Webpack
* TypeScript
* Prettier precommit hook
