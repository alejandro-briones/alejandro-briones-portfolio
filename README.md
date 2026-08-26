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
- English and Spanish localization
- Persistent Dark and Light themes
- Persistent language preferences
- Subtle UI animations and interactive navigation
- Localized CV downloads
- SEO and social sharing metadata
- SPA routing support on GitHub Pages
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
├── Layout/
├── Localization/
│   ├── SharedResource.cs
│   ├── SharedResource.resx
│   └── SharedResource.es.resx
├── Models/
├── Pages/
│   ├── Home.razor
│   ├── NotFound.razor
│   └── NotFound.razor.css
├── Properties/
├── Services/
│   ├── CultureService.cs
│   └── ThemeService.cs
├── wwwroot/
│   ├── css/
│   ├── documents/
│   │   ├── Alejandro-Briones-CV-EN.pdf
│   │   └── Alejandro-Briones-CV-ES.pdf
│   ├── images/
│   ├── js/
│   │   ├── animations.js
│   │   ├── culture.js
│   │   └── theme.js
│   ├── 404.html
│   └── index.html
├── App.razor
├── Program.cs
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

Reusable layout components also provide navigation, theme preferences, language selection and footer content.

## Features

### Interface

- Responsive single-page portfolio
- Fixed responsive navigation
- Active navigation state based on the current section
- Smooth anchor navigation
- Mobile navigation menu
- Dedicated interface preference controls

### Theme Support

- Dark and Light themes
- Dark theme as the default
- Persistent theme preference using browser storage
- Dynamic browser theme color
- Theme-aware interface components and visual effects

### Localization

- English and Spanish interface
- English as the default language
- Persistent language preference using browser storage
- Localized navigation, content, accessibility labels and interface states
- Dynamic document language through the HTML `lang` attribute
- Localized loading and error interfaces
- Localized page title and client-side metadata

### CV Downloads

- Separate English and Spanish CV versions
- Automatic CV selection based on the active language
- Correct localized file name when downloading
- CV download available from both the Hero and Contact sections

### Accessibility

- Semantic HTML structure
- Localized ARIA labels
- Keyboard-accessible interface controls
- Visible focus states
- Reduced-motion support
- Semantic education date ranges
- Accessible theme and language controls
- Descriptive link labels for external profiles and CV downloads

### Animation & Interaction

- Scroll reveal animations
- Staggered content animations
- Subtle Hero background parallax
- Reduced-motion preference support
- Interactive navigation and hover states

### SEO & Social Sharing

- SEO description metadata
- Canonical URL
- Open Graph metadata
- Twitter Card metadata
- Social preview image support
- Localized client-side metadata
- Dynamic page titles
- Custom favicon

### Routing

- Blazor SPA routing
- Localized custom Not Found page
- GitHub Pages SPA fallback through `404.html`
- Direct URL and refresh support for client-side routes

## Localization Architecture

Localization is implemented using the .NET localization infrastructure with shared resource files:

```text
Localization/
├── SharedResource.cs
├── SharedResource.resx
└── SharedResource.es.resx
```

The application currently supports:

```text
en → English
es → Spanish
```

The selected culture is persisted in browser storage and restored when the application starts.

JavaScript initialization in `culture.js` also synchronizes the static application shell before Blazor finishes loading, including:

- Document language
- Page title
- Description metadata
- Open Graph metadata
- Twitter metadata
- Loading interface
- Error interface

## Theme Architecture

Theme preferences are managed through `ThemeService` and `theme.js`.

The application currently supports:

```text
dark
light
```

Theme-dependent colors are defined through semantic CSS custom properties, allowing components to consume the same design tokens regardless of the active theme.

The selected theme is persisted in browser storage and applied before the main stylesheet loads to minimize visible theme switching during startup.

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

The static Blazor WebAssembly application is generated under the project's Release publish directory.

## Deployment

The portfolio is deployed automatically to **GitHub Pages** through **GitHub Actions** and served from the custom domain **alejandrobriones.dev**.

Every push to the `main` branch triggers the deployment workflow, which:

1. Checks out the repository
2. Configures the .NET 10 SDK
3. Configures GitHub Pages
4. Restores project dependencies
5. Publishes the Blazor WebAssembly application in Release mode
6. Disables Jekyll processing with `.nojekyll`
7. Creates the GitHub Pages artifact
8. Deploys the artifact to GitHub Pages

The deployment workflow is located under:

```text
.github/workflows/
```

### GitHub Pages SPA Routing

Because GitHub Pages is a static hosting platform, direct requests to client-side routes require an additional fallback.

The portfolio includes:

```text
wwwroot/404.html
```

When GitHub Pages receives a request for a route that doesn't correspond to a physical file, the fallback redirects the original path through `index.html`.

The original URL is then restored before Blazor initializes, allowing the Blazor Router to handle the route and display the custom Not Found page when appropriate.

## Contact

- [LinkedIn](https://www.linkedin.com/in/josealejandrobrionesarroyo)
- [GitHub](https://github.com/alejandro-briones)
- [Portfolio](https://alejandrobriones.dev/)

---

Built with **Blazor WebAssembly and .NET 10**.
