import type { Info, InfoDetail } from "../type/Info";

export function convertInfo(info: any): Info {
    if (!Array.isArray(info)) return [];
    return (
        info.map((i) => {
            return ({
                json: String(i.json),
                name: String(i.name),
                details: Array.isArray(i.details)
                    ? i.details.map((d: any) => {
                        if (!Array.isArray(d)) return []
                        return d?.map((dd: string) => String(dd))
                    })
                    : [],
                summary: String(i.summary || "")
            } as InfoDetail);
        })
    );
}