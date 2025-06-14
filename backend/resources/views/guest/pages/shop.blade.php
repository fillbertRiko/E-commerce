@extends('guest.welcome')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1>Shop Page</h1>
            <p>Welcome to the shop! Here you can find various products.</p>
            <!-- Add your shop content here -->
        </div>
    </div>
</div>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h2>Featured Products</h2>
            <!-- Example product listing -->
            <div class="product">
                <h3>Product Name</h3>
                <p>Description of the product.</p>
                <p>Price: $XX.XX</p>
                <button class="btn btn-primary">Add to Cart</button>
            </div>
        </div>
    </div>
</div>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h2>Categories</h2>
            <!-- Example category listing -->
            <ul>
                <li><a href="#">Category 1</a></li>
                <li><a href="#">Category 2</a></li>
                <li><a href="#">Category 3</a></li>
            </ul>
        </div>
    </div>
</div>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h2>Contact Us</h2>
            <p>If you have any questions, feel free to <a href="#">contact us</a>.</p>
        </div>
    </div>
</div>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h2>Latest News</h2>
            <!-- Example news listing -->
            <p>Stay tuned for the latest updates and news from our shop.</p>
        </div>
    </div>
</div>
</div>
<a class="btn btn-secondary" href='{{ route('welcome') }}'>Back to Home</a>
<a class="btn btn-primary" href='{{ route('login') }}'>Login</a>
@endsection