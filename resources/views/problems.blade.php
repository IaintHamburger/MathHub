@extends('layouts.app') {{-- 繼承 layouts.app --}}

@section('content')
    <h1 class="text-2xl font-bold mb-4">題目列表</h1>
    <table class="w-full border-collapse border border-gray-300">
        <thead>
            <tr class="bg-gray-100">
                <th class="border p-2">ID</th>
                <th class="border p-2">標題</th>
                <th class="border p-2">難度</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($problems as $problem)
                <tr class="border">
                    <td class="border p-2">{{ $problem->id }}</td>
                    <td class="border p-2">
                        <a href="#">{{ $problem->title }}</a>
                    </td>
                    <td class="border p-2">{{ $problem->difficulty }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection