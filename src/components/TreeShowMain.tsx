import { useMediaQuery } from "@mui/material";
import type { Info } from "../type/Info";
import TreeShowSP from "./TreeShowSP";
import TreeShow from "./TreeShow";
import type { Dispatch, SetStateAction } from "react";

type Props = {
    info: Info;
    originalInput: string;
    setInfo: Dispatch<SetStateAction<Info>>;
    setOriginalInput: Dispatch<SetStateAction<string>>;
}

const TreeIndexMain: React.FC<Props> = ({
    info,
    originalInput,
    setInfo,
    setOriginalInput
}) => {
    const isPC: boolean = useMediaQuery("(min-width:800px)");
    const resetSettings = () => {
        setInfo([]);
        setOriginalInput("");
    }
    return (
        <>
            { isPC
                ? <TreeShow info={info} originalInput={originalInput} resetSettings={resetSettings}/>
                : <TreeShowSP info={info} originalInput={originalInput} resetSettings={resetSettings}/>
            }
        </>
    )
}

export default TreeIndexMain;