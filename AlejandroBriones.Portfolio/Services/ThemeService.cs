using AlejandroBriones.Portfolio.Models;
using Microsoft.JSInterop;

namespace AlejandroBriones.Portfolio.Services;

public sealed class ThemeService
{
    private readonly IJSRuntime _jsRuntime;

    public ThemeService(IJSRuntime jsRuntime)
    {
        _jsRuntime = jsRuntime;
    }

    public ThemeMode CurrentTheme { get; private set; } = ThemeMode.Dark;

    public bool IsInitialized { get; private set; }

    public bool IsDarkMode => CurrentTheme == ThemeMode.Dark;

    public event Action? ThemeChanged;

    public async ValueTask InitializeAsync()
    {
        var themeValue = await _jsRuntime.InvokeAsync<string>(
            "portfolioTheme.getTheme");

        var theme = ParseTheme(themeValue);

        UpdateCurrentTheme(theme);

        IsInitialized = true;
    }

    public async ValueTask SetThemeAsync(ThemeMode theme)
    {
        var themeValue = await _jsRuntime.InvokeAsync<string>(
            "portfolioTheme.setTheme",
            GetThemeValue(theme));

        var appliedTheme = ParseTheme(themeValue);

        UpdateCurrentTheme(appliedTheme);

        IsInitialized = true;
    }

    public ValueTask ToggleThemeAsync()
    {
        var nextTheme = CurrentTheme == ThemeMode.Dark
            ? ThemeMode.Light
            : ThemeMode.Dark;

        return SetThemeAsync(nextTheme);
    }

    private void UpdateCurrentTheme(ThemeMode theme)
    {
        if (CurrentTheme == theme)
        {
            return;
        }

        CurrentTheme = theme;
        ThemeChanged?.Invoke();
    }

    private static ThemeMode ParseTheme(string? theme)
    {
        return theme?.ToLowerInvariant() switch
        {
            "light" => ThemeMode.Light,
            _ => ThemeMode.Dark
        };
    }

    private static string GetThemeValue(ThemeMode theme)
    {
        return theme switch
        {
            ThemeMode.Light => "light",
            _ => "dark"
        };
    }
}