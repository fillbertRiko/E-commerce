<!-- Global stylesheets -->
<link href="{{ asset('assets/fonts/inter/inter.css') }}" rel="stylesheet" type="text/css">
<link href="{{ asset('assets/icons/phosphor/styles.min.css') }}" rel="stylesheet" type="text/css">
<link href="{{ asset('assets/css/all.min.css') }}" id="stylesheet" rel="stylesheet" type="text/css">
<link href="{{ asset('assets/css/noty/noty.min.css') }}" id="stylesheet" rel="stylesheet" type="text/css">
<link href="{{ asset('assets/css/responsive-fixes.css') }}" rel="stylesheet" type="text/css">
<!-- /global stylesheets -->
@livewireStyles
@vite('resources/css/style.scss')
@vite('resources/css/auth.scss')
<!-- Scripts -->
{{-- <!-- Css custom --> --}}
@yield('style_custom')
{{-- <!-- /Css custom  --> --}}

<style>
    .tooltip-container {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

    .tooltip-text {
        visibility: hidden;
        background-color: none;
        color: #007bff;
        text-align: center;
        padding: 5px 10px;
        border-radius: 4px;
        position: absolute;
        z-index: 1;
        white-space: nowrap;
    }

    .tooltip-container:hover .tooltip-text {
        visibility: visible;
    }

    .tooltip-right {
        left: 120%;
        top: 50%;
        transform: translateY(-50%);
    }
</style>