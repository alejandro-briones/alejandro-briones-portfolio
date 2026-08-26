using System.Globalization;
using AlejandroBriones.Portfolio;
using AlejandroBriones.Portfolio.Services;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.JSInterop;

var builder =
    WebAssemblyHostBuilder.CreateDefault(args);

builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>(
    "head::after");

builder.Services.AddScoped(
    sp => new HttpClient
    {
        BaseAddress = new Uri(
            builder.HostEnvironment.BaseAddress)
    });

builder.Services.AddLocalization();

builder.Services.AddScoped<ThemeService>();
builder.Services.AddScoped<CultureService>();

var host = builder.Build();

var jsRuntime =
    host.Services.GetRequiredService<IJSRuntime>();

var cultureName =
    await jsRuntime.InvokeAsync<string>(
        "portfolioCulture.getCulture");

var culture =
    CultureInfo.GetCultureInfo(
        NormalizeCulture(cultureName));

CultureInfo.DefaultThreadCurrentCulture =
    culture;

CultureInfo.DefaultThreadCurrentUICulture =
    culture;

await host.RunAsync();

static string NormalizeCulture(
    string? culture)
{
    return culture?
        .StartsWith(
            CultureService.SpanishCulture,
            StringComparison.OrdinalIgnoreCase) == true
        ? CultureService.SpanishCulture
        : CultureService.EnglishCulture;
}