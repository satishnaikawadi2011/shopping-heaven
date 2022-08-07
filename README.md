<p align="center">
  <a href="https://shopping-heaven-landing-page.netlify.app/" target="_blank">
    <img 
      src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659847692/shopping-heaven/banner-without-bg_tbxnm4.png"
      alt="Shopping Heaven"
      title="Shopping Heaven"
      width="500"
    />
    <br/>
  </a>
</p>

<h1 align="center">SHOPPING HEAVEN</h1>
 <p align="center">
    Cross Paltform ECommerce Mobile Application with <strong>complete payment gateway</strong> integration </b> .
    <br />
    <br />
    <a href="https://shopping-heaven-landing-page.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/satishnaikawadi2011/shopping-heaven/issues">Report Bug</a>
    ·
    <a href="https://github.com/satishnaikawadi2011/shopping-heaven/issues">Request Feature</a>
  </p>

<p align="center">
  <a href="https://shopping-heaven-landing-page.netlify.app/" target="_blank">
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825229/shopping-heaven/sh-1_ph52qh.jpg" title="Shopping Heaven" alt="Shopping Heaven"
width="300"
height="650"
/>
</a>
</p>

## Table of Contents
- [Project Breakdown](#project-breakdown)
- [About the Project](#about-the-project)
  - [Built With](#built-with)
  - [Features](#features)
  - [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contact](#maintainer)
- [Support](#support)
- [License](#license)
- [Deployment](#deployment)

## Project Breakdown
- #### `assets` - This folder holds assets such as images, JSON Data and fonts
- #### `constants` - This folder holds constant variables used throughout the application
- ### `src`
    - #### `animations` - This folder holds components related to animations used in the app 
    - #### `api` - This folder holds API configuration and endpoints for communicating to server 
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `hooks` - This folder holds the custom react hooks used in the projects
    - #### `icons` - This folder holds all of the different custom icons
    - #### `models` - This folder holds the structure of the data objects used in the project
    - #### `navigation` - This folder holds the different types of navigators used in the application like StackNavigator,TabNavigator,etc.
    - #### `screens` - This folder holds the different screens present in the application
    - #### `services` - This folder holds the different 3rd party service APIs
    - #### `store` - This folder holds global react state of the application
    - #### `theme` - This folder holds different color themes used in the application 
    - #### `utils` - This folder holds some of the custom utility functions used

- #### 🙈`.gitignore` - Tells git which files to ignore
- #### `App.tsx` - This is the entry file of our application
- #### `tsconfig.json` - Specifies the root files and the compiler options required to compile the project.
- #### `package.json` - Defines npm behaviors and packages for the client

## About The Project
The motivation behind this project was that I wanted to build a cross platform mobile application with full payment integration flow so that I will have a understanding of this topic and boilerplate code which I can use in my so many different future applications.

This app basically have 3 different parts

#### 1. Frontend
This repo is the forntend mobile application of this project.

#### 2. Backend
The backend is built with <strong>Node JS</strong> and <strong>Typescript</strong> repo for which is [here](https://github.com/satishnaikawadi2011/shopping-heaven-mern/tree/main/backend)

#### 3. Admin Portal
The Admin Portal is built with <strong>React JS</strong> and <strong>Typescript</strong> repo for which is [here](https://github.com/satishnaikawadi2011/shopping-heaven-admin)

### Built With

- [React](https://reactjs.org/)
- [React Native](https://reactnative.dev/)

### Features

- Login and Registering new users to the app
- Filter products based on category
- Save favourite products to visit them later
- Add products to cart and get detailed overview of cart
- Manage your orders and also get receipts of paid orders
- Add new shipping addresses by adding manually as well as by using geolocation and also can remove which are not necessary
- Beautiful UI with dark and light mode toggler
- Online card payment with Stripe Payment Integration as well as option of Cash On Delivery

### Screenshots

##### 1. Splash Screen and Welcome Screen
<p align="center">
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825229/shopping-heaven/sh-1_ph52qh.jpg" title="Shopping Heaven" alt="Shopping Heaven"width="300"
height="650"/>
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825229/shopping-heaven/sh-2_amtnkm.jpg" title="Shopping Heaven" alt="Shopping Heaven"width="300"
height="650"/>
</p>

##### 2. SignIn and SignUp Screens
<p align="center">
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825229/shopping-heaven/sh_3_rmd2u9.jpg" title="Shopping Heaven" alt="Shopping Heaven"width="300"
height="650"/>
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825229/shopping-heaven/sh-4_d4n5fy.jpg" title="Shopping Heaven" alt="Shopping Heaven"width="300"
height="650"/>
</p>

##### 3. ProductList Screen and ProductDetails Screen
<p align="center">
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825229/shopping-heaven/sh_5_avikkm.jpg" title="Shopping Heaven" alt="Shopping Heaven" width="300"
height="650"/>
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825229/shopping-heaven/sh-6_xwpjtu.jpg" title="Shopping Heaven" alt="Shopping Heaven"width="300"
height="650"/>
</p>

#### 4. ProfileInfo Screen
<p align="center">
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825229/shopping-heaven/sh-9_xjrcug.jpg" title="Shopping Heaven" alt="Shopping Heaven" width="300"
height="650"/>
</p>

#### 5. Favourites Screen
<p align="center">
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825229/shopping-heaven/sh-10_sghljp.jpg" title="Shopping Heaven" alt="Shopping Heaven" width="300"
height="650"/>
</p>

#### 6. Add Shipping Address Screen
<p align="center">
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825228/shopping-heaven/sh-15_fg4d7o.jpg" title="Shopping Heaven" alt="Shopping Heaven" width="300"
height="650"/>
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825228/shopping-heaven/sh-16_shlqcm.jpg" title="Shopping Heaven" alt="Shopping Heaven" width="300"
height="650"/>
</p>

#### 7. Addresses List Screen
<p align="center">
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825228/shopping-heaven/sh-17_xfvudr.jpg" title="Shopping Heaven" alt="Shopping Heaven" width="300"
height="650"/>
</p>

#### 8. Cart Screen and Order Summary Screen
<p align="center">
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825228/shopping-heaven/ah-20_ajp2uh.jpg" title="Shopping Heaven" alt="Shopping Heaven" width="300"
height="650"/>
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825227/shopping-heaven/sh-25_aersey.jpg" title="Shopping Heaven" alt="Shopping Heaven" width="300"
height="650"/>
</p>

#### 9. Payments Screen
<p align="center">
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825228/shopping-heaven/sh-26_iwxid1.jpg" title="Shopping Heaven" alt="Shopping Heaven" width="300"
height="650"/>
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825227/shopping-heaven/sh-27_tq3bu6.jpg" title="Shopping Heaven" alt="Shopping Heaven" width="300"
height="650"/>
</p>

#### 10. Get Payment Receipt
<p align="center">
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825228/shopping-heaven/sh-13_zt7ji0.jpg" title="Shopping Heaven" alt="Shopping Heaven" width="300"
height="650"/>
<img src="https://res.cloudinary.com/dg2zkumuc/image/upload/v1659825228/shopping-heaven/sh-14_lvujib.jpg" title="Shopping Heaven" alt="Shopping Heaven" width="300"
height="650"/>
</p>

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
 
- NPM

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/satishnaikawadi2011/shopping-heaven
```

2. Install NPM packages for Server

```sh
npm install
```

## Usage

The primary goal of this project is to build a cross platform mobile application which will have full payment integration flow

_For more examples, please refer to the [Working Demo](https://shopping-heaven-landing-page.netlify.app/)_

## Roadmap

See the [open issues](https://github.com/satishnaikawadi2011/shopping-heaven/issues) for a list of proposed features (and known issues).

## Maintainer
Important decisions regarding the project are taken by the following maintainer.

| Satish        |
| :-------------: |
| <img  height="100" width="100" src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1650221859/github-profile/me-github_yumapj.jpg">      |
| [@satishnaikawadi2011](https://github.com/satishnaikawadi2011)      |
## Support

<a href="https://www.buymeacoffee.com/satishnaikawadi" target="_blank">
  <img src="https://res.cloudinary.com/dyfm31f1n/image/upload/v1649760399/repopup/bmc-button_bridqp.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >
</a>

## License

**Shopping Heaven** is licensed under the [MIT License](https://github.com/satishnaikawadi2011/shopping-heaven/blob/main/LICENSE).