"use client";
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import { LogIn } from "lucide-react";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {

    const mutation = useMutation({
        mutationFn: async () => signOut()
    })

    return(
        <Button 
            variant='outline' 
            size={'sm'}
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
        >
            {
                mutation.isPending ? <Loader  size={12} className="mr-2"/> : <LogIn size={12} className="mr-2"/>
            }
            Logout
        </Button>
    )
}