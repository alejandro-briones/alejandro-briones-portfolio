(() => {
    const storageKey = "portfolio-culture";

    const cultures = {
        english: "en",
        spanish: "es"
    };

    const translations = {
        en: {
            pageTitle:
                "Alejandro Briones | Software Engineer & Full Stack .NET Developer",

            metaDescription:
                "Software Engineer and Full Stack .NET Developer focused on backend development, enterprise applications, C#, .NET and SQL Server.",

            socialSiteName:
                "Alejandro Briones Portfolio",

            socialImageAlt:
                "Alejandro Briones — Software Engineer and Full Stack .NET Developer Portfolio",

            loadingAriaLabel:
                "Loading Alejandro Briones portfolio",

            loadingRole:
                "SOFTWARE ENGINEER · FULL STACK .NET DEVELOPER",

            loadingTitle:
                "Loading portfolio",

            loadingDescription:
                "Preparing the experience...",

            errorLabel:
                "PORTFOLIO ERROR",

            errorTitle:
                "Something went wrong.",

            errorDescription:
                "The portfolio couldn't finish loading correctly. Reload the page to try again.",

            errorReload:
                "Reload portfolio",

            errorDismiss:
                "Dismiss",

            errorDismissAriaLabel:
                "Dismiss error message"
        },

        es: {
            pageTitle:
                "Alejandro Briones | Ingeniero de Software y Desarrollador Full Stack .NET",

            metaDescription:
                "Ingeniero de Software y Desarrollador Full Stack .NET enfocado en desarrollo backend, aplicaciones empresariales, C#, .NET y SQL Server.",

            socialSiteName:
                "Portafolio de Alejandro Briones",

            socialImageAlt:
                "Portafolio de Alejandro Briones — Ingeniero de Software y Desarrollador Full Stack .NET",

            loadingAriaLabel:
                "Cargando el portafolio de Alejandro Briones",

            loadingRole:
                "INGENIERO DE SOFTWARE · DESARROLLADOR FULL STACK .NET",

            loadingTitle:
                "Cargando portafolio",

            loadingDescription:
                "Preparando la experiencia...",

            errorLabel:
                "ERROR DEL PORTAFOLIO",

            errorTitle:
                "Algo salió mal.",

            errorDescription:
                "El portafolio no pudo terminar de cargarse correctamente. Recarga la página para intentarlo de nuevo.",

            errorReload:
                "Recargar portafolio",

            errorDismiss:
                "Cerrar",

            errorDismissAriaLabel:
                "Cerrar mensaje de error"
        }
    };

    let activeCulture = cultures.english;

    const isValidCulture = (culture) => {
        return culture === cultures.english ||
            culture === cultures.spanish;
    };

    const getStoredCulture = () => {
        try {
            const storedCulture =
                localStorage.getItem(storageKey);

            return isValidCulture(storedCulture)
                ? storedCulture
                : null;
        } catch {
            return null;
        }
    };

    const setMetaContent = (
        selector,
        content) => {

        const element =
            document.querySelector(selector);

        if (!element) {
            return;
        }

        element.setAttribute(
            "content",
            content);
    };

    const setTextContent = (
        id,
        content) => {

        const element =
            document.getElementById(id);

        if (!element) {
            return;
        }

        element.textContent = content;
    };

    const updateMetadata = (culture) => {
        const translation =
            translations[culture];

        document.title =
            translation.pageTitle;

        setMetaContent(
            'meta[name="description"]',
            translation.metaDescription);

        setMetaContent(
            'meta[property="og:title"]',
            translation.pageTitle);

        setMetaContent(
            'meta[property="og:description"]',
            translation.metaDescription);

        setMetaContent(
            'meta[property="og:site_name"]',
            translation.socialSiteName);

        setMetaContent(
            'meta[property="og:image:alt"]',
            translation.socialImageAlt);

        setMetaContent(
            'meta[name="twitter:title"]',
            translation.pageTitle);

        setMetaContent(
            'meta[name="twitter:description"]',
            translation.metaDescription);

        setMetaContent(
            'meta[name="twitter:image:alt"]',
            translation.socialImageAlt);
    };

    const updateStaticShell = (culture) => {
        const translation =
            translations[culture];

        const loadingScreen =
            document.getElementById(
                "app-loading-screen");

        if (loadingScreen) {
            loadingScreen.setAttribute(
                "aria-label",
                translation.loadingAriaLabel);
        }

        setTextContent(
            "loading-role",
            translation.loadingRole);

        setTextContent(
            "loading-title",
            translation.loadingTitle);

        setTextContent(
            "loading-description",
            translation.loadingDescription);

        setTextContent(
            "error-label",
            translation.errorLabel);

        setTextContent(
            "error-title",
            translation.errorTitle);

        setTextContent(
            "error-description",
            translation.errorDescription);

        setTextContent(
            "error-reload-text",
            translation.errorReload);

        const errorDismiss =
            document.getElementById(
                "error-dismiss");

        if (errorDismiss) {
            errorDismiss.textContent =
                translation.errorDismiss;

            errorDismiss.setAttribute(
                "aria-label",
                translation.errorDismissAriaLabel);
        }
    };

    const applyCulture = (culture) => {
        const normalizedCulture =
            isValidCulture(culture)
                ? culture
                : cultures.english;

        activeCulture =
            normalizedCulture;

        document.documentElement.lang =
            normalizedCulture;

        updateMetadata(
            normalizedCulture);

        updateStaticShell(
            normalizedCulture);

        return normalizedCulture;
    };

    const getCulture = () => {
        const currentCulture =
            document.documentElement.lang;

        if (isValidCulture(currentCulture)) {
            return currentCulture;
        }

        return applyCulture(
            getStoredCulture() ??
            cultures.english);
    };

    const setCulture = (culture) => {
        const normalizedCulture =
            isValidCulture(culture)
                ? culture
                : cultures.english;

        try {
            localStorage.setItem(
                storageKey,
                normalizedCulture);
        } catch {
            // The culture can still be applied for the
            // current document when storage is unavailable.
        }

        return applyCulture(
            normalizedCulture);
    };

    const initializeCulture = () => {
        const storedCulture =
            getStoredCulture();

        return applyCulture(
            storedCulture ??
            cultures.english);
    };

    window.portfolioCulture = {
        getCulture,
        setCulture
    };

    initializeCulture();

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            () => {
                updateStaticShell(
                    activeCulture);
            },
            { once: true });
    } else {
        updateStaticShell(
            activeCulture);
    }
})();