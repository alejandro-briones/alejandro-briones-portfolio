# Alejandro Briones — Developer Portfolio

Personal developer portfolio built with **Blazor WebAssembly and .NET 10**, designed to present my professional experience, selected software projects, technical stack and background as a **Software Engineer and Full Stack .NET Developer**.

## Live Portfolio

[View the portfolio](https://alejandrobriones.dev/)

## Overview

This portfolio was designed and developed from scratch as a lightweight, responsive single-page application within the .NET ecosystem.

The project focuses on:

- Clean and maintainable component-based architecture
- Responsive design across desktop and mobile devices
- Accessible and semantic markup
- Subtle UI animations and interactive navigation
- Static deployment using GitHub Pages
- Automated CI/CD with GitHub Actions

## Tech Stack

### Application

- C#
- .NET 10
- Blazor WebAssembly
- Razor Components
- HTML5
- CSS3
- JavaScript

### Development & Deployment

- Visual Studio
- Git
- GitHub
- GitHub Actions
- GitHub Pages

## Project Structure

```text
AlejandroBriones.Portfolio/
├── Components/
│   ├── Layout/
│   └── Sections/
├── Pages/
├── Properties/
├── wwwroot/
│   ├── css/
│   ├── documents/
│   ├── js/
│   └── index.html
└── AlejandroBriones.Portfolio.csproj
```

The interface is organized into reusable Razor components for the main portfolio sections, including:

- Hero
- About
- Experience
- Projects
- Technologies
- Education
- Contact

## Features

- Responsive single-page portfolio
- Fixed responsive navigation
- Active navigation state based on the current section
- Smooth anchor navigation
- Scroll reveal animations
- Staggered content animations
- Subtle Hero background parallax
- Reduced-motion accessibility support
- Downloadable résumé
- Professional contact and social links
- Custom favicon
- SEO and Open Graph metadata

## Running Locally

### Requirements

- .NET 10 SDK

Clone the repository:

```bash
git clone https://github.com/alejandro-briones/alejandro-briones-portfolio.git
```

Move into the repository:

```bash
cd alejandro-briones-portfolio
```

Restore dependencies:

```bash
dotnet restore
```

Run the application:

```bash
dotnet run --project ./AlejandroBriones.Portfolio/AlejandroBriones.Portfolio.csproj
```

Then open the local URL displayed by the .NET development server.

## Production Build

Create a Release build with:

```bash
dotnet build ./AlejandroBriones.Portfolio/AlejandroBriones.Portfolio.csproj -c Release
```

Publish the application with:

```bash
dotnet publish ./AlejandroBriones.Portfolio/AlejandroBriones.Portfolio.csproj -c Release
```

## Deployment

The portfolio is deployed automatically to **GitHub Pages** through **GitHub Actions** and served from the custom domain **alejandrobriones.dev**.

Every push to the `main` branch triggers the deployment workflow, which:

1. Restores the .NET dependencies
2. Builds and publishes the Blazor WebAssembly application
3. Creates the static deployment artifact
4. Deploys the application to GitHub Pages

The deployment workflow is located at:

```text
.github/workflows/deploy-pages.yml
```

## Contact

- [LinkedIn](https://www.linkedin.com/in/josealejandrobrionesarroyo)
- [GitHub](https://github.com/alejandro-briones)
- [Portfolio](https://alejandrobriones.dev/)

---

Built with **Blazor WebAssembly and .NET 10**.
