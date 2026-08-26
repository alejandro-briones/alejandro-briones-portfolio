using System.Globalization;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace AlejandroBriones.Portfolio.Services;

public sealed class CultureService
{
    public const string EnglishCulture = "en";
    public const string SpanishCulture = "es";

    private const string EnglishCvFileName =
        "Alejandro-Briones-CV-EN.pdf";

    private const string SpanishCvFileName =
        "Alejandro-Briones-CV-ES.pdf";

    private readonly IJSRuntime _jsRuntime;
    private readonly NavigationManager _navigationManager;

    public CultureService(
        IJSRuntime jsRuntime,
        NavigationManager navigationManager)
    {
        _jsRuntime = jsRuntime;
        _navigationManager = navigationManager;
    }

    public string CurrentCulture =>
        NormalizeCulture(
            CultureInfo.CurrentUICulture.Name);

    public bool IsEnglish =>
        CurrentCulture == EnglishCulture;

    public bool IsSpanish =>
        CurrentCulture == SpanishCulture;

    public string CvFileName =>
        IsSpanish
            ? SpanishCvFileName
            : EnglishCvFileName;

    public string CvPath =>
        $"documents/{CvFileName}";

    public Task SetEnglishAsync()
    {
        return SetCultureAsync(
            EnglishCulture);
    }

    public Task SetSpanishAsync()
    {
        return SetCultureAsync(
            SpanishCulture);
    }

    public async Task SetCultureAsync(
        string culture)
    {
        var normalizedCulture =
            NormalizeCulture(culture);

        await _jsRuntime.InvokeAsync<string>(
            "portfolioCulture.setCulture",
            normalizedCulture);

        if (CurrentCulture ==
            normalizedCulture)
        {
            return;
        }

        _navigationManager.NavigateTo(
            _navigationManager.Uri,
            forceLoad: true);
    }

    private static string NormalizeCulture(
        string? culture)
    {
        return culture?
            .StartsWith(
                SpanishCulture,
                StringComparison.OrdinalIgnoreCase) == true
            ? SpanishCulture
            : EnglishCulture;
    }
}