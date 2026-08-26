(() => {
    const storageKey = "portfolio-culture";

    const cultures = {
        english: "en",
        spanish: "es"
    };

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

    const applyCulture = (culture) => {
        const normalizedCulture =
            isValidCulture(culture)
                ? culture
                : cultures.english;

        document.documentElement.lang =
            normalizedCulture;

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

        return applyCulture(normalizedCulture);
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
})();