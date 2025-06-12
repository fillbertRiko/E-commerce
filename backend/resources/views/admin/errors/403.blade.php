<x-admin.layouts>
    <div class="content d-flex justify-content-center align-items-center">

        <!--Container-->
        <div class="flex-fill">


            <!--Error title-->
            <div class="card">
                <div class="card-body">
                    <h1>403</h1>
                    <p>Bạn không có quyền truy cập trang này</p>
                </div>
            </div>

            <!--/Error title-->

            <!--Error description-->
            <div class="text-center">
                <a href="{{ route('admin.dashboard') }}" class="btn btn-primary">Trở về bảng điều khiển</a>
            </div>

            <!--/Error description-->
        </div>

        <!--/Container-->
    </div>
</x-admin.layouts>