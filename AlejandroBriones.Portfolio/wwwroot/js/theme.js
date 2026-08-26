(() => {
    const storageKey = "portfolio-theme";

    const themes = {
        dark: "dark",
        light: "light"
    };

    const themeColors = {
        dark: "#0d1117",
        light: "#f6f8fa"
    };

    const isValidTheme = (theme) => {
        return theme === themes.dark ||
            theme === themes.light;
    };

    const getStoredTheme = () => {
        try {
            const storedTheme = localStorage.getItem(storageKey);

            return isValidTheme(storedTheme)
                ? storedTheme
                : null;
        } catch {
            return null;
        }
    };

    const updateThemeColor = (theme) => {
        const themeColorMeta = document.querySelector(
            'meta[name="theme-color"]');

        if (!themeColorMeta) {
            return;
        }

        themeColorMeta.setAttribute(
            "content",
            themeColors[theme]);
    };

    const applyTheme = (theme) => {
        const normalizedTheme = isValidTheme(theme)
            ? theme
            : themes.dark;

        document.documentElement.dataset.theme =
            normalizedTheme;

        updateThemeColor(normalizedTheme);

        return normalizedTheme;
    };

    const getTheme = () => {
        const currentTheme =
            document.documentElement.dataset.theme;

        if (isValidTheme(currentTheme)) {
            return currentTheme;
        }

        return applyTheme(
            getStoredTheme() ?? themes.dark);
    };

    const setTheme = (theme) => {
        const normalizedTheme = isValidTheme(theme)
            ? theme
            : themes.dark;

        try {
            localStorage.setItem(
                storageKey,
                normalizedTheme);
        } catch {
            // The theme can still be applied for the
            // current session when storage is unavailable.
        }

        return applyTheme(normalizedTheme);
    };

    const initializeTheme = () => {
        const storedTheme = getStoredTheme();

        return applyTheme(
            storedTheme ?? themes.dark);
    };

    window.portfolioTheme = {
        getTheme,
        setTheme
    };

    initializeTheme();
})();