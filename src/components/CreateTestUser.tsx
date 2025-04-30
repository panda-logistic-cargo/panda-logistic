
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const CreateTestUser = () => {
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);
  const { toast } = useToast();
  
  const createTestUser = async () => {
    setCreating(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: 'panda-logistic@mail.ru',
        password: '682449qwerty',
        options: {
          data: {
            username: 'pandaadmin',
            full_name: 'Panda Logistics Admin'
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Test user created successfully. You can now login with these credentials.",
      });
      setCreated(true);
    } catch (error: any) {
      console.error('Error creating test user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create test user.",
        variant: "destructive"
      });
    } finally {
      setCreating(false);
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 shadow-md rounded-lg z-50">
      <h3 className="font-medium mb-2">Create Test User</h3>
      <p className="text-sm mb-2">Email: panda-logistic@mail.ru</p>
      <p className="text-sm mb-4">Password: 682449qwerty</p>
      
      <Button 
        onClick={createTestUser}
        disabled={creating || created}
        className="w-full bg-cargo-red hover:bg-cargo-red/90"
      >
        {creating ? 'Creating...' : created ? 'Created!' : 'Create User'}
      </Button>
      
      {created && (
        <p className="text-sm mt-2 text-green-600">
          User created! You can now login with these credentials.
        </p>
      )}
    </div>
  );
};

export default CreateTestUser;
