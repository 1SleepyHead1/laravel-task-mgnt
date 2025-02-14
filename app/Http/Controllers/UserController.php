<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        // requests
        $name = request("name");
        $sortField = request("sort_field", "name");
        $sortDirection = request("sort_direction", "asc");

        if ($name) {
            $query->where("name", "like", "%" . $name . "%");
        }

        $users = $query->orderBy($sortField, $sortDirection)->paginate(15)->onEachSide(1);
        $isSinglePage = $users->lastPage() === 1;

        return inertia("User/Index", [
            "users" => UserResource::collection($users),
            "queryParams" => request()->query() ?: null,
            "isSinglePage" => $isSinglePage,
            "message" => session("message"),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        $data["password"] = bcrypt($data["password"]);
        User::create($data);

        return redirect()->route("user.index")->with("message", "New user created successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia("User/Edit", [
            "user" => new UserResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data["password"] ?? null;

        if ($password) {
            $password  = bcrypt($password);
        } else {
            unset($data['password']);
        }

        $user->update($data);
        return redirect()->route("user.index")->with("message", "User updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route("user.index")->with("message", "User deleted successfully.");
    }
}
