<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->get('deleted')) {
            $query->where('deleted', $request->get('deleted'));
        }

        if ($request->get('top')) {
            $query->where('top', $request->get('top'));
        }

        if ($request->get('sort_by')) {
            $sortField = $request->get('sort_by');
            $sortOrder = $request->get('order', 'asc');
            $query->orderBy($sortField, $sortOrder);
        }

        $perPage = $request->get('per_page', 10);
        $page = $request->get('page', 1);

        $products = $query->paginate($perPage, ['*'], 'page', $page);


        return $query->paginate($perPage);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
        ]);

        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return $product;
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'string|max:255',
            'description' => 'string',
            'price' => 'numeric',
        ]);

        $product->update($request->all());
        return response()->json($product, 200);
    }

    public function delete(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}
