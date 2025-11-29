import { useMediaQuery } from "@mui/material";
import type { Info } from "../type/Info";
import Explorer from "./Explorer";
import ExplorerSP from "./ExplorerSP";
import type { Dispatch, SetStateAction } from "react";

type Props = {
    info: Info;
    originalInput: string;
    setInfo: Dispatch<SetStateAction<Info>>;
    setOriginalInput: Dispatch<SetStateAction<string>>;
}

const ExplorerMain: React.FC<Props> = ({
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
                ? <Explorer info={info} originalInput={originalInput} resetSettings={resetSettings}/>
                : <ExplorerSP info={info} originalInput={originalInput} resetSettings={resetSettings}/>
            }
        </>
    )
}

export default ExplorerMain;