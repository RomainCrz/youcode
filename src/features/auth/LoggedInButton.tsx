"use client";

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Loader } from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import { LogIn, LogOut } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export type LoggedInButtonProps = {
    user: Session["user"]
}

export const LoggedInButton = (props: LoggedInButtonProps) => {
    const mutation = useMutation({
        mutationFn : async () => {
            signOut()
        }
    })
    return (
        <DropdownMenu>
            <AlertDialog>
            <DropdownMenuTrigger>
            <Button>
            <Avatar className="h-4 w-4 mr-2">
                <AvatarFallback>
                    {props.user?.name?.[0]}
                </AvatarFallback>
                {props.user?.image && (
                    <AvatarImage src={props.user.image} alt={'avatar picture'} />
                )}
            </Avatar>
            {props.user?.name}
        </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                
                    <AlertDialogTrigger asChild>
                    <DropdownMenuItem>
                    <LogOut className="mr-2" size={12}/>
                    Logout
                </DropdownMenuItem>
                    </AlertDialogTrigger>
            </DropdownMenuContent>
            <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you sure you want to logout?
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                                <Button variant='secondary'>Cancel</Button>
                            </AlertDialogCancel>
                            <Button variant='destructive' disabled={mutation.isPending} onClick={() => mutation.mutate()}>
                            {
                                mutation.isPending ? 
                                <Loader  size={12} className="mr-2"/> : 
                                <LogIn size={12} className="mr-2"/>
                            }
                                Logout
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
        </DropdownMenu>
    )
}