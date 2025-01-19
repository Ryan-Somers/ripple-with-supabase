"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"; // Import necessary form components
import {addPost} from "@/app/protected/home/actions";
import { toast } from "sonner"


// Define validation schema
const FormSchema = z.object({
    post: z
        .string()
        .min(10, {
            message: "Post must be at least 10 characters.",
        })
        .max(160, {
            message: "Post must not be longer than 160 characters.",
        }),
});

export function TextareaForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            const formData = new FormData();
            formData.append("post", data.post);

            // Call the server-side addPost function
            const result = await addPost(formData);

            // Show a toast or handle success
            toast.success("Post has been created.")

        } catch (error) {
            console.error("Error during submission:", error);
            toast.error("Post has not been created.")
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="post"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Add a Ripple</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can <span>@mention</span> other users and organizations.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
