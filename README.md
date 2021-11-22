# NextGIS Frontend tutorial

[![http://code.nextgis.com](https://raw.githubusercontent.com/nextgis/nextgis_frontend/master/demo/src/images/logo_96x96.png)](http://code.nextgis.com)

Learn NextGIS Frontend step by step with this tutorial.

## Introduction

We present to your attention a set of tutorials through which you will be able to master both basic things and complex mechanics for working with frontend libraries.

For convenience, the tutorials are divided into parts.

Each lesson is a node package that is located in the tutorials folder and has its own description in a file `README.md`.

## How to work

### Locally

To run exercises on your computer, you need to clone a training repository for yourself, then, going to the directories with lessons, execute commands to install dependencies and run main script

```bash
git clone https://github.com/nextgis/ngf-tutorial
cd ./ngf-tutorial
```

With yarn, you can install dependencies for all lessons at once

```bash
yarn
cd ./tutorials/X_Y_tutorial
yarn start
```

With npm, you need to install in each directory separately

```bash
cd ./tutorials/X_Y_tutorial
npm i
npm start
```

Please note that you will need an installed [Node.js](https://nodejs.org/en/download/) to work locally.

We recommend to use IDE [VSCode](https://code.visualstudio.com/) to work with the lesson code. Although a regular text editor and a terminal for running commands are also suitable.

### In the cloud

Each lesson can be run in the Code cloud service [Codesandbox.io](https://codesandbox.io/)

`https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/` + `[tutorial_foldername]`

For example [https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/1_1_install_from_cdn](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/1_1_install_from_cdn)

## Links

- [NGF Live examples and docs](https://code.nextgis.com)
- [NGF API](https://code-api.nextgis.com)
- [NGF Repository](https://github.com/nextgis/nextgis_frontend)
- [NGF Article](https://nextgis.com/blog/nextgis-frontend)
- [NGF Tutorials repo](https://github.com/nextgis/ngf-tutorial)
- [NextGIS official](https://nextgis.com)
- [NextGIS Web](https://nextgis.com/nextgis-web)
- [Cloud plans](https://nextgis.com/pricing-base)
- [On premise](https://nextgis.ru/pricing)
- [Telegram chat](https://t.me/nextgis_chat)

## Content

### 1. Installation

1. [Load script from cdn](tutorials/1_1_install_from_cdn/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/1_1_install_from_cdn)
2. [Install from npm](tutorials/1_2_install_from_npm/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/1_2_install_from_npm)
3. [Import browser modules from cdn](tutorials/1_3_browser_module_from_cdn/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/1_3_browser_module_from_cdn)

### 2. Setup map

1. [View](tutorials/2_1_setup_map_view/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_1_setup_map_view)
2. [QMS and OSM](tutorials/2_2_setup_map_qms_and_osm/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_2_setup_map_qms_and_osm)
3. [Frameworks](tutorials/2_3_setup_map_frameworks/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_3_setup_map_frameworks)
4. [Map adapters](tutorials/2_4_setup_map_map_adapters/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_4_setup_map_map_adapters)
5. [Starter Kit](tutorials/2_5_setup_map_starter_kit/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_5_setup_map_starter_kit)
6. [Controls](tutorials/2_6_setup_map_controls/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_6_setup_map_controls)
7. [Events](tutorials/2_7_setup_map_events/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_7_setup_map_events)

### 3. Layer Adapters

1. [GeoJSON](tutorials/3_1_layers_geojson/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/3_1_layers_geojson)
2. [Raster](tutorials/3_2_layers_raster/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/3_2_layers_raster)
3. [Custom](tutorials/3_3_layers_custom/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/3_3_layers_custom)
4. [Baselayers](tutorials/3_4_layers_baselayer/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/3_4_layers_baselayer)

### 4. NgwMap

1. [Resources](tutorials/4_1_ngwmap_resources/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/4_1_ngwmap_resources)
2. [AddNgwLayer](tutorials/4_2_ngwmap_addngwlayer/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/4_2_ngwmap_addngwlayer)
3. [Identify](tutorials/4_3_ngwmap_identify/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/4_3_ngwmap_identify)

### 5. Vector

1. [Painting](tutorials/5_1_vector_painting/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/5_1_vector_painting)
2. [Selection](tutorials/5_2_vector_selection/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/5_2_vector_selection)
3. [Popup](tutorials/5_3_vector_popup/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/5_3_vector_popup)
4. [Filtering](tutorials/5_4_vector_filtering/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/5_4_vector_filtering)

### 6. No map

1. [NgwConnector](tutorials/6_1_vno_map_ngw_connector/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/6_1_vno_map_ngw_connector)
2. [NgwKit](tutorials/6_2_no_map_ngw_kit/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/6_2_no_map_ngw_kit)
3. Bonus [NgwOrm](tutorials/6_3_no_map_ngw_orm/README.md) | [LIVE](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/6_3_no_map_ngw_orm)

[![http://nextgis.com](https://nextgis.ru/img/nextgis.png)](http://nextgis.com)
