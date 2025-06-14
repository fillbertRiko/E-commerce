<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

@include('guest.includes.head')

<body>

    <!-- Page content -->
    <div class="page-content">

        <!-- Main content -->
        <div class="content-wrapper">

            <!-- Inner content -->
            <div class="content-inner">

                <!-- Page header -->
                @if (isset($header))
                {{ $header }}
                @endif
                <!-- /page header -->


                <!-- Content area -->
                @yield('content')
                <!-- /content area -->


                <!-- Footer -->
                @include('guest.includes.footer')
                <!-- /footer -->

            </div>
            <!-- /inner content -->

        </div>
        <!-- /main content -->

    </div>
    <!-- /page content -->


    @livewireScripts
</body>

</html>