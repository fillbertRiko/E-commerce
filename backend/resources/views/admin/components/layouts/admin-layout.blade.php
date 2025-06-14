<!DOCTYPE html>
<html lang="en">

<head>
    @include('admin.includes.head')
</head>

<body>
    <!--Main navbar -->
    @include('admin.includes.header')
    <!--/Main navbar -->

    <div id="overlay" class="hidden"></div>

    <!-- Page content -->
    <div class="page-content">

        <!--main sidebar -->
        @include('admin.includes.sidebar')
        <!--/Main sidebar -->

        <!--Main content -->
        <div class="content-wrapper">
            <!--Inner content -->
            <div class="content-inner">

                <!-- Page title -->
                @if(isset($header))
                {{$header}}
                @endif
                <!--/page header-->

                <!--Content area-->
                <div class="content">
                    @yield('content')
                </div>
                <!--/Content area-->

                <!--Footer area-->
                @include('admin.includes.footer')
                <!--/Footer area-->
            </div>
            <!--/inner content-->
        </div>
        <!--/Main content -->
    </div>
    <!--/Page content -->

    @livewireScripts

    @php
    $user = auth()->user();
    $userData = $user->userData;

    if($userData) {
    $userData = app(App\Models\User::class)->getDataUser($user->id);
    }

    $faculty = $userData['role'] === User::ROLE_FACULTY::SUPER_ADMIN->value ? $user->faculty_id: $userData['faculty_id']??null;
    @endphp

    <!-- <script>
        document.addEventListener("DOMContentLoaded", function() {
            let faculty = {
                !!json_encode($faculty ?? null) !!
            };
            if (!faculty) {
                document.getElementById('overlay').style.display = "block";
            }
        });
    </script> -->
    {{ $scripts ?? '' }}
</body>

</html>