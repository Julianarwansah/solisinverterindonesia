<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Solis Inverter Indonesia - Solusi Energi Terbarukan Terbaik')</title>
    <meta name="description"
        content="@yield('meta_description', 'Distributor resmi Solis Inverter di Indonesia. Menghadirkan teknologi inverter tercanggih untuk kebutuhan panel surya Anda.')">
    <meta name="keywords"
        content="@yield('meta_keywords', 'solis inverter, inverter indonesia, panel surya, energi terbarukan, solar panel inverter')">

    <!-- Open Graph -->
    <meta property="og:title" content="@yield('title', 'Solis Inverter Indonesia')">
    <meta property="og:description"
        content="@yield('meta_description', 'Solusi energi terbarukan terbaik dengan Solis Inverter.')">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:site_name" content="Solis Indonesia">
    <meta property="og:locale" content="id_ID">
    <meta property="og:type" content="website">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="antialiased font-sans">
    <x-navigation />

    <main>
        @yield('content')
    </main>

    <x-footer />

    @stack('scripts')
</body>

</html>