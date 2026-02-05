@extends('layouts.app')

@section('title', 'Solis Inverter Indonesia - Solusi Energi Terbarukan Terbaik')

@section('content')
    <div class="min-h-screen bg-white">
        <x-hero />
        <x-about-section />
        <x-category-section :categories="$categories" />
        <x-features-bento />
        <x-featured-products :products="$featuredProducts" />
        <x-contact-section />
    </div>
@endsection