import React from 'react';
import MarketNavBar from '../components/MarketNavBar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UserProfile = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MarketNavBar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-6">
            <Avatar className="h-24 w-24 mr-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">John Doe</h2>
              <p className="text-gray-600">john.doe@example.com</p>
            </div>
          </div>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;