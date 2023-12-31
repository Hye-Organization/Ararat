import InstanceShell from "@/components/instances/instance/InstanceShell";
import { fetchInstance } from "@/lib/lxd";
import { redirect } from "@/lib/next";
import { validateSession } from "@/lib/oidc";
import { NodeLxdInstance } from "@/types/instance";
import { Text } from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

export async function getServerSideProps({ req, res, params, query }: GetServerSidePropsContext) {
    if (!params || !params.instance || !params.node) return redirect("/instances");
    var valid = await validateSession((req.cookies as any).access_token)
    if (!valid) {
        res.setHeader("Set-Cookie", ["access_token=deleted; Max-Age=0"])
        return redirect("/authentication/login")
    };
    try {
        let instance: NodeLxdInstance | undefined = await fetchInstance((params.instance as string), (params.node as string), (req.cookies.access_token as string))
        if (!instance) return redirect('/instances');

        return {
            props: {
                instance: instance
            }
        }
    } catch (error) {
        console.log(error)
        return redirect(`/instances`);
    }
}

export default function Instance({ instance }: { instance: NodeLxdInstance }) {
    return (
        <>
            <InstanceShell instance={instance} />
            <Text mt="sm">Instance Dashboard Is Coming In Hye Ararat v2.1.0. Stay tuned.</Text>
        </>
    );
}