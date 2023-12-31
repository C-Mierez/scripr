import { api } from "~/trpc/server";

export default async function Example() {
    const hello = await api.post.hello.query({ text: "Hello World from trcp!" });

    return (
        <div>
            <h1>Example Page</h1>
            <p>{hello ? hello.greeting : "Loading tRPC query..."}</p>
        </div>
    );
}
